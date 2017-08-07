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
        //hashnav: true,
        autoHeight: true

    });

    var separation;

    if ( $(window).width() > 760 ) {
        separation = 180;
    } else {
        separation = 120;
    }

    var carousel = $(".personal-slider").waterwheelCarousel({
        flankingItems: 1,
        forcedImageWidth: 150,
        forcedImagHeight: 150,
        separation: separation,
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

    $(window).resize(function() {
        if ( $(window).width() > 760 ) {
            separation = 180;
        } else {
            separation = 120;
        }
        carousel.reload({
            separation: separation
        });
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
        //hashnav: true,
        //pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    });

    var partner = new Swiper('.partner-list', {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 20,
        autoplay: 3000,
        breakpoints: {
            320: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            // when window width is <= 480px
            480: {
              slidesPerView: 3,
              spaceBetween: 20
            }
          }
    });

    $('.personal-sert').each(function() {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
            image: {
                verticalFit: true
            },
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300 // don't foget to change the duration also in CSS
            }
        });
    });


   
    $('.about-video__preview').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    $('.service-one').mouseenter(function() {
        $(this).find('video')[0].play();
    });

    $('.service-one').mouseleave(function() {
        $(this).find('video')[0].pause();
    });

    if ( $(window).width < 1024 ) {
        $('.service-one').each(function() {
            $(this).find('video')[0].play();
        });
    }

    $('input[name="phone"]').mask("+7(999) 999-99-99",{placeholder:"_"});

    $('#order').validate({ 
        rules:{
            name:{
                required: true,
            },
            phone:{
                required: true,
            },
            service:{
                required: true,
            },
            time:{
                required: true,
            }
       },

       messages:{
            name:{
                required: "Введите ваше имя",
            },
            phone:{
                required: "Введите ваш телефон",
            },
            service:{
                required: "Выберете услугу",
            },
            time:{
                required: "Выберете время приема",
            }
       },
       submitHandler: function() {

            $('#order').hide();
            $('.after-submit').fadeIn();
        }
    });

    $("#order").submit(function() { //устанавливаем событие отправки для формы с id=form
        var formData = $(this).serialize(); //собераем все данные из формы
        $.ajax({
            type: "POST", //Метод отправки
            url: "/template/send.php", //путь до php фаила отправителя
            data: formData
        });
    });

    $(document).scroll(function() {
        if ( $(document).scrollTop() >= 1200  ) {
            $('.head-fixed').css({
                'top':'0'
            });
        } else {
            $('.head-fixed').css({
                'top':'-100%'
            });
        }
    });


});