
            $(document).ready(function () {
                $("#assets-slider").slick({
                    dots: false,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    arrows: false,
                    speed: 300,
                    slidesToShow: 1,
                    centerMode: true,
                    variableWidth: true,
                });
                $("#slider_features").slick({
                    dots: false,
                    infinite: true,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    controls: true,
                    arrows: true,
                    speed: 300,
                    slidesToShow: 1,
                    centerMode: true,
                    variableWidth: true,
                });
                $("#slider_reviews_slider").slick({
                    dots: false,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    arrows: false,
                    speed: 300,
                    slidesToShow: 1,
                    centerMode: true,
                    variableWidth: true,
                });
            });
        