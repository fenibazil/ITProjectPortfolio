// Функции для инициализации на всех страницах

module.exports = (function () {
    function init() {
        $('body').on('click','a.js_anchor-scroll',function (e) {
            var my_link = $(this);
            var scroll_to = $(my_link.attr('href'));
            $('html, body').animate({
                scrollTop: scroll_to.offset().top
            }, 500);
            e.preventDefault();
            return false;
        });
    }

    return {
       init
    }
}());