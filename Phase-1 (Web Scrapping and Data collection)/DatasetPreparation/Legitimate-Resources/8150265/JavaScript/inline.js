(function (d) {
if (!d.visibilityState) {
var s = d.createElement('script');
s.src = 'https://static.tildacdn.com/js/tilda-polyfill-1.0.min.js';
d.getElementsByTagName('head')[0].appendChild(s);
}
})(document);
function t_onReady(func) {
if (document.readyState != 'loading') {
func();
} else {
document.addEventListener('DOMContentLoaded', func);
}
}
function t_onFuncLoad(funcName, okFunc, time) {
if (typeof window[funcName] === 'function') {
okFunc();
} else {
setTimeout(function() {
t_onFuncLoad(funcName, okFunc, time);
},(time || 100));
}
}function t_throttle(fn, threshhold, scope) {return function () {fn.apply(scope || this, arguments);};}function t396_initialScale(t){var e=document.getElementById("rec"+t);if(e){var r=e.querySelector(".t396__artboard");if(r){var a,i=document.documentElement.clientWidth,l=[],d=r.getAttribute("data-artboard-screens");if(d){d=d.split(",");for(var o=0;o<d.length;o++)l[o]=parseInt(d[o],10)}else l=[320,480,640,960,1200];for(o=0;o<l.length;o++){var n=l[o];n<=i&&(a=n)}var g="edit"===window.allrecords.getAttribute("data-tilda-mode"),u="center"===t396_getFieldValue(r,"valign",a,l),c="grid"===t396_getFieldValue(r,"upscale",a,l),t=t396_getFieldValue(r,"height_vh",a,l),f=t396_getFieldValue(r,"height",a,l),e=!!window.opr&&!!window.opr.addons||!!window.opera||-1!==navigator.userAgent.indexOf(" OPR/");if(!g&&u&&!c&&!t&&f&&!e){for(var s=parseFloat((i/a).toFixed(3)),_=[r,r.querySelector(".t396__carrier"),r.querySelector(".t396__filter")],o=0;o<_.length;o++)_[o].style.height=parseInt(f,10)*s+"px";for(var h=r.querySelectorAll(".t396__elem"),o=0;o<h.length;o++)h[o].style.zoom=s}}}}function t396_getFieldValue(t,e,r,a){var i=a[a.length-1],l=r===i?t.getAttribute("data-artboard-"+e):t.getAttribute("data-artboard-"+e+"-res-"+r);if(!l)for(var d=0;d<a.length;d++){var o=a[d];if(!(o<=r)&&(l=o===i?t.getAttribute("data-artboard-"+e):t.getAttribute("data-artboard-"+e+"-res-"+o)))break}return l}