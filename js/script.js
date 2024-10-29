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

document.addEventListener("DOMContentLoaded", () => {
  function tabsUnderline() {
    const container = document.querySelector(".news__tabs");
    const underline = document.querySelector(".nav-underline");

    if (container) {
      function updateUnderlineWidth() {
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const scrollX = container.scrollLeft;

        underline.style.setProperty("--scroll-x", scrollX);
        underline.style.setProperty("--scroll-max", scrollWidth - clientWidth);
      }

      container.addEventListener("scroll", updateUnderlineWidth);
      updateUnderlineWidth();
    }
  }
  tabsUnderline();
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

const slider = new Swiper(".slider", {
  breakpoints: {
    330: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    480: {
      slidesPerView: 1,
      spaceBetween: 30,
    },

    640: {
      slidesPerView: 1,
      spaceBetween: 70,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

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

const gridOptions = {
  rowData: [
    {
      "№": "1",
      "Дата выставления": "15.03.2023 14:45",
      "Тип взноса": "Членский взнос",
      "Номер в ЕРИП": "ХХХ ХХХ ХХХХ",
      "Статус оплаты": "Оплачен",
      "Дата оплаты": "15.03.2023 14:45",
      Сумма: "40 BYN",
      Оплатить: "000",
    },
    {
      "№": "2",
      "Дата выставления": "15.03.2023 14:45",
      "Тип взноса": "Членский взнос",
      "Номер в ЕРИП": "ХХХ ХХХ ХХХХ",
      "Статус оплаты": "Оплачен",
      "Дата оплаты": "15.03.2023 14:45",
      Сумма: "40 BYN",
      Оплатить: "000",
    },
    {
      "№": "3",
      "Дата выставления": "01.03.2023 14:45",
      "Тип взноса": "Членский взнос",
      "Номер в ЕРИП": "ХХХ ХХХ ХХХХ",
      "Статус оплаты": "Не оплачен",
      "Дата оплаты": "15.03.2023 14:45",
      Сумма: "40 BYN",
      Оплатить: "000",
    },
    {
      "№": "4",
      "Дата выставления": "11.03.2023 14:11",
      "Тип взноса": "Членский взнос",
      "Номер в ЕРИП": "ХХХ ХХХ ХХХХ",
      "Статус оплаты": "Не оплачен",
      "Дата оплаты": "15.03.2023 14:45",
      Сумма: "40 BYN",
      Оплатить: "000",
    },
    {
      "№": "5",
      "Дата выставления": "15.03.2023 14:45",
      "Тип взноса": "Вступительный взнос ",
      "Номер в ЕРИП": "ХХХ ХХХ ХХХХ",
      "Статус оплаты": "Оплачен",
      "Дата оплаты": "15.03.2023 14:45",
      Сумма: "40 BYN",
      Оплатить: "000",
    },
    {
      "№": "6",
      "Дата выставления": "15.03.2023 14:45",
      "Тип взноса": "Вступительный взнос ",
      "Номер в ЕРИП": "ХХХ ХХХ ХХХХ",
      "Статус оплаты": "Оплачен",
      "Дата оплаты": "15.03.2023 14:45",
      Сумма: "40 BYN",
      Оплатить: "000",
    },
  ],

  columnDefs: [
    { field: "№" },
    { field: "Дата выставления" },
    { field: "Тип взноса" },
    { field: "Номер в ЕРИП" },
    { field: "Статус оплаты" },
    { field: "Дата оплаты" },
    { field: "Сумма" },
    { field: "Оплатить" },
  ],
  defaultColDef: {
    flex: 1,
  },

  onColumnMoved: onColumnMoved,
  onColumnResized: onColumnResized,
  onSortChanged: onSortChanged,
  onGridReady: onGridReady,
};

function onColumnMoved(params) {
  const columnState = params.api.getColumnState();
  console.log("moved");

  localStorage.setItem("agColumnState", JSON.stringify(columnState));
}

function onColumnResized(params) {
  const columnState = params.api.getColumnState();
  console.log("resize");

  localStorage.setItem("agColumnState", JSON.stringify(columnState));
}

function onSortChanged(params) {
  const columnState = params.api.getColumnState();
  console.log("sort");

  localStorage.setItem("agColumnState", JSON.stringify(columnState));
}

function onGridReady(params) {
  const columnState = JSON.parse(localStorage.getItem("agColumnState"));

  if (columnState) {
    console.log("ready");

    params.api.applyColumnState({ state: columnState, applyOrder: true });
  }
}

const ediv = document.querySelector("#contributions-table");

const gridApi = agGrid.createGrid(ediv, gridOptions);
