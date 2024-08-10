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
});