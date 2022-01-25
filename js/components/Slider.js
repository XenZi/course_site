const Slider = () => {
    let slidersTestimonials = document.querySelectorAll(".slide");

    const removeAllSliders = () => {
        const sliderRows = document.querySelectorAll(".slider__row");
        sliderRows.forEach((slide) => slide.classList.add("slider--none"));
    };

    const showSpecifiedSlider = (slideID) => {
        removeAllSliders();
        const specifiedSlider = document.querySelector(
          `[data-sliderRow="${slideID}"]`
        );
        specifiedSlider.classList.remove("slider--none");
        specifiedSlider.classList.add("slider--visible");
    };

    const removeSliderActive = () => {
        slidersTestimonials.forEach((slide) =>
          slide.classList.remove("slide--active")
        );
    };

    slidersTestimonials.forEach((slide) => {
        slide.addEventListener("click", () => {
          showSpecifiedSlider(slide.getAttribute("data-slide"));
          removeSliderActive();
          slide.classList.add("slide--active");
        });
    });
};

export default Slider;