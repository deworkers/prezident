$(document).ready(function() {
    

    var scrollTo = function(pos) {
        var pos;
        $('html,body').animate({scrollTop:pos}, 1000);
        return false;
    }

    $('.j-scroll-to').click(function(event) {
        event.preventDefault(); 
        var div = $(this).attr('href');
        var toPos = $(div).offset().top;
        scrollTo(toPos);
    });

    /*Модальные окна*/
    var overlay = $('#overlay'); 
    var open_modal = $('.open_modal'); 
    var close = $('.modal__close'); 
    var modal = $('.modal'); 

    // для открытия модалки нужна ссылка вида <a href="#name"></a> и класс "open_modal"
    // будет открыта модалка с id="name"
    open_modal.click( function(event){
        modal.fadeOut(200);
        event.preventDefault(); 
        var div = $(this).attr('href'); 
        overlay.fadeIn(400);
        $(div).fadeIn(400);
        $('html, body').addClass('j-noScroll');
        baseBoxHeight = $('.mobile-menu__right').height();
    });

    close.click(function() {
        modal.fadeOut(200);
        overlay.fadeOut(200);
        $('html, body').removeClass('j-noScroll');
    });

    overlay.click(function(event) {
        if ( $( event.target ).attr('id') == 'overlay' ) {
            $(this).fadeOut(200);
            modal.fadeOut(200);
            $('html, body').removeClass('j-noScroll');
        }
    });

    /*селект*/
    $('.select').click(function(e) {
        if ( !$(this).hasClass('j-open') ) {
            e.stopPropagation();
            $(this).addClass('j-open');
            $('.select-list').hide();
            $('.select').not(this).removeClass('j-open');
            $(this).find('.select-list').slideDown(200);
        } else {
            $(this).find('.select-list').slideUp(200);
            $(this).removeClass('j-open');
        }
    });


    // подстановка значения по умолчанию
    $('.select').each(function() {
        var val = $(this).find('.select-default').text();
        $(this).find('.select-default').addClass('selected');
        console.log(val);
        $(this).find('input').val(val);
    })

    $('body').click(function() {
        $('.select-list').slideUp(200);
        $('.select').removeClass('j-open');
    });

    $('.select-list__one').click(function(e) {
        e.stopPropagation();
        var val = $(this).text();
        $('.select').removeClass('j-open');
        $(this).parents('.select').find('input').val(val);
        $(this).parents('.select').find('.select-list').slideUp(200);
        $(this).parents('.select-list').find('.select-list__one').removeClass('selected');
        $(this).addClass('selected');
    });

    var swiper = new Swiper('.personal-descr', {
        loop: true,
        slidesPerView: 1,
        hashnav: true,

    });

    var carousel = $(".personal-slider").waterwheelCarousel({
        flankingItems: 1,
        forcedImageWidth: 300,
        movedToCenter: function ($item) {
            $('#callback-output').prepend('movedToCenter: ' + $item.attr('id') + '<br/>');
        },
        movedFromCenter: function ($item) {
            $('#callback-output').prepend('movedFromCenter: ' + $item.attr('id') + '<br/>');
        },
        clickedCenter: function ($item) {
          $('#callback-output').prepend('clickedCenter: ' + $item.attr('id') + '<br/>');
        }
    });

    $('.personal-slider-one').on('click', function() {
        thisId = $(this).data('id');
        swiper.slideTo(thisId, 300, function(){
            //
        });
    });


    var about = new Swiper('.about-slider', {
        loop: true,
        slidesPerView: 1,
        hashnav: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    });

});