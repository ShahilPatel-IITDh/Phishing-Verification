$(document).ready(function(){
    $('#search-text').focus(function(){
        if($('#search-text').val()=='Hledat'){
            $('#search-text').val('').css('font-style', 'normal').css('color', '#000000');
        }
    });
    $('#search-text').blur(function(){
        if($('#search-text').val()==''){
            $('#search-text').val('Hledat').css('font-style', 'italic').css('color', '#706565');
        }
    });
    $('#news-text').focus(function(){
        if($('#news-text').val()=='Zadejte svůj email'){
            $('#news-text').val('').css('font-style', 'normal').css('color', '#000000');
        }
    });
    $('#news-text').blur(function(){
        if($('#news-text').val()==''){
            $('#news-text').val('Zadejte svůj email').css('font-style', 'italic').css('color', '#706565');
        }
    });
    
    // cycle teasers in teaser box
    $(function () {
            $('.teaser-box').before('<div id="teaser-menu">')
            .cycle({
                fx:     'fade',
                speed:   1000,
                timeout: 4000,
                pause:   1,
                cleartypeNoBg:  true,
                pager:  '#teaser-menu',
                pagerAnchorBuilder: function(idx, slide) {
                    return '<a href="' + $(slide).children('a.whole').attr('href') + '">' + $(slide).children('.title-in-menu').text() +  '</a>'; 
                },
                onPagerEvent: function(idx, slide) {
                    window.location = $(slide).children('a.whole').attr('href');
                },
	            pagerEvent:	'click'
            }); // onPagerEvent a pagerEvent pridany aby pager rovnou presmerovaval na danou url a necykloval

        });


$('.login-link').click(function () {
    $('.login-form').toggle();
    return false;
});

// advanced filters toggler
$('.filterbox .advanced-toggler').click(function () {
    if($('.filters-advanced').css('display') == 'none'){
        $('.filters-advanced').slideDown(function(){
            $('.filterbox .advanced-toggler').addClass('opened');
            $('.filterbox .advanced-toggler').text('Skrýt podrobné filtry');
        });
        
    }else{
        $('.filters-advanced').slideUp(function(){
                $('.filterbox .advanced-toggler').removeClass('opened');
                $('.filterbox .advanced-toggler').text('Zobrazit podrobné filtry');
        });
        
    }
    
    return false;
});

// if there are some filled advanced filters open advanced
$('.filterbox .filters-advanced select').each(function() {
    if($(this).val()!=''){
        $('.filters-advanced').css('display', 'block');
        $('.filterbox .advanced-toggler').addClass('opened');
        $('.filterbox .advanced-toggler').text('Skrýt podrobné filtry');
    };
});

// if there are some checked filters open advanced
var checked = $('.filters-advanced .checkbox:checked').length;
if(checked > 0){
        $('.filters-advanced').css('display', 'block');
        $('.filterbox .advanced-toggler').addClass('opened');
    };


// show only first 5 countries in sidebarmenu if you are not in submenu
if($('.countries ul .level-1').hasClass('active')) {
    $('.countries .more-countries').hide();
    $('.countries .less-countries').show();
}else{
    var count = 0;
    $('.countries ul .level-1').each(function(count) {
        if(count < 5){
            count = count + 1;
        }else{
            $(this).hide();
        };
    });
}


// show all countries in sidebarmenu
$('.more-countries').click(function () {
    $('.countries ul .level-1').show();
    $('.countries .more-countries').hide();
    $('.countries .less-countries').show();
    return false;
});

// hide morecountries in sidebarmenu
$('.less-countries').click(function () {
    // show only first 5 countries in sidebarmenu
    var count = 0;
    $('.countries ul .level-1').each(function(count) {
        if(count < 5){
            count = count + 1;
        }else{
            $(this).hide();
        };
    });

    $('.countries .less-countries').hide();
    $('.countries .more-countries').show();
    return false;
});


//if in .active-section category, use an active-section link as toggle instead of redirect usage

$('.toggler').click(function () {
    $(this).parent().find('ul').toggle();
    if($(this).parent().find('ul').css('display')=='none'){
        $(this).addClass('plus');
    }else{
        $(this).removeClass('plus');
    }
    return false;
});


    // show items in section
    $('.sidebar .toggle-show').click(function () {
        $(this).parent().parent().find('ul').slideDown(500);
        $(this).hide();
        $(this).parent().find('.toggle-hide').show();
        return false;
    });
    // show items in section
    $('.sidebar .toggle-hide').click(function () {
        $(this).parent().parent().find('ul').slideUp(500);
        $(this).hide();
        $(this).parent().find('.toggle-show').show();
        return false;
    });
    
    // if there is section active
    $('.toggled ul li').each(function() {
        if($(this).hasClass('active')) {
            $(this).parent().parent().find('ul').slideDown(500);
            $(this).parent().parent().find('h3 .toggle-hide').show();
            $(this).parent().parent().find('h3 .toggle-show').hide();
        }
    });

});