document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const cabinetMobileMenu = document.querySelector(".cabinet__mobile-menu");
  const cabinetMobileProfile = document.querySelector(".cabinet__mobile-profile");
  const profileButton = document.querySelector(".cabinet__profile-btn");
  const body = document.body;

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("open");
      cabinetMobileMenu.classList.toggle("open");

      if (cabinetMobileProfile.classList.contains("open")) {
        cabinetMobileProfile.classList.remove("open");
      }

      if (cabinetMobileMenu.classList.contains("open")) {
        body.classList.add("no-scroll");
      } else {
        body.classList.remove("no-scroll");
      }
    });
  }

  if (cabinetMobileProfile) {
    profileButton.addEventListener("click", function () {
      cabinetMobileProfile.classList.toggle("open");

      if (cabinetMobileMenu.classList.contains("open")) {
        cabinetMobileMenu.classList.remove("open");
        menuToggle.classList.remove("open");
      }

      if (cabinetMobileProfile.classList.contains("open")) {
        body.classList.add("no-scroll");
      } else {
        body.classList.remove("no-scroll");
      }
    });
  }
});
