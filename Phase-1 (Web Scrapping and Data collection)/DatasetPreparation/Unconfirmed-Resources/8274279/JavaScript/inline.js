
(function() {
var _tsid = "X91FC4B279193D0CDD0BCC3E596F879C1";
_tsConfig = {
yOffset: "0 " /* offset from page bottom */ ,
variant: "custom_reviews" /* text, default, small, reviews, custom, custom_reviews */ ,
customElementId: "MyCustomTrustbadge" /* required for variants custom and custom_reviews */ ,
customCheckoutElementId: "ConfirmationTrustedShopsBadge",
trustcardDirection: "topRight" /* for custom variants: topRight, topLeft, bottomRight, bottomLeft */ ,
customBadgeWidth: "50" /* for custom variants: 40 - 90 (in pixels) */ ,
customBadgeHeight: "50" /* for custom variants: 40 - 90 (in pixels) */ ,
disableResponsive: "true" /* deactivate responsive behaviour */ ,
disableTrustbadge: "false" /* deactivate trustbadge */ ,
trustCardTrigger: "mouseenter" /* set to 'click' if you want the trustcard to be opened on click instead */ ,
};
var _ts = document.createElement("script");
_ts.type = "text/javascript";
_ts.charset = "utf-8";
_ts.async = true;
_ts.src = "//widgets.trustedshops.com/js/" + _tsid + ".js";
var __ts = document.getElementsByTagName("script")[0];
__ts.parentNode.insertBefore(_ts, __ts);
})();
