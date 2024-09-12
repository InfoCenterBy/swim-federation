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