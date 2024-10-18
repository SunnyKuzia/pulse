// $(document).ready выполняет код после построения DOM страницы 
$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,// наш слайдер подстраивается под размеры картинок (они разной высоты)
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow-left.png" alt="arrow-left"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow-right.png" alt="arrow-right"></button>',
        // путь прописан относительно index.html где подключен index.js
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            });
        });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    //Modal

    //мы присвоили всем кнопкам, которые вызывают модальное окно для дальнейшей консультации атрибут data-modal=consultation и по нему найдем их и зададим обработчик на клик 
    $('[data-modal=consultation]').click(function () {
        $('.overlay, #consultation').fadeIn('slow');
        $('body').css('overflow', 'hidden');
    });

    $('.modal__close, .overlay').click(function (event) {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
        if (event.target.matches('.overlay')) {
            $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
        };
        $('body').css('overflow', '');
    });

    $('.button_mini').each(function (i) {
        $(this).click(function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
            $('body').css('overflow', 'hidden');
        });
    });
});
