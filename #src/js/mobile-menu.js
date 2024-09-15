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
