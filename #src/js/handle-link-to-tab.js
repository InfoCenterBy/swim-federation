document.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash;

  if (hash) {
    const tabTriggerEl = document.querySelector('button[data-bs-target="' + hash + '"]');

    if (tabTriggerEl) {
      tabTriggerEl.click((e) => {
        e.preventDefault();
      });
    }
  }

  window.location.hash = "";
});
