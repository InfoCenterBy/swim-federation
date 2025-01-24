document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.querySelector(".search-btn");
  const searchInput = document.querySelector(".search-input");
  const links = document.querySelectorAll(".header .link");

  if (searchBtn) {
    searchBtn.addEventListener("click", function (event) {
      event.preventDefault();

      links.forEach((link) => {
        link.classList.toggle("hidden");
      });

      searchInput.classList.toggle("active");

      if (searchInput.classList.contains("active")) {
        searchInput.focus();
      } else {
        searchInput.blur();
      }
    });
  }
});
/**
 * A lightweight youtube embed. Still should feel the same to the user, just MUCH faster to initialize and paint.
 *
 * Thx to these as the inspiration
 *   https://storage.googleapis.com/amp-vs-non-amp/youtube-lazy.html
 *   https://autoplay-youtube-player.glitch.me/
 *
 * Once built it, I also found these:
 *   https://github.com/ampproject/amphtml/blob/master/extensions/amp-youtube (👍👍)
 *   https://github.com/Daugilas/lazyYT
 *   https://github.com/vb/lazyframe
 */
class LiteYTEmbed extends HTMLElement {
  connectedCallback() {
    this.videoId = this.getAttribute("videoid");

    let playBtnEl = this.querySelector(".lyt-playbtn,.lty-playbtn");
    // A label for the button takes priority over a [playlabel] attribute on the custom-element
    this.playLabel = (playBtnEl && playBtnEl.textContent.trim()) || this.getAttribute("playlabel") || "Play";

    this.dataset.title = this.getAttribute("title") || "";

    /**
     * Lo, the youtube poster image!  (aka the thumbnail, image placeholder, etc)
     *
     * See https://github.com/paulirish/lite-youtube-embed/blob/master/youtube-thumbnail-urls.md
     */
    if (!this.style.backgroundImage) {
      this.style.backgroundImage = `url("https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg")`;
      this.upgradePosterImage();
    }

    // Set up play button, and its visually hidden label
    if (!playBtnEl) {
      playBtnEl = document.createElement("button");
      playBtnEl.type = "button";
      // Include the mispelled 'lty-' in case it's still being used. https://github.com/paulirish/lite-youtube-embed/issues/65
      playBtnEl.classList.add("lyt-playbtn", "lty-playbtn");
      this.append(playBtnEl);
    }
    if (!playBtnEl.textContent) {
      const playBtnLabelEl = document.createElement("span");
      playBtnLabelEl.className = "lyt-visually-hidden";
      playBtnLabelEl.textContent = this.playLabel;
      playBtnEl.append(playBtnLabelEl);
    }

    this.addNoscriptIframe();

    // for the PE pattern, change anchor's semantics to button
    if (playBtnEl.nodeName === "A") {
      playBtnEl.removeAttribute("href");
      playBtnEl.setAttribute("tabindex", "0");
      playBtnEl.setAttribute("role", "button");
      // fake button needs keyboard help
      playBtnEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.activate();
        }
      });
    }

    // On hover (or tap), warm up the TCP connections we're (likely) about to use.
    this.addEventListener("pointerover", LiteYTEmbed.warmConnections, { once: true });
    this.addEventListener("focusin", LiteYTEmbed.warmConnections, { once: true });

    // Once the user clicks, add the real iframe and drop our play button
    // TODO: In the future we could be like amp-youtube and silently swap in the iframe during idle time
    //   We'd want to only do this for in-viewport or near-viewport ones: https://github.com/ampproject/amphtml/pull/5003
    this.addEventListener("click", this.activate);

    // Chrome & Edge desktop have no problem with the basic YouTube Embed with ?autoplay=1
    // However Safari desktop and most/all mobile browsers do not successfully track the user gesture of clicking through the creation/loading of the iframe,
    // so they don't autoplay automatically. Instead we must load an additional 2 sequential JS files (1KB + 165KB) (un-br) for the YT Player API
    // TODO: Try loading the the YT API in parallel with our iframe and then attaching/playing it. #82
    this.needsYTApi = this.hasAttribute("js-api") || navigator.vendor.includes("Apple") || navigator.userAgent.includes("Mobi");
  }

  /**
   * Add a <link rel={preload | preconnect} ...> to the head
   */
  static addPrefetch(kind, url, as) {
    const linkEl = document.createElement("link");
    linkEl.rel = kind;
    linkEl.href = url;
    if (as) {
      linkEl.as = as;
    }
    document.head.append(linkEl);
  }

  /**
   * Begin pre-connecting to warm up the iframe load
   * Since the embed's network requests load within its iframe,
   *   preload/prefetch'ing them outside the iframe will only cause double-downloads.
   * So, the best we can do is warm up a few connections to origins that are in the critical path.
   *
   * Maybe `<link rel=preload as=document>` would work, but it's unsupported: http://crbug.com/593267
   * But TBH, I don't think it'll happen soon with Site Isolation and split caches adding serious complexity.
   */
  static warmConnections() {
    if (LiteYTEmbed.preconnected) return;

    // The iframe document and most of its subresources come right off youtube.com
    LiteYTEmbed.addPrefetch("preconnect", "https://www.youtube-nocookie.com");
    // The botguard script is fetched off from google.com
    LiteYTEmbed.addPrefetch("preconnect", "https://www.google.com");

    // Not certain if these ad related domains are in the critical path. Could verify with domain-specific throttling.
    LiteYTEmbed.addPrefetch("preconnect", "https://googleads.g.doubleclick.net");
    LiteYTEmbed.addPrefetch("preconnect", "https://static.doubleclick.net");

    LiteYTEmbed.preconnected = true;
  }

  fetchYTPlayerApi() {
    if (window.YT || (window.YT && window.YT.Player)) return;

    this.ytApiPromise = new Promise((res, rej) => {
      var el = document.createElement("script");
      el.src = "https://www.youtube.com/iframe_api";
      el.async = true;
      el.onload = (_) => {
        YT.ready(res);
      };
      el.onerror = rej;
      this.append(el);
    });
  }

  /** Return the YT Player API instance. (Public L-YT-E API) */
  async getYTPlayer() {
    if (!this.playerPromise) {
      await this.activate();
    }

    return this.playerPromise;
  }

  async addYTPlayerIframe() {
    this.fetchYTPlayerApi();
    await this.ytApiPromise;

    const videoPlaceholderEl = document.createElement("div");
    this.append(videoPlaceholderEl);

    const paramsObj = Object.fromEntries(this.getParams().entries());

    this.playerPromise = new Promise((resolve) => {
      let player = new YT.Player(videoPlaceholderEl, {
        width: "100%",
        videoId: this.videoId,
        playerVars: paramsObj,
        events: {
          onReady: (event) => {
            event.target.playVideo();
            resolve(player);
          },
        },
      });
    });
  }

  // Add the iframe within <noscript> for indexability discoverability. See https://github.com/paulirish/lite-youtube-embed/issues/105
  addNoscriptIframe() {
    const iframeEl = this.createBasicIframe();
    const noscriptEl = document.createElement("noscript");
    // Appending into noscript isn't equivalant for mysterious reasons: https://html.spec.whatwg.org/multipage/scripting.html#the-noscript-element
    noscriptEl.innerHTML = iframeEl.outerHTML;
    this.append(noscriptEl);
  }

  getParams() {
    const params = new URLSearchParams(this.getAttribute("params") || []);
    params.append("autoplay", "1");
    params.append("playsinline", "1");
    return params;
  }

  async activate() {
    if (this.classList.contains("lyt-activated")) return;
    this.classList.add("lyt-activated");

    if (this.needsYTApi) {
      return this.addYTPlayerIframe(this.getParams());
    }

    const iframeEl = this.createBasicIframe();
    this.append(iframeEl);

    // Set focus for a11y
    iframeEl.focus();
  }

  createBasicIframe() {
    const iframeEl = document.createElement("iframe");
    iframeEl.width = 560;
    iframeEl.height = 315;
    // No encoding necessary as [title] is safe. https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#:~:text=Safe%20HTML%20Attributes%20include
    iframeEl.title = this.playLabel;
    iframeEl.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframeEl.allowFullscreen = true;
    // AFAIK, the encoding here isn't necessary for XSS, but we'll do it only because this is a URL
    // https://stackoverflow.com/q/64959723/89484
    iframeEl.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId)}?${this.getParams().toString()}`;
    return iframeEl;
  }

  /**
   * In the spirit of the `lowsrc` attribute and progressive JPEGs, we'll upgrade the reliable
   * poster image to a higher resolution one, if it's available.
   * Interestingly this sddefault webp is often smaller in filesize, but we will still attempt it second
   * because getting _an_ image in front of the user if our first priority.
   *
   * See https://github.com/paulirish/lite-youtube-embed/blob/master/youtube-thumbnail-urls.md for more details
   */
  upgradePosterImage() {
    // Defer to reduce network contention.
    setTimeout(() => {
      const webpUrl = `https://i.ytimg.com/vi_webp/${this.videoId}/sddefault.webp`;
      const img = new Image();
      img.fetchPriority = "low"; // low priority to reduce network contention
      img.referrerpolicy = "origin"; // Not 100% sure it's needed, but https://github.com/ampproject/amphtml/pull/3940
      img.src = webpUrl;
      img.onload = (e) => {
        // A pretty ugly hack since onerror won't fire on YouTube image 404. This is (probably) due to
        // Youtube's style of returning data even with a 404 status. That data is a 120x90 placeholder image.
        // … per "annoying yt 404 behavior" in the .md
        const noAvailablePoster = e.target.naturalHeight == 90 && e.target.naturalWidth == 120;
        if (noAvailablePoster) return;

        this.style.backgroundImage = `url("${webpUrl}")`;
      };
    }, 100);
  }
}
// Register custom element
customElements.define("lite-youtube", LiteYTEmbed);

