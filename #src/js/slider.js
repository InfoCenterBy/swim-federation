const buildSwiperSlider = (sliderElm) => {
  return new Swiper(`#${sliderElm.id}`, {
    navigation: {
      nextEl: `.swiper-button-next-${sliderElm.id}`,
      prevEl: `.swiper-button-prev-${sliderElm.id}`,
    },
  });
};

const allSliders = document.querySelectorAll(".swiper");

allSliders.forEach((slider) => buildSwiperSlider(slider));
