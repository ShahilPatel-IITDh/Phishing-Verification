function getScript(url, onload) {
    var first = document.getElementsByTagName('script')[0];
    var s = document.createElement('script');
    s.src = url;
    s.onload = onload;
    first.parentNode.insertBefore(s, first);
}

function getScriptAppendChild(url, parentNode, onload) {
    var first = document.getElementsByTagName('script')[0];
    var s = document.createElement('script');
    s.src = url;
    s.onload = onload;
    parentNode.appendChild(s);
}

function asetup() {
    var jsURL = "https://cdn.fuseplatform.net/publift/tags/2/1080/fuse.js"
    if (accessConfig && !accessConfig.li) { // Properly loaded, not logged in
	$(".anon-content").show();
	var e1 = $(".anon-content-rhs")
	if (e1) {
	    e1.css("position", "fixed");
	    e1.css("top", "120px");
	}
	var e2 = $(".anon-content-rhs-2")
	if (e2) {
	    e2.css("position", "fixed");
	    e2.css("top", "720px");
	    e2.css("left", "0px");
	}	
	getScript(jsURL, function(){
	    aScrollUpdate();
	    $(document).scroll(aScrollUpdate);
	    setInterval(aScrollUpdate, 200); // Allow for ad reload
	    return false;	
	});

	if (typeof tweetID != 'undefined') setupReportLinks(); // Ad pages only, and tweet only
    } else {
	$(".anon-content").hide();
	if (typeof tweetID != 'undefined' && accessConfig && accessConfig.a_prem) setupReportLinks();
    }
    $(".anon-content-custom-ad").each(function() {
	updateCustom(this);
    });
}

function setupReportLinks() {
    var flagIcon = '<span style="display:inline-block;margin-bottom: -2px"><svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>.fa-secondary{opacity:.4}</style></defs><path fill="currentColor" d="M512 91.33v277c0 11.31-7.1 21.88-18.5 26.47C317.7 465 281.7 331.25 96 416V102a56.57 56.57 0 0 0 14.64-15c194.19-74.48 184.75 58.25 352-20.08C485.2 56.31 512 68.26 512 91.33z" class="fa-secondary"></path><path fill="currentColor" d="M120 56a55.93 55.93 0 0 1-24 46v388a22 22 0 0 1-22 22H54a22 22 0 0 1-22-22V102a56 56 0 1 1 88-46z" class="fa-primary"></path></svg></span>';
    var html = "<a href='/twitter/tweet/report'>Report " + flagIcon + "</a> · "
    var e = document.getElementsByClassName("inline-tweet-links")[0];
    if (e) e.innerHTML = html + e.innerHTML;
}

function updateCustom(e) {
    var ee = $(e);
    var id = parseInt(ee.attr("id").split("_")[2]);
    var requestData = {id: id};
    $.ajax({
	type:     "GET",
	url:      "/iad",
	dataType: "html",
	data:     requestData,
	success:  function(d) {
	    //console.log("[asc] Filling ", id , " with ", d.length, " bytes");
	    ee.html(d);
	},
	error:    function(e) {
	    console.log("ERROR : Unable to get remote data for ", id, e)
	}
    });
}

