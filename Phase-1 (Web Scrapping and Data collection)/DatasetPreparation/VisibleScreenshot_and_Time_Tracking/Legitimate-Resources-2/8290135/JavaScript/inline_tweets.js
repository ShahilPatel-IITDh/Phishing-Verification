var galleryModal;

$(document).ready(function () {
    updateLocalTime();
    setupLazyLoad();
    setupSpinnerLinks();
    galleryModal = ModalWindow({modalID: "gallery_modal"}); // Default modal globally available.
    $(document).scroll(pauseVideos);

    setupInlineTweetData();
    $("#gallery_modal_overlay").click(function() {
	galleryModal.close();
    });

    $(".XXXinline-tweet-media-img-multiple").click(function() {
        $(".inline-tweet-media-img-thumb").removeClass("selected");
        var tweetID = $(this).attr("data-tweet_id");
        var count = parseInt($(this).attr("data-photo-count"));
        var sequenceID = parseInt($(this).attr("data-sequence_id"))+1;
        if (sequenceID == count) sequenceID = 0;
	var thumb = $(".inline-tweet-media-img-thumb[data-tweet_id='"+tweetID+"'][data-sequence_id='"+sequenceID+"']")
        var src = thumb.attr("src");
        thumb.addClass("selected");
	
        var img = $("img.inline-tweet-media-img[data-tweet_id='"+tweetID+"']");
        img.fadeOut(150, function() { 
            $(this).load(function() { $(this).fadeIn(150); }); 
            $(this).attr("src", src); 
            $(this).attr("data-sequence_id", sequenceID); 
        }); 
    });
    setupTwitterActions();
    setupRestricted();
    setupTwitterJS();
});

function updateLocalTime() {
    $(".localtime").each(function(){
	var dt = new Date(parseInt($(this).attr('data-ts'))*1000);
	$(this).html(simpleFormatDT(dt));
    });
}
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function simpleFormatDT(dt) {
    return sprintf('%02d', dt.getHours()) + ":" + sprintf("%02d",dt.getMinutes()) + ", " + dt.getDate() + " " + months[dt.getMonth()] + " " + (1900+dt.getYear());    
}

function setupTwitterJS() {
    if (typeof loadTwitterJS != 'undefined' && loadTwitterJS) {
	function twit(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}
	twit(document,"script","twitter-wjs");
    }
}

var touchClick=false;
var videoClick=false;
function setupInlineTweetData() {
    updateLocalTime();
    $(".tm-tweet-link-btn").click(showSubmitModal);

    var v = $(".inline-tweet-media-image-wrap video");
    if (v && v.length > 0) {
	v.on('touchstart', function(e) {
	    videoClick = true;
	    e.stopPropagation();
	});
	v.on('touchmove', function(e) {
	    videoClick = false;
	    e.stopPropagation();
	});
	v.on('touchend', function(e) {
	    e.stopPropagation();
	    if (videoClick) {
		videoClick = false;
		this.paused ? this.play() : this.pause();
	    }
	});
    }
    
    // Link from whitespace to original tweet on touch devices :
    var c = '.inline-tweet-wrap-primary'; //  primary-tweet
    $(c).on('touchstart', function() {
	touchClick = true;
    });
    $(c).on('touchmove', function() {
	touchClick = false;
    });
    $(c).on('touchend', function() {
	if (touchClick) {
	    var tweetID = this.getAttribute("id").split("_")[1]
	    //console.log("Touch load external tweet : ", tweetID);
	    //window.open('https://twitter.com/i/status/' + tweetID, '_blank');
	    touchClick = false;
	}
    });

    
    jQuery("span.timeago").timeago();
  $(".video").click(function(e) {
    this.paused ? this.play() : this.pause();
  });

    $(".inline-tweet-media-img-thumb").click(function(e) {
        $(".inline-tweet-media-img-thumb").removeClass("selected");
        $(this).addClass("selected");
        var tweetID = $(this).attr("data-tweet_id");
        var sequenceID = $(this).attr("data-sequence_id");
        var img = $("img.inline-tweet-media-img[data-tweet_id='"+tweetID+"']");
        var src = $(this).attr("src");
        img.fadeOut(150, function() { 
            $(this).load(function() { $(this).fadeIn(150); }); 
            $(this).attr("src", src); 
            $(this).attr("data-sequence_id", sequenceID); 
        }); 
	
    });
    
    $(".inline-tweet-media-img").click(function() {
        var html='<img class="tweet-modal-image" src="'+$(this).attr("src")+'">';
        galleryModal.open({content:html,clickClose:true});
    });

}

function pauseVideos() {
    $('video').each(function(){
	if (!$(this).is(":in-viewport") && !this.paused) $(this)[0].pause();
    });
}

function setupTwitterActions() {
  $(".inline-tweet-stat-icon").addClass("inline-tweet-icon-disabled");
  $(".inline-tweet-stat-icon").attr("title","");
  $(".inline-tweet-user-icon-follow").hide();
}

function setupRestricted() {
    if (accessConfig && !accessConfig.li) {
	$(".possibly-sensitive-media-placeholder").show();
    } else {
	$(".possibly-sensitive-media").show();
    }
}
