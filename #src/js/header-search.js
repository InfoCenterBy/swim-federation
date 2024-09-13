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

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('forget-pass');
  const modal = document.getElementById('modal');
  const closeButton = document.getElementById('modalClose');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    modal.style.display = 'flex';
  });

  closeButton.addEventListener('click', function() {
    modal.style.display = 'none'; // Скрыть модальное окно
  });

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none'; // Скрыть модальное окно при клике вне его
    }
  });
});