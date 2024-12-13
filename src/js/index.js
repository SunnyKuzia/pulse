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
        if (event.target.matches('.overlay') || event.target.matches('.modal__close')) {
            // чтобы при клике на затемненную область не происходило сработки события клика на самой форме(при погружении события) 
            // крестик прописали тоже сюда чтобы не прописывать для него отдельно правила
            $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
            $('body').css('overflow', '');
        };
    });

    $('.button_mini').each(function (i) {
        $(this).click(function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
            $('body').css('overflow', 'hidden');
        });
    });



    //Validation forms (jQuery Validation plugin)




    function validateForms(formSelector) {
        // метод .validate() применяется только для одной формы, поэтому мы каждой форме задаем id или ее родителю, находим ее по id и вызываем этот метод каждой форме индивидуально
        $(formSelector).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: 'required',
                email: {
                    required: true,
                    email: true // проверка что на самом деле введен email
                }
            },
            messages: {
                name: {
                    required: "Введите имя",
                    minlength: jQuery.validator.format("Необходимо ввести как минимум {0} символа!")
                },
                phone: 'Введите номер телефона',
                email: {
                    required: "Введите адрес электронной почты",
                    email: "Неверный адрес электронной почты"
                }
            } //структура объекта messages одинакова со структурой объекта rules
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');



    // Masked phone number



    $('input[name=phone]').mask('+375(99) 999-99-99');



    // Отправка писем с сайта


    $('form').submit(function (e) { //навешиваем на все формы обработчик
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        } //если в форме есть незаполненные поля (не прошла валидацию), она не отправится

        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize() // $(this) это те данные которые мы получили из формы на которой сработал submit, также здесь мы их приводим в необходимый для сервера формат serialize
        }).done(function () {
            $(this).find('input').val(''); //все inputs внутри данной формы мы очищаем после отправки данных
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset'); // очищаем все формы
        });
        return false;
    });


    // Smooth scroll and pageup

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

});


