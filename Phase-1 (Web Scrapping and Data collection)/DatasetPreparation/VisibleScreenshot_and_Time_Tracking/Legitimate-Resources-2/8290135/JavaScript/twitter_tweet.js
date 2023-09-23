var liveUpdateStart = null;
var liveUpdateHBMS = 60000;
var hiddenCheckMS = 2000;
var tweetMS = null;
var lastData = [-1,-1,-1,-99999,-99999];
var maxLiveUpdateMinutes = 24*60; // Maximum time a single page can have live updates
var minTimeoutMS = 2000;
var maxTimeoutMS = 10000;
var timeoutMS = minTimeoutMS;
var firstLoad = true;

$(document).ready(function () {
//    Sentry.init({
//	dsn: 'https://1481b3e5233146ec8048c472f155d445@sentry.int.trendsmap.com/1',
//	whitelistUrls: [/trendsmap\.com/,/pinpayments\.com/],
//	ignoreErrors: [
//	    "NotAllowedError: The request is not allowed", // NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.
//	    "SecurityError: The operation is insecure.",
//	    "AbortError: The operation was aborted.",
//	    "NotAllowedError: The play method is not allowed", // NotAllowedError: The play method is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.
//	    "ResizeObserver loop limit exceeded",
//	    "SecurityError: Blocked a restricted frame with origin",
//	    "InvalidStateError: The object is in an invalid state.",
//	    "isTrusted", // {"isTrusted":false}
//	    "evaluating 'document.getElementsByClassName('qb-b')[0].innerHTML'", // undefined is not an object (evaluating 'document.getElementsByClassName('qb-b')[0].innerHTML')
//	    "https://goo.gl/LdLk22" // AbortError: The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22
//	],
//	beforeSend: function (event) {
//	    if (location.search.indexOf('fbclid') !== -1) return null; // Drop all events if query string includes `fbclid` string, as these cause all sorts of random errors from FB's broken psuedo browser
//	    return event; // Otherwise just let it though
//	}
//    });
    if (typeof asetup !=  "undefined") asetup();
    $(".tm-tweet-link-btn").click(showSubmitModal);
    $(".tweet-type-filter-link").click(function(e) {
	var tweetType = $(this).attr("data-type");
        var filterDisplaySpeed = 500;
	$(".inline-tweet-wrap").each(function(){
	    var This = $(this);
	    if (This.hasClass("sub-tweet") || This.hasClass("primary-tweet")) return;
	    var elementTweetType = This.attr("data-type");
	    var shouldShow = tweetType == "" || elementTweetType == tweetType;
	    var isShown = This.css("display") != "none"
	    if (shouldShow != isShown) shouldShow ? This.show(filterDisplaySpeed) : This.hide(filterDisplaySpeed);
	});
        setTimeout(setupLazyLoad, filterDisplaySpeed*2); // Needs poking as there is no scroll event. hack, should be based upon actual completion
	return false;
    });
    
    if (!(document.referrer == "" || !document.baseURI || document.baseURI.split("/")[2] != (document.referrer && document.referrer.split("/")[2]))) {
        $(".twitter-tweet-back-link").html('<i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Back');
    }
    $(".twitter-tweet-back-link").click(function () {
        if (!(document.referrer == "" || !document.baseURI || document.baseURI.split("/")[2] != document.referrer.split("/")[2])) {
            history.go(-1);
            return false;
        }
    })

    liveUpdateStart = new Date().getTime();
    liveUpdateHB();
    liveUpdate(); 
    setupMoreData();
    setupMapAccess();
});

function setupMoreData() {
    $(".show-more-data").on("click",function() {
	var id = $(this).attr("data-element");
	var e = $("#"+id).find(".tweet-stats-extra-row").show(500);
	$(this).hide(500);
	$("a.show-less-data[data-element="+id+"]").show(500);
	return false;
    });
    $(".show-less-data").on("click",function() {
	var id = $(this).attr("data-element");
	var e = $("#"+id).find(".tweet-stats-extra-row").hide(500);
	$(this).hide(500);
	$("a.show-more-data[data-element="+id+"]").show(500);
	return false;
    });
}

