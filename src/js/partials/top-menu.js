module.exports = (function () {
    function init() {
        const menu = document.querySelector('.js_top-menu');
        if (!menu) return;

        const toggle = menu.querySelector('.js_top-menu-toggle');
        const list = menu.querySelector('.js_top-menu-list');
        const items = menu.querySelectorAll('.js_top-menu-item');

        const LG_BREAKPOINT = 992;

        function isMobile() {
            return window.innerWidth < LG_BREAKPOINT;
        }

        toggle?.addEventListener('click', () => {
            list.classList.toggle('is-open');
            toggle.classList.toggle('is-open');
        });

        items.forEach(item => {

            const subMenu = item.querySelector('.js_top-menu-sublist');
            if (!subMenu) return;

            const link = item.querySelector('a');

            link.addEventListener('click', (e) => {

            // desktop — ничего не перехватываем
            if (!isMobile()) return;

            // если подменю закрыто → открыть
            if (!item.classList.contains('is-open')) {
                e.preventDefault();

                // закрываем остальные
                items.forEach(i => i.classList.remove('is-open'));

                item.classList.add('is-open');
            }
            // если уже открыто — переход по ссылке произойдет
            });
        });

        window.addEventListener('resize', () => {
            if (!isMobile()) {
                list.classList.remove('is-open');
                items.forEach(i => i.classList.remove('is-open'));
            }
        });
    }

    return {
       init
    }
}());