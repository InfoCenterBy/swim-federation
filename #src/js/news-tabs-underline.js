document.addEventListener("DOMContentLoaded", function () {
  const tabsContainer = document.querySelector(".news__tabs");
  const tabsContainerDark = document.querySelector(".news__tabs--dark");

  const underline = document.querySelector(".news__tabs .underline");
  const underlineDark = document.querySelector(".news__tabs--dark .underline--dark");

  function updateUnderlineWidth() {
    if (tabsContainer) {
      const scrollWidth = tabsContainer.scrollWidth;
      underline.style.width = `${scrollWidth}px`;
    }

    if (tabsContainerDark) {
      const scrollWidthDark = tabsContainerDark.scrollWidth;
      underlineDark.style.width = `${scrollWidthDark}px`;
    }
  }

  updateUnderlineWidth();
  window.addEventListener("resize", updateUnderlineWidth);
});
