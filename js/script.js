document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.querySelector(".search-btn");
  const searchInput = document.querySelector(".search-input");
  const links = document.querySelectorAll(".header .link");

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
});

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("open");
    mobileNav.classList.toggle("open");
  });
});

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
    delay: 4000,
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
    delay: 4000,
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

window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".news__tabs");
  const underline = document.querySelector(".nav-underline");

  function updateUnderlineWidth() {
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const scrollX = container.scrollLeft;

    underline.style.setProperty("--scroll-x", scrollX);
    underline.style.setProperty("--scroll-max", scrollWidth - clientWidth);
  }

  container.addEventListener("scroll", updateUnderlineWidth);
  updateUnderlineWidth();
});
