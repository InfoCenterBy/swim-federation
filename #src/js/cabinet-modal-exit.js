document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal-window-exit");
  const closeButton = document.getElementById("modal-close-btn");
  const cancelButton = document.querySelector(".cancel-btn");
  const exitBtns = document.querySelectorAll(".exit-btn");
  const body = document.body;

  if (modal) {
    exitBtns.forEach((btn) =>
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.add("open");
      })
    );

    closeButton.addEventListener("click", function () {
      modal.classList.remove("open");
    });

    cancelButton.addEventListener("click", function () {
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
