document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cabinet__form");
  const modal = document.getElementById("modal-window");
  const closeButton = document.querySelectorAll(".modal-close-btn");
  const body = document.body;

  if (modal && form && closeButton) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      modal.classList.add("open");
      body.classList.add("no-scroll");
    });

    closeButton.forEach((btn) => {
      btn.addEventListener("click", function () {
        modal.classList.remove("open");
        body.classList.remove("no-scroll");
      });
    });

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.classList.remove("open");
        body.classList.remove("no-scroll");
      }
    });
  }
});
