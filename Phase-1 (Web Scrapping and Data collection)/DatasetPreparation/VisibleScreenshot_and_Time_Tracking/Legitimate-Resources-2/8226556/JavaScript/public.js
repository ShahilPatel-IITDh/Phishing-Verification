$(function(){

    // BACK TOP
	$(".back-top").click(function(){
    	$('html,body').animate({scrollTop:0},500); 
    })

	//TAB
	$(".js-tab-box").each(function(i){
		$(this).attr("id","js-tab-box-"+i);
	})
	
	$(".js-tab").each(function(i){
		$(this).attr("id","js-tab-"+i);
	
		$(this).children("span,a,li").click(function(){
	
			$(this).addClass("active").siblings().removeClass("active");
			
			var index = $(this).index(); 
			
			$("#js-tab-box-"+i).find(".js-tab-con").eq(index).addClass("active").siblings().removeClass("active");
			
		})
	})



	$(".fixed-bottom .close").click(function(){
    	$('.fixed-bottom').addClass("active");
    	$(".fixed-bottom-small").addClass("active");
   })
	$(".fixed-bottom-small").click(function(){
    	$('.fixed-bottom').removeClass("active");
   		$(".fixed-bottom-small").removeClass("active");
    })
	
	
	
	
	
	//  ========== 
	//  = MB-MENU = 
	//  ========== 
	$(".js-mb-nav").click(function(){
		if (!$(this).hasClass("active")) {
			$(this).addClass("active");
			$(".js-mb-menu").animate({"left":"30%"},200);
			$(".page-wrap").animate({"right":"70%"},200);
			$(".mb-header").animate({"right":"70%"},200);
			$(".mb-footer").animate({"right":"70%"},200);
			$(".shade").show();
		}else {
			$(this).removeClass("active");
			$(".js-mb-menu").animate({"left":"100%"},200);
			$(".page-wrap").animate({"right":"0"},200);
			$(".mb-header").animate({"right":"0"},200);
			$(".mb-footer").animate({"right":"0"},200);
			$(".shade").hide();
		}
	});
	
	$(".shade").click(function(){
		$(this).hide();
		$(".js-mb-nav").removeClass("active");
		$(".js-mb-menu").animate({"left":"100%"},200);
		$(".page-wrap").animate({"right":"0"},200);
		$(".mb-header").animate({"right":"0"},200);
		$(".mb-footer").animate({"right":"0"},200);
	});
	
	$(".js-mb-menu li").each(function(){
		var menuSlide = $(this).children(".menu-slide");
		
		if(menuSlide.length){
			menuSlide.prev().addClass("js-slide-bar haschild default");
		};
	});
	
	$(".js-slide-bar").click(function(){
		if ($(this).next(".menu-slide").css("display") == "none") {
			$(this).next(".menu-slide").slideDown(200).parent().siblings().find(".menu-slide").slideUp(200);;
			$(this).removeClass("default").addClass("active").parent().siblings().children(".haschild").removeClass("active").addClass("default");
		}else{
			$(this).next(".menu-slide").slideUp(200);
			$(this).removeClass("active").addClass("default");
		}
	});
	
	
	
	//  ========== 
	//  = pop = 
	//  ========== 
	$('.fixed-pop .close').click(function(){
		$('.fixed-pop').hide();
	})

    $(".fixed-pop").click(function(event){	
		$('.fixed-pop').hide();
	});
	
	$(".fixed-pop .content").click(function(event){	
		event.stopPropagation();	
	});
	
	$('.apply-button').click(function(){
		$('.apply-pop').fadeIn("fast");
	})
	
	$('.offer-button').click(function(){
		$('.offer-pop').fadeIn("fast");
	})
	
	$('.design-button').click(function(){
		$('.design-pop').fadeIn("fast");
	})
	
	$('.video-pop-button').click(function(){
		$('.video-pop').fadeIn("fast");
	})
	
	$('.appoint-site-button').click(function(){
		$('.appoint-site-pop').fadeIn("fast");
	})
	
	
	//  ========== 
	//  = FILTER-MOBILE = 
	//  ========== 
	$(".filter-mobile .tab .item").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index(); 	
		$(".filter-mobile .tabcon .con").eq(index).slideToggle().siblings().hide();
	})
	
	$(".filter-con .item .down-div em").click(function(){
		$(this).parent(".down-div").addClass("active");
	})
	

	$(".home-softfitted .slick").slick({
		autoplay:false,
	    slidesToShow: 1,
	    slidesToScroll:1,
	    dots:true,
	    arrows:true
	});
	
	
	
	
	//INDEX.HTML

	var mySwiper = new Swiper('.banner .swiper-container',{
		prevButton:'.banner .swiper-button-prev',
		nextButton:'.banner .swiper-button-next',
		pagination : '.banner .swiper-pagination',
		paginationClickable :true,
		autoplay : 5000,
		loop:true
	})
    	

    $(".banner .slick").slick({
		autoplay:true,
		autoplaySpeed:4000,
	    slidesToShow: 1,
	    slidesToScroll:1,
	    dots:true,
	    arrows:true
	});
    

	$(".mb-hotcase .slick").slick({
		autoplay:true,
		autoplaySpeed:4000,
	    slidesToShow: 1,
	    slidesToScroll:1,
	    dots:false,
	    arrows:true
	});
    
    
    $(".home-designer .item li").hover(function(){
		$(this).addClass("active").siblings("li").removeClass("active");
		$(this).parent("ul").siblings(".img").find("img").attr("src",$(this).find("img").attr("img-date"));
		$(this).parent("ul").siblings(".img").find(".text").html($(this).find(".des").html());
	});
    
	$(".home-softfitted .slick").slick({
		autoplay:false,
	    slidesToShow: 1,
	    slidesToScroll:1,
	    dots:true,
	    arrows:true
	});
	
	
	
	
	
	//CASE-DATAIL
	$(".case-img-scroll .slick-nav").slick({
		autoplay:false,
	    slidesToShow: 4,
	    slidesToScroll:1,
	    dots:false,
	    arrows:true,
		focusOnSelect: true,
		vertical:true,
		asNavFor: '.case-img-scroll .slick-for',
		infinite:false,
		autoplay:true,
		autoplaySpeed:4000
	});
	
	$(".case-img-scroll .slick-for").slick({
		autoplay:false,
	    slidesToShow: 1,
	    slidesToScroll:1,
	    dots:false,
	    arrows:true,
	    asNavFor: '.case-img-scroll .slick-nav',
	    infinite:false,
		autoplay:true,
		autoplaySpeed:4000,
		
	 	responsive: [
		    {
		      breakpoint: 780,
		      settings: {
		      	autoplay:false,
			    slidesToShow: 1,
			    slidesToScroll:1,
			    dots:false,
			    arrows:true,
			    asNavFor: '.case-img-scroll .slick-nav',
			    infinite:false,
				autoplay:true,
				autoplaySpeed:4000

		      }
		    }
		]
	});
	
	
	
	
	
	//HHOTCASE-CHOOSEPLAN
	var chooseplanSwiper = new Swiper('.hotcase-chooseplan .swiper-container', {
		autoplay: false,
		pagination : '.hotcase-chooseplan .swiper-pagination',
		paginationClickable :true,
	})
	
	$(".hotcase-chooseplan .slick").slick({
		autoplay:false,
	    slidesToShow: 1,
	    slidesToScroll:1,
	    dots:false,
	    arrows:true
	});
	
	
	
	
	//HOTCASE-DISPLAY
	$(".hotcase-display .slick").slick({
		autoplay:false,
	    slidesToShow: 2,
	    slidesToScroll:1,
	    dots:true,
	    arrows:true,
	 	responsive: [
		    {
		      breakpoint: 780,
		      settings: {
		      	autoplay:false,
			    slidesToShow: 2,
			    slidesToScroll:1,
			    dots:true,
			    arrows:false
		      }
		    }
		]
	});
	
	//HOTCASECASE-DATAIL
	$(".signing-case .slick").slick({
		autoplay:false,
	    slidesToShow: 3,
	    slidesToScroll:3,
	    dots:true,
	    arrows:true,	
	    infinite:false,	    
		
	 	responsive: [
		    {
		      breakpoint: 780,
		      settings: {
		      	autoplay:false,
			    slidesToShow: 1,
			    slidesToScroll:1,
			    dots:true,
			    infinite:false,	
			    arrows:false
		      }
		    }
		]
	});
	
	
	
	
	//SEIKO
	
	$(".seiko-technology .slick").slick({
		autoplay:false,
	    slidesToShow: 3,
	    slidesToScroll:1,
	    dots:false,
	    arrows:true,
	    infinite:false,
	 	responsive: [
		    {
		      breakpoint: 780,
		      settings: {
		      	autoplay:false,
			    slidesToShow: 1,
			    slidesToScroll:1,
			    dots:true,
			    arrows:false,
			    infinite:false
		      }
		    }
		]
	});
	
	
	//supplychain-brand
	$(".supplychain-brand .slick").slick({
		autoplay:false,
	    slidesToShow:7,
	    slidesToScroll:7,
	    dots:true,
	    arrows:true,
	 	responsive: [
		    {
		      breakpoint: 780,
		      settings: {
		      	autoplay:false,
			    slidesToShow:3,
			    slidesToScroll:3,
			    dots:true,
			    arrows:false
		      }
		    }
		]
	});
	
	

	//history-box
	$(".history-box .slick-nav").slick({
		autoplay:false,
	    slidesToShow: 11,
	    slidesToScroll:1,
	    dots:false,
	    arrows:true,
		focusOnSelect: true,
		asNavFor: '.history-box .slick-for',
		infinite:false,
	 	responsive: [
		    {
		      breakpoint: 780,
		      settings: {
		      	autoplay:false,
			    slidesToShow: 5,
			    slidesToScroll:1,
			    dots:false,
			    arrows:true,
				focusOnSelect: true,
				infinite:false,
				asNavFor: '.history-box .slick-for'
		      }
		    }
		]
	});

	
	
	$(".history-box .slick-for").slick({
		autoplay:false,
	    slidesToShow: 1,
	    slidesToScroll:1,
	    dots:false,
	    arrows:false,
	    infinite:false,
	    asNavFor: '.history-box .slick-nav'
	});
	
		
	snum=$(".history-box .slick-for .slick-slide").length;
	$(".history-box .slick-for").slick('slickGoTo', snum); 
	$(".history-box .slick-nav").slick('slickGoTo', snum); 



	
	//honor
	$(".honor-box .slick").slick({
		autoplay:false,
	    slidesToShow:4,
	    slidesToScroll:1,
	    dots:false,
	    arrows:true,
	    responsive: [
		    {
		      breakpoint: 780,
		      settings: {
		      	autoplay:false,
			    slidesToShow:1,
			    slidesToScroll:1,
			    dots:false,
			    arrows:true
		      }
		    }
		]
	});
	
	 
	//culture
	$(".social-welfare .slick").slick({
		autoplay:false,
	    slidesToShow: 3,
	    slidesToScroll:1,
	    dots:false,
	    arrows:true,
	 	responsive: [
		    {
		      breakpoint: 999,
		      settings: {
		      	autoplay:false,
			    slidesToShow: 1,
			    slidesToScroll:1,
			    dots:false,
			    arrows:true
		      }
		    }
		]
	});
	
	
	//video
	$(".video-list li .item").click(function(){
		url=$(this).attr("data-video");
		$('.video-pop video').attr("src",url);
		$('.video-pop video source').attr("src",url);
		$('.video-pop').fadeIn("fast");
	})
	
	
	
	//wholehouse
	$(".wholehouse-design .slick").slick({
		autoplay:false,
	    slidesToShow: 1,
	    slidesToScroll:1,
	    dots:true,
	    arrows:true
	});
	
	
	//softlife-enjoy
	$(".softlife-enjoy-slick").slick({
		autoplay:false,
	    slidesToShow: 5,
	    slidesToScroll:1,
	    dots:true,
	    arrows:true
	});
	
	$(".wholehouse-material .slick").slick({
		autoplay:false,
	    slidesToShow:7,
	    slidesToScroll:7,
	    dots:true,
	    arrows:false
	});
	
	
	
	
	
	//mb
	$(".mb-wholehouse-design .slick").slick({
		autoplay:false,
	    slidesToShow: 1,
	    slidesToScroll:1,
	    dots:false,
	    arrows:true
	});
	
	
	
	$(".mb-enjoy .slick").slick({
		autoplay:false,
	    slidesToShow: 2,
	    slidesToScroll:1,
	    dots:false,
	    arrows:true
	});
	
	
	$(".mb-softlife-style .slick").slick({
		autoplay:false,
	    slidesToShow: 1,
	    slidesToScroll:1,
	    dots:false,
	    arrows:true
	});
	
	$(".related-case .slick").slick({
		autoplay:false,
	    slidesToShow: 1,
	    slidesToScroll:1,
	    dots:true,
	    arrows:true,
	 	responsive: [
		    {
		      breakpoint: 999,
		      settings: {
		      	autoplay:false,
			    slidesToShow: 1,
			    slidesToScroll:1,
			    dots:true,
			    arrows:false
		      }
		    }
		]
	    
	});
	
	
})
