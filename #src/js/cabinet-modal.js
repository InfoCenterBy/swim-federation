document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cabinet__form");
  console.log(form);

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