function doLiveUpdate() {
    var now = new Date().getTime();
    if (now-liveUpdateStart > maxLiveUpdateMinutes*60*1000) {
	return false;
    }

    if (tweetMS) {
	var minTS = (new Date().getTime())-168*3600*1000;
	if (tweetMS > minTS) {
	    //console.log("new", tweetMS-minTS);
	    return true;
	}
    }
    return false;    
}

function liveUpdateHB() {
    if (!doLiveUpdate()) return;

    if (!firstLoad && pageHidden()) { // Do next time, but check again sooner
	setTimeout(liveUpdateHB, hiddenCheckMS);
	return;
    }
    firstLoad = false;

    var url ="/twitter/tweet_hb/"+tweetID;
    var xhr = $.ajax({
	url: url,
	type: 'POST',
	dataType: "text",
	timeout: 180000,
	cache: false,
	error: function(request, status, details) {console.log(new Date(),"Error loading " + url + ":" + status + ", " + details)},
	success: function(data){
	    //console.log("liveUpdateHB", data)
	    setTimeout(liveUpdateHB, liveUpdateHBMS);
	}
    });
}

function liveUpdate() {
    if (!doLiveUpdate()) return;
    var url = "/twitter/tweet_live/"+tweetID;
    if (pageHidden()) {
	//console.log("Update Hidden");
	setTimeout(liveUpdate, hiddenCheckMS); // Just try again next time;
	return;
    }
    var xhr = $.ajax({
	url: url,
	type: 'GET',
	dataType: "json",
	timeout: 180000,
	cache: false,
	error: function(request, status, details) {
	    if (request.status == 404) {
		//console.log("Waiting for data for", url)
		setTimeout(liveUpdate, timeoutMS); // Try again
	    } else {
		console.log("Error for " + url + ": " + status + ", " + details)
	    }
	},
	success: function(data){liveUpdateData(data)}
    });
}

function animatedTextReplace(div, text) {
    if (!div) return;
    div.animate({opacity:'0'}, 200);
    div.queue(function() {
	div.html(text);
        div.dequeue(); // This is necessary to continue the animation
    });
    div.animate({opacity:'1'}, 400);
}

function liveUpdateData(data) {
    if (!data.ts) return; // No actual data
    //console.log("new data");
    var favourites = data.favorite_count;
    var retweets = data.retweet_count;
    var followers = data.user && data.user.followers_count
    if ((data.retweet_rate && data.retweet_rate > 0) || (data.favorite_rate && data.favorite_rate > 0)) {
	var rr = $("#tweet_stats_"+tweetID+" .inline-tweet-stat-retweets-per-minute");
	var fr = $("#tweet_stats_"+tweetID+" .inline-tweet-stat-favorites-per-minute");
	var rrt = " +" + numberWithCommas(data.retweet_rate) + "/m";
	var frt = " +" + numberWithCommas(data.favorite_rate) + "/m";
	if (rrt != rr.html()) animatedTextReplace(rr, rrt);
	if (frt != fr.html()) animatedTextReplace(fr, frt);
	$(".inline-tweet-stat-rate").show();
    } else {
	animatedTextReplace(rr, "");
	animatedTextReplace(fr, "");
	$(".inline-tweet-stat-rate").hide();
    }
    var r = $("#tweet_stats_"+tweetID+" .inline-tweet-stat-retweet-count");
    var f = $("#tweet_stats_"+tweetID+" .inline-tweet-stat-favorite-count");
    var u = $("#tweet_user_follower_stats_"+tweetID);
    var rt = numberWithCommas(retweets);
    var ft = numberWithCommas(favourites);
    var ut = numberWithCommas(followers);
    if (rt != r.html()) animatedTextReplace(r, rt);
    if (ft != f.html()) animatedTextReplace(f, ft);
    if (ut != u.html()) animatedTextReplace(u, ut);
    if (lastData[0] == favourites && lastData[1] == retweets && lastData[2] == followers && lastData[3] == data.favorite_rate && lastData[4] == data.favorite_rate) {
	timeoutMS += 2000;
    }  else {
	timeoutMS -= 2000;
    }
    if (timeoutMS < minTimeoutMS) timeoutMS = minTimeoutMS;
    if (timeoutMS > maxTimeoutMS) timeoutMS = maxTimeoutMS;
    lastData = [favourites, retweets, followers, data.retweet_rate, data.favorite_rate];
    setTimeout(liveUpdate, timeoutMS); // Update again
}
