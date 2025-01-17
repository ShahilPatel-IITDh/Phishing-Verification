jQuery(function($){'use strict';$(window).ready(function(){$('#preloader').delay(200).fadeOut('fade');});$(window).on('scroll',function(){if($(this).scrollTop()>0){$('.navbar').addClass('affix');$('.scroll-to-target').addClass('open');}else{$('.navbar').removeClass('affix');$('.scroll-to-target').removeClass('open');}
if($(this).scrollTop()>500){$('.scroll-to-target').addClass('open');}else{$('.scroll-to-target').removeClass('open');}});$('.sub-menu a.dropdown-toggle').on('click',function(e){if(!$(this).next().hasClass('show')){$(this).parents('.sub-menu').first().find('.show').removeClass("show");}
var $subMenu=$(this).next(".sub-menu");$subMenu.toggleClass('show');$(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown',function(e){$('.dropdown-submenu .show').removeClass("show");});return false;});if($('.scroll-to-target').length){$(".scroll-to-target").on('click',function(){var target=$(this).attr('data-target');$('html, body').animate({scrollTop:$(target).offset().top},500);});}
$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({disableOn:700,type:'iframe',mainClass:'mfp-fade',removalDelay:160,preloader:false,fixedContentPos:false});$('.popup-gallery').magnificPopup({delegate:'a',type:'image',tLoading:'Loading image #%curr%...',mainClass:'mfp-img-mobile',gallery:{enabled:true,navigateByImgClick:true,preload:[0,1]},image:{tError:'<a href="---l%/index.htm">The image #%curr%</a> could not be loaded.',titleSrc:function(item){return item.el.attr('title')+'<small>by Marsel Van Oosten</small>';}}});$('.hero-bg-slider').owlCarousel({loop:true,margin:0,items:1,nav:false,dots:true,responsiveClass:true,autoplay:true,autoplayTimeout:4500,autoplayHoverPause:true,autoplaySpeed:3500,lazyLoad:true,});$('.hero-slider-one').owlCarousel({loop:true,autoplay:true,dots:true,autoplayHoverPause:true,items:1,smartSpeed:1000,animateOut:"slideOutUp",animateIn:"slideInDown",});$('.hero-content-slider').owlCarousel({loop:false,autoplay:true,dots:true,autoplayHoverPause:true,items:1,smartSpeed:1000,animateOut:"slideOutUp",animateIn:"slideInDown",});$('.custom-indicator-slider').owlCarousel({items:1,nav:false,dots:true,smartSpeed:1000,animateOut:"slideOutUp",animateIn:"slideInDown",dotsContainer:'#carousel-custom-indicator',});var isFirstTime=true;var interval=null;var countSelector=$('.single-counter > h3, .single-card > h3');if(countSelector.length){var startingTop=countSelector.offset().top-window.innerHeight;if(startingTop>0){$(window).on('scroll',function(){if(isFirstTime&&$(window).scrollTop()>startingTop){startCounting();isFirstTime=false;}});}else{startCounting();}}
function incrementValue(value){var incVal=0;if(Math.ceil(value/2)<=5){incVal=1;}
else if(Math.ceil(value/10)<=10){incVal=10;}
else if(Math.ceil(value/100)<=10){incVal=25;}
else if(Math.ceil(value/100)<=100){incVal=50;}
else if(Math.ceil(value/1000)<=100){incVal=150;}
else{incVal=500;}
return incVal;}
function count(counters,start,value,id){var localStart=start;var inc=incrementValue(value);interval=setInterval(function(){if(localStart<value){localStart=localStart+inc;counters[id].innerHTML=localStart;}},40);}
function startCounting(){var counters=$(".single-counter > h3, .single-card > h3");var countersQuantity=counters.length;var counter=[];for(var i=0;i<countersQuantity;i++){counter[i]=parseInt(counters[i].innerHTML);}
for(var j=0;j<countersQuantity;j++){count(counters,0,counter[j],j);}}
$('.client-testimonial-1').owlCarousel({loop:true,margin:30,nav:false,dots:true,responsiveClass:true,autoplay:true,autoplayHoverPause:true,lazyLoad:true,items:1,});$('.client-testimonial').owlCarousel({loop:true,margin:30,nav:true,dots:false,responsiveClass:true,autoplay:true,autoplayHoverPause:true,lazyLoad:true,responsive:{0:{items:1},500:{items:1},600:{items:2},800:{items:2},1200:{items:3}}});$('.hero-content-slider').owlCarousel({loop:true,margin:30,nav:false,dots:false,responsiveClass:true,autoplay:true,autoplayHoverPause:true,lazyLoad:true,items:1,});$('.clients-carousel').owlCarousel({autoplay:true,loop:true,margin:15,dots:false,slideTransition:'linear',autoplayTimeout:4500,autoplayHoverPause:true,autoplaySpeed:4500,responsive:{0:{items:2},500:{items:3},600:{items:4},800:{items:5},1200:{items:6}}});$(function(){var containerEl=document.querySelector("#MixItUp");if(typeof(containerEl)!='undefined'&&containerEl!=null){var mixer=mixitup(containerEl,{selectors:{control:'[data-mixitup-control]',},animation:{effects:"fade translateZ(-100px)",}});}});$(document).ready(function(){$(".player").YTPlayer();});$('.work-process-carousel').each(function(){var a=$(this),items=a.data('items')||[1,1,1],margin=a.data('margin'),loop=a.data('loop'),nav=a.data('nav'),dots=a.data('dots'),center=a.data('center'),autoplay=a.data('autoplay'),autoplaySpeed=a.data('autoplay-speed'),rtl=a.data('rtl'),autoheight=a.data('autoheight');var options={nav:nav||true,loop:loop||false,dots:dots||false,center:center||false,autoplay:autoplay||false,autoHeight:autoheight||false,rtl:rtl||false,margin:margin||0,autoplayTimeout:autoplaySpeed||3000,autoplaySpeed:400,autoplayHoverPause:true,responsive:{0:{items:items[2]||1},576:{items:items[1]||1},1200:{items:items[0]||1}}};a.owlCarousel(options);});$('.gallery').owlCarousel({autoplay:true,loop:true,margin:15,nav:false,autoplayTimeout:4500,autoplaySpeed:400,autoplayHoverPause:true,responsive:{0:{items:2},500:{items:3},600:{items:4},800:{items:5},1200:{items:6}}});function wowAnimation(){new WOW({offset:100,mobile:true}).init()}
wowAnimation()
$('#clock').countdown('2022/01/30',function(event){$(this).html(event.strftime(''+
'<div class="row">'+
'<div class="col">'+
'<h2 class="mb-1">%-D</h2>'+
'<h5>Day%!d</h5>'+
'</div>'+
'<div class="col">'+
'<h2 class="mb-1">%H</h2>'+
'<h5>Hours</h5>'+
'</div>'+
'<div class="col">'+
'<h2 class="mb-1">%M</h2>'+
'<h5>Minutes</h5>'+
'</div>'+
'<div class="col">'+
'<h2 class="mb-1">%S</h2>'+
'<h5>Seconds</h5>'+
'</div>'+
'</div>'));});if($("#getQuoteFrm").length){$("#getQuoteFrm").validator().on("submit",function(event){if(event.isDefaultPrevented()){submitMSG(false,'.sign-up-form-wrap');}else{event.preventDefault();submitGetQuoteForm();}});}
function submitGetQuoteForm(){var name=$('#getQuoteFrm input[name="name"]').val();var email=$('#getQuoteFrm input[name="email"]').val();var subject=$('#getQuoteFrm input[name="subject"]').val();var message=$('#getQuoteFrm textarea[name="message"]').val();if(!$('#getQuoteFrm #exampleCheck1').is(":checked")){submitMSG(false,'.sign-up-form-wrap');return;}
$.ajax({type:"POST",url:"libs/quote-form-process.php",data:"name="+name+"&email="+email+"&subject="+subject+"&message="+message,success:function success(text){if(text=="success"){quoteFormSuccess();}else{submitMSG(false,'.sign-up-form-wrap');}}});}
function quoteFormSuccess(){$("#getQuoteFrm")[0].reset();submitMSG(true,'.sign-up-form-wrap');}
if($("#contactForm").length){$("#contactForm").validator().on("submit",function(event){if(event.isDefaultPrevented()){submitMSG(false,'.contact');}else{event.preventDefault();submitContactForm();}});}
function submitContactForm(){var name=$('#contactForm input[name="name"]').val();var email=$('#contactForm input[name="email"]').val();var message=$('#contactForm textarea[name="message"]').val();$.ajax({type:"POST",url:"libs/contact-form-process.php",data:"name="+name+"&email="+email+"&message="+message,success:function(text){if(text=="success"){formSuccess();}else{submitMSG(false,'.contact');}}});}
function formSuccess(){$("#contactForm")[0].reset();submitMSG(true,'.contact');}
function submitMSG(valid,parentSelector){if(valid){$(parentSelector+" .message-box").removeClass('d-none').addClass('d-block ');$(parentSelector+" .message-box div").removeClass('alert-danger').addClass('alert-success').text('Form submitted successfully');}else{$(parentSelector+" .message-box").removeClass('d-none').addClass('d-block ');$(parentSelector+" .message-box div").removeClass('alert-success').addClass('alert-danger').text('Found error in the form. Please check again.');}}});