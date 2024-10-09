const slider = new Swiper(".slider", {
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    330: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    480: {
      slidesPerView: 1,
      spaceBetween: 30,
    },

    640: {
      slidesPerView: 1,
      spaceBetween: 70,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