const swiperMainBanner = new Swiper(".swiper.main-banner", {
  direction: "horizontal",
  // loop: true,

  pagination: {
    el: ".main-banner-wrapper .swiper-pagination",
    dynamicBullets: true,
    dynamicMainBullets: 4,
    clickable: true,
  },

  navigation: {
    nextEl: ".main-banner-wrapper .swiper-button-next-custom",
    prevEl: ".main-banner-wrapper .swiper-button-prev-custom",
    // disabledClass: 'disabled',
    // navigationDisabledClass: 'disabled',
  },
  allowTouchMove: true,
  grabCursor: true,
  // allowSlideNext: false,
});

const swiperMainNav = new Swiper(".swiper.slider-nav", {
  direction: "horizontal",
  loop: true,
  allowTouchMove: true,
  // grabCursor: true,
  // allowSlideNext: false,
  breakpointsBase: "window",
  autoplay: {
    delay: 2000,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
      loop: true,
    },
    576: {
      slidesPerView: 3,
      spaceBetween: 10,
      loop: true,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
      loop: true,
    },
    992: {
      slidesPerView: 7,
      spaceBetween: 10,
      loop: true,
    },
    1100: {
      slidesPerView: 9,
      loop: true,
      spaceBetween: 20,
    },
  },
});

