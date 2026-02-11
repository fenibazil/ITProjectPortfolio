const Swiper = require('swiper').default;
const { Navigation, Pagination, Autoplay } = require('swiper/modules');

module.exports = (function () {
    function init() {
        const portfolioSlider = new Swiper('#portfolio-slider', {
            modules: [Navigation, Autoplay],
            slidesPerView: 1,
            loop: true,

            autoplay: {
                delay: 3000, // 5 секунд
                disableOnInteraction: false, // не останавливать после клика
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: '.js_portfolio-slider-button-next',
                prevEl: '.js_portfolio-slider-button-prev',
            },
        });
    }

    return {
       init
    }
}());