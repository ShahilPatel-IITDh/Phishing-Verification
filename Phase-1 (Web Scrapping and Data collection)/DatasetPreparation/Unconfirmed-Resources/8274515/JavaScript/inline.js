
var match = document.cookie.match(new RegExp('(^| )updatesBannerDisplay=([^;]+)'));
if (! match){
   document.cookie = "updatesBannerDisplay = true";
}else{
    $("#updates-banner").remove();
}
