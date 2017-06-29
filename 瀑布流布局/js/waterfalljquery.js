$(window).on('load', function() {
    waterfall();
   $(window).resize(function() {
        waterfall();
    });
    var dataint = { "data": [{ "src": "0.jpg" }, { "src": "1.jpg" }, { "src": "2.jpg" }, { "src": "3.jpg" }, { "src": "4.jpg" }, { "src": "5.jpg" }, { "src": "6.jpg" }, { "src": "7.jpg" }, { "src": "8.jpg" }, { "src": "9.jpg" }, { "src": "10.jpg" }, { "src": "11.jpg" }, { "src": "12.jpg" }] };
    $(window).on('scroll', function() {
        if (checkscrollslide()) {
            $.each(dataint.data, function(key, value) {
                var obox = $('<div>').addClass('box').appendTo($('#main'));
                var opic = $('<div >').addClass('pic').appendTo(obox);
                $('<img>').attr('src', 'images/' + $(value).attr('src')).appendTo(opic);
            })
        }
        waterfall();
    })
})

function waterfall() {
    var box = $("#main .box");
    var boxw = box.eq(0).outerWidth();
    var cols = Math.floor($(window).width() / boxw);
    $('#main').width(boxw * cols).css('margin', '0 auto');
    var a = [];
    box.each(function(index, value) {
        var h = box.eq(index).outerHeight();
        if (index < cols) {
            a[index] = h;
            $(value).css({
                'position': 'absolute',
                'top': 0 + "px",
                'left': index * boxw + 'px'
            });
        } else {
            var minh = Math.min.apply(null, a);
            var minhindex = $.inArray(minh, a);
            $(value).css({
                'position': 'absolute',
                'top': minh + "px",
                'left': minhindex * boxw + 'px'
            });
            a[minhindex] += h;
        }
    })
}


function checkscrollslide() {
    var lastbox = $('#main>.box').last();
    var lastboxtop = lastbox.offset().top;
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    return (lastboxtop < scrollTop + documentH) ? true : false;
}
