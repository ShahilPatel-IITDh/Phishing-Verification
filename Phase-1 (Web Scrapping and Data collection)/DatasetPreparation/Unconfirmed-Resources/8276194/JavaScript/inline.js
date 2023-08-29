
    $(document).ready(function() {
        $(window).load(function() {
            setTimeout(function() {
                $('#exampleModalToggle').modal('show');
            }, 6000);
        });


        // model data
        $(document).on("click", ".model-btn", function() {
            var dataId = $(this).attr('form-value');
            $("#form_value").val(dataId);
        });


        $('#image-gallery').lightSlider({
            gallery: true,
            item: 1,
            thumbItem: 9,
            slideMargin: 0,
            speed: 500,
            auto: true,
            loop: true,
            onSliderLoad: function() {
                $('#image-gallery').removeClass('cS-hidden');
            }
        });
    });
    