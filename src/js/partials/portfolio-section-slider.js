const Swiper = require('swiper').default;
const { Navigation, Pagination, Autoplay } = require('swiper/modules');

module.exports = (function () {
    function init() {
        const portfolioSectionSlider = new Swiper('.js_portfolio-section-slider', {
            modules: [Navigation, Autoplay],
            slidesPerView: 1,
            loop: true,

            autoplay: {
                delay: 5000, // 5 секунд
                disableOnInteraction: false, // не останавливать после клика
                pauseOnMouseEnter: true,
            }
        });
    }

    return {
       init
    }
}());