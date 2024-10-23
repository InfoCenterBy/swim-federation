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