function aScrollUpdate() {
    $(".anon-content-inline").each(function() {
	var t = $(this);
	if (t.height() <= 1 && t.css("border-width") != "0px") {
	    t.css("border-width","0px");
	    if ($(t.children()[0]).attr("data-fuse-slot")) processUnfilled(t); // Has been attempted to be filled
	} else if (t.height() > 1 && t.css("border-width") == "0px") {
	    cancelUnfilled(t);
	    t.css("border-width","1px");
	    if ($(t.children()[0]).attr("data-fuse-slot")) t.css("padding","10px");
	    t.show();
	}
    });
    var fixed_header_height = 0;
    var header_height=110;
    var padding_height = 10;
    var e_side_v = $(".anon-content-rhs");
    var e_side_v2 = $(".anon-content-rhs-2");
    var e_bottom_h = $(".anon-content-footer");
    var e_content = $(".tweet-column-wrap");
    var y = e_content.offset().top-padding_height;
    var yb = e_bottom_h && e_bottom_h.position() && e_bottom_h.position().top || 99999;
    var left = e_content.offset().left + e_content.width() + padding_height;
    var left_left = e_content.offset().left - 300 - padding_height;
    e_side_v  && e_side_v.css( "left", left + "px");
    e_side_v2 && e_side_v2.css("left", left + "px");

    if (e_side_v && e_side_v2) {
	var ad_heights = e_side_v.height() + e_side_v2.height();
	var content_height = e_content.height();
	if (ad_heights > content_height) {
	    e_side_v2.hide();
	    e_side_v.css("top", y + "px");
	} else {
	    e_side_v2.show();
	    var h = window.scrollY;
	    var h1_min = 0;
	    var h1_max = $(document).height()/2-e_side_v.height()+fixed_header_height+padding_height;
	    var h2_min = $(document).height()/2 + fixed_header_height + 2*padding_height;
	    var h2_max = yb-e_side_v2.height()-padding_height;
	    var h1x = e_content.offset().top-padding_height-h;
	    var h2x = e_content.offset().top-padding_height-h;
	    if (h1x < fixed_header_height) h1x = fixed_header_height;
	    if (h2x < fixed_header_height) h2x = fixed_header_height;
	    var h1l = h1x;
	    if (h <= h1_max) {
		h2x = $(document).height(); // h1 as is, h2 off screen
	    } else if (h > h1_max && h < (h1_max + e_side_v.height()+padding_height)) {
		h1x = h1x - (h-h1_max); // Start to move first one off
		h2x = h1x + $(".anon-content-rhs").height() + padding_height
	    } else if (h >= (h1_max + e_side_v.height()+padding_height) && h < h2_max) {
		h1x = -$(document).height(); // h1 offscreen, h2 as is
	    } else if (h >= h2_max) {
		h1x = -$(document).height(); // h1 offscreen, h2 adjust
		h2x = h2x - (h-h2_max);
	    }
	    e_side_v.css( "top", h1x+"px");
	    e_side_v2.css("top", h2x+"px");
	}
    } else if (e_side_v) {
	e_side_v.css("top",  y+"px");
    }
}

var fillTimeout = 3000;
var fillTimers = {}
function processUnfilled(t) {
    var id = t.prop("id");
    var timer = fillTimers[id];
    if (!timer) {
	fillTimers[id] = timer = setTimeout(function() {
	    var requestData = {id: id}; //v: 1, message: message, block: block};
	    $.ajax({
		type:     "GET",
		url:      "/iad",
		dataType: "html",
		data:     requestData,
		success:  function(d) {
		    //console.log("[as] Filling ", id);
		    if (d && d.length > 10) fillSlot(t, d);
		},
		error:    function() {}
	    });
	}, fillTimeout);
    }
}

function cancelUnfilled(t) {
    var id = t.prop("id");
    timer = fillTimers[id];
    if (timer) {
	//console.log("Cancelled unfill for ", id);
	clearTimeout(timer);
	fillTimers[id] = null;
    }
}

function fillSlot(t, d) {
    t.html(d);
}

if (typeof(nsfw) == "undefined") nsfw = true; // Must be explicitly set, assume the worst if it hasn't been.
// Set profanity filter if nsfw set or it is a flagged page :

const fusetag = window.fusetag || (window.fusetag = { que: [] });
fusetag.que.push(function() {
    var v = 1;
    if (nsfw) { // possibly an issue, set the flag.
	//console.log(v,"fp=true");
	fusetag.setTargeting("fuse_profanity", ["true"]);
    } else {
	//console.log(v,"fp=false");
    }
});