const swiperMainPartner = new Swiper(".swiper.slider-partner", {
  direction: "horizontal",
  loop: true,
  allowTouchMove: true,
  autoplay: {
    delay: 2000,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 12,
    },
    1400: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
  },
});

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");

  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const tabsContainer = document.querySelector(".news__tabs");
  const tabsContainerDark = document.querySelector(".news__tabs--dark");

  const underline = document.querySelector(".news__tabs .underline");
  const underlineDark = document.querySelector(".news__tabs--dark .underline--dark");

  function updateUnderlineWidth() {
    if (tabsContainer) {
      const scrollWidth = tabsContainer.scrollWidth;
      underline.style.width = `${scrollWidth}px`;
    }

    if (tabsContainerDark) {
      const scrollWidthDark = tabsContainerDark.scrollWidth;
      underlineDark.style.width = `${scrollWidthDark}px`;
    }
  }

  updateUnderlineWidth();
  window.addEventListener("resize", updateUnderlineWidth);
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileSearch = document.querySelector(".mobile-search");
  const mobileSearchBtn = document.querySelector(".search-btn-mobile");
  const body = document.body;

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("open");
      mobileNav.classList.toggle("open");

      if (mobileSearch.classList.contains("open")) {
        mobileSearch.classList.remove("open");
      }

      if (mobileNav.classList.contains("open")) {
        body.classList.add("no-scroll");
      } else {
        body.classList.remove("no-scroll");
      }
    });
  }

  if (mobileSearch) {
    mobileSearchBtn.addEventListener("click", function () {
      mobileSearch.classList.toggle("open");

      if (mobileNav.classList.contains("open")) {
        mobileNav.classList.remove("open");
        menuToggle.classList.remove("open");
      }

      if (mobileSearch.classList.contains("open")) {
        body.classList.add("no-scroll");
      } else {
        body.classList.remove("no-scroll");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {

  const passwordInputs = document.querySelectorAll('.password-input');
  const togglePasswordIcons = document.querySelectorAll('.password-icon');

  togglePasswordIcons.forEach((icon, index) => {
    icon.addEventListener('click', function () {
      const passwordInput = passwordInputs[index];
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
    
      if (type === 'password') {
        this.classList.remove('bi-eye');
        this.classList.add('bi-eye-slash');
      } else {
        this.classList.remove('bi-eye-slash');
        this.classList.add('bi-eye');
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const passwordInputs = document.querySelectorAll(".password-input");
  const submitChangePass = document.querySelector(".change-password-submit");
  const validationMessage = document.querySelector(".password-info-message");

  passwordInputs.forEach((passwordInput) => {
    const errorMessage = passwordInput.nextElementSibling.nextElementSibling;

    if (passwordInput.id === "old-pass") {
      return;
    }

    passwordInput.addEventListener("input", function () {
      const password = passwordInput.value;
      const isValid = validatePassword(password);

      if (isValid) {
        passwordInput.classList.add("valid");
        passwordInput.classList.remove("invalid");
        errorMessage.classList.remove("active");
        submitChangePass.disabled = false;

        if (validationMessage) {
          validationMessage.innerText = "Пароль соответствует требованиям";
        }
      } else {
        errorMessage.classList.add("active");
        passwordInput.classList.add("invalid");
        passwordInput.classList.remove("valid");
        submitChangePass.disabled = true;

        if (validationMessage) {
          validationMessage.innerText =
            "Пароль должен быть не менее 8 символов длиной, содержать латинские символы верхнего регистра (A-Z), содержать латинские символы нижнего регистра (a-z), содержать цифры (0-9).";
        }
      }
    });
  });

  function validatePassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isValidLength = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && isValidLength;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("forget-pass");
  const modal = document.getElementById("modal-window");
  const closeButton = document.getElementById("modal-close-btn");
  const body = document.body;

  if (modal) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      modal.classList.add("open");
    });

    closeButton.addEventListener("click", function () {
      modal.classList.remove("open");
    });

    if (modal.classList.contains("open")) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.classList.remove("open");
      }
    });
  }
});

const phoneInput = document.getElementById("phone");
const additionalPhoneInput = document.getElementById("additional-phone");

if (phoneInput) {
  IMask(phoneInput, {
    mask: "+{375}(00)000-00-00",
    lazy: false,
  });
}

if (additionalPhoneInput) {
  IMask(additionalPhoneInput, {
    mask: "+{375}(00)000-00-00",
    lazy: false,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopButton = document.getElementById("scroll-to-top");

  if (scrollToTopButton) {
    window.onscroll = function () {
      if (window.scrollY > 300) {
        scrollToTopButton.style.display = "block";
      } else {
        scrollToTopButton.style.display = "none";
      }
    };

    scrollToTopButton.addEventListener("click", function () {
      window.scrollTo(0, 0);
    });
  }
});

const buildSwiperSlider = (sliderElm) => {
  return new Swiper(`#${sliderElm.id}`, {
    navigation: {
      nextEl: `.swiper-button-next-${sliderElm.id}`,
      prevEl: `.swiper-button-prev-${sliderElm.id}`,
    },
  });
};

const allSliders = document.querySelectorAll(".swiper");

allSliders.forEach((slider) => buildSwiperSlider(slider));

const isMobile = window.innerWidth <= 768;

const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

if (isMobile && isFirefox) {
  document.querySelectorAll(".dropdown").forEach(function (dropdown) {
    const menu = dropdown.querySelector(".dropdown-menu");

    dropdown.addEventListener("click", function (e) {
      e.preventDefault();
      menu.classList.toggle("show");
    });

    document.addEventListener("click", function (event) {
      if (!dropdown.contains(event.target)) {
        menu.classList.remove("show");
      }
    });
  });
}

const clearIcon = document.querySelector("#clear-icon");
const searchInput = document.querySelector("#search-input");

if (clearIcon && searchInput) {
  clearIcon.addEventListener("click", () => {
    searchInput.value = "";
    clearIcon.classList.add("hidden");
  });

  searchInput.addEventListener("input", () => {
    if (searchInput.value.length > 0) {
      clearIcon.classList.remove("hidden");
    } else {
      clearIcon.classList.add("hidden");
    }
  });
}

