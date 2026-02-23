// Функции для инициализации на всех страницах

module.exports = (function () {
    function init() {
        const toTopButton = document.querySelector('.js_to-top');
        if (toTopButton) {
            const SHOW_OFFSET = 0;

            function toggleVisibility() {
                if (window.scrollY > SHOW_OFFSET) {
                toTopButton.classList.add('is-visible');
                } else {
                toTopButton.classList.remove('is-visible');
                }
            }

            window.addEventListener('scroll', toggleVisibility, {
                passive: true
            });

            toggleVisibility();

            toTopButton.addEventListener('click', () => {
                window.scrollTo({
                top: 0,
                behavior: 'smooth'
                });
            });
        }

    }

    return {
       init
    }
}());