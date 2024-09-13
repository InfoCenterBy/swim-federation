document.addEventListener("DOMContentLoaded", () => {
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
});
