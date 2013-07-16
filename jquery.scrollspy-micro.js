(function ($, window) {
    var enableScrollspy = function (elem) {
        var curId;
        var menu = elem.find('a');
        var targets = $.map(menu, function (item) {
            var selector = $(item).attr('href'),
                target = selector !== '#' ? $(selector) : $();
            if (target.length) return target;
        });
        menu.click(function (e) {
            var selector = $(this).attr('href'),
                offset = selector == '#' ? 0 : $(selector).offset().top;
            $('html, body').stop().animate({
                scrollTop: offset
            }, 300);
            e.preventDefault();
        });
        $(window).scroll(function () {
            var fromTop = $(this).scrollTop();
            var cur = $.map(targets, function (el) {
                if (el.offset().top <= fromTop) {
                    return el;
                }
            });
            cur = cur[cur.length-1];
            var id = cur && cur.length ? cur[0].id : "";
            if (curId !== id) {
                curId = id;
                menu.parent().removeClass('active')
                    .end().filter("[href=#"+id+"]").parent().addClass("active");
            }
        });
    };
    $.fn.scrollspy = function () {
        this.each(function () {
            enableScrollspy($(this));
        })
    };
})(jQuery, window);
