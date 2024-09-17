document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopButton = document.getElementById("scroll-to-top");

  if (scrollToTopButton) {
    window.onscroll = function () {
      if (window.scrollY > 300) {
        scrollToTopButton.style.display = "block";
      } else {
        scrollToTopButton.style.display = "none";
      }
    };

    scrollToTopButton.addEventListener("click", function () {
      window.scrollTo(0, 0);
    });
  }
});
