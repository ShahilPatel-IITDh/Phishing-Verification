const apiUrl={getUserInfo:'https://accounts.updf.com/v1/user/getUserInfo',getCode:'https://api.updf.com/v1/user/getAuthCode'}
const apiHeader={'x-token':localStorage.getItem('token'),'Accept-Language':'en-US','Content-Type':'application/json'}
function getQuery(name){try{const reg=new RegExp(`[&|?]${name}=(.*?)&`,'g')
const queryMatchs=[...reg.exec(location.search+'&')]
if(queryMatchs.length>0){return queryMatchs[1]}
return ''}catch(e){return ''}}
function randomRange(min,max){return Math.floor(Math.random()*(max-min))+min;}
function getOSName(){const userAgent=navigator.userAgent
if(/^Win/.test(navigator.platform)){return 'WIN'}else if(/^Mac/.test(navigator.platform)){return 'MAC'}else if(userAgent.indexOf('Android')>-1||userAgent.indexOf('Adr')>-1){return 'ANDROID'}else if(!!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){return 'IOS'}return 'OTHER'}
function getCountry(){return new Promise((resolve,reject)=>{const country=localStorage.getItem('ipCountry')
if(country&&country!==''&&country.toLocaleLowerCase()!=='Unknow'){resolve(country)}else{const tokenArr=['aefe2ee0cb7892','24fe90dadbd1a1']
const randIndex=Math.random()>0.5?0:1
$.ajax({type:'get',url:`https://ipinfo.io/country?token=${tokenArr[randIndex]}`,success:(res)=>{localStorage.setItem('ipCountry',res)
resolve(res)},fail:(res)=>{reject(res)}})}})}
var youtubeVideoList=[]
function initYoutubeVideo(iframeId,dialogClass,showDialogBtnClass){const videoPlayer=new YT.Player(iframeId)
$(function(){$(`.${dialogClass} .dialog-screen, .${dialogClass} .close`).click(function(){videoPlayer.pauseVideo()})
$(`.${showDialogBtnClass}`).click(function(){videoPlayer.playVideo()})})}
function onYouTubePlayerAPIReady(){for(let videoData of youtubeVideoList){initYoutubeVideo(...videoData)}}
let alertMessageHideTimeOut=null
function alertMessage(msg,type,duration){if(alertMessageHideTimeOut!=null)clearTimeout(alertMessageHideTimeOut)
$('.message-box').removeClass('info success warning error').addClass(`${type} show`).find('p').html(msg)
duration=duration==null?3000:duration
alertMessageHideTimeOut=setTimeout(()=>{alertMessageHideTimeOut=null
$('.message-box').removeClass('show')},duration)}
var scrollTop,scrollLeft,windowW,windowH
function checkElementIsInCurrentWindow(el){const offsetTop=el.offset().top
const outerHeight=el.outerHeight()
return offsetTop+outerHeight-scrollTop>0&&offsetTop+outerHeight-scrollTop-windowH<0}
function downloadFile(url,fileName=''){if(!fileName){const urlObj=new url("./url")
const pathArr=urlObj.pathname.split('/')
fileName=pathArr[pathArr.length-1]}
var xhr=new XMLHttpRequest()
xhr.open('get',url,true)
xhr.responseType='blob'
xhr.onload=function(){if(this.status===200){var blob=this.response
var href=window.URL.createObjecturl("./blob")
if(window.navigator.msSaveBlob){try{window.navigator.msSaveBlob(blob,fileName)}catch(e){console.log(e)}}else{var a=document.createElement('a')
a.href=href
a.target='_blank'
a.download=fileName
document.body.appendChild(a)
a.click()
document.body.removeChild(a)
window.URL.revokeObjecturl("./href")}}}
xhr.send()}
$(function(){scrollTop=$(window).scrollTop()
scrollLeft=$(window).scrollLeft()
windowW=$(window).width()
windowH=$(window).height()
document.addEventListener('scroll',function(){scrollTop=$(this).scrollTop()
scrollLeft=$(window).scrollLeft()},{passive:true})
window.addEventListener('resize',function(){windowW=$(window).width()
windowH=$(window).height()},{passive:true})
const gTagEventEls=$('.el-gtag-event')
if(gTagEventEls.length){gTagEventEls.each(function(){const eventName=$(this).data('event')
const params=$(this).data('params')||'{}'
gtagEvent(eventName,JSON.parse(params))})}
const pageConverterUrl=getOSName()==='MAC'?pageUrl.page_converter_mac:pageUrl.page_converter_win
$(`a[href="${pageUrl.page_converter_win}"]`).attr('href',pageConverterUrl)
$('button').addClass('has-text-color has-background')
$('.btn .icon').parent().addClass('has-icon')
$('.marketing-email, .support-email, .ir-email').each(function(){let email=''
if($(this).hasClass('marketing-email')){email=emails.marketing.replace('[at]','@')}else if($(this).hasClass('support-email')){email=emails.support.replace('[at]','@')}else if($(this).hasClass('ir-email')){email=emails.ir.replace('[at]','@')}
if(email){const html=$(this).data('btn-text')||email
if($(this)[0].nodeName==='A'){if(!$(this).hasClass('no-email-show')){$(this).html(html)}
$(this).attr('href',`mailto:${email}`)}else{$(this).html(html)}}})
const $scrollFixed=$('.scroll-fixed')
const $footer=$('footer')
if($scrollFixed.length){const scrollFixedOffsetTop=$scrollFixed.offset().top
document.addEventListener('scroll',function(){const scrollFixedHeight=$scrollFixed.height()
const footerOffsetTop=$footer.offset().top
const scrollTop=$(window).scrollTop()
if(scrollTop+scrollFixedHeight>=footerOffsetTop){$scrollFixed.css({position:'fixed',top:(footerOffsetTop-scrollTop-scrollFixedHeight-50)+'px'})}else if(scrollFixedOffsetTop-scrollTop<0&&scrollTop+scrollFixedHeight<footerOffsetTop){$scrollFixed.css({position:'fixed',top:'80px'})}else{$scrollFixed.css({position:'relative',top:'0'})}},{passive:true})}
if(isWoocommercePage){$('#sidebar, .product_meta').remove()
$('.order-again .button').click(function(){location.href=productsBuyUrl.updf_converter_for_win
return false})}
let isSelectedLanguage=localStorage.getItem('isSelectedLanguage')
let selectLanguageDisabled=isSingle||isCategory||/download|privacy-policy|license-agreement|software-subscription-agreement|cookies|refund-policy|refer-a-friend|updf-special-offer|discount-video/.test(location.href)
if(!isSelectedLanguage&&!selectLanguageDisabled){try{let localeLang=navigator.language.split('-')[0]
const diffLangs={ja:'jp',pt:'br'}
if(diffLangs[localeLang]!=null)localeLang=diffLangs[localeLang]
if(localeLang&&languagesData[localeLang]!=null&&currentLanguage!==localeLang){const $changeLanguageModal=$('.change-language-modal')
let localeLangHomeUrl=localeLangUrl=languagesData[localeLang]?.url
localeLangHomeUrl+=location.search
const currentHrefArr=location.href.split(`${location.host}/${currentLanguage}/`)
if(currentHrefArr.length>1){localeLangUrl+=currentHrefArr[1]}
const currentLangs=languagesData[currentLanguage]?.langs
let currentLangDesc=currentLangs.change_lang_desc
if(currentLanguage==='zh'){currentLangDesc=currentLangs.change_lang_desc_confirm
localeLangUrl='https://updf.com'+localeLangUrl}
$changeLanguageModal.find('.desc.current-lang').html(currentLangDesc)
$changeLanguageModal.find('a.keep-current-lang').html(currentLangs.continue_to_site)
const localeLangs=languagesData[localeLang]?.langs
let localeLangDesc=localeLangs.change_lang_desc
if(localeLang==='zh'){localeLangDesc=localeLangDesc.replace('{currentLang}',currentLangs.chinese_name)}
$changeLanguageModal.find('.desc.locale-lang').html(localeLangDesc)
$changeLanguageModal.find('a.goto-locale-lang').html(localeLangs.continue_to_site).attr('href',localeLangUrl)
$.ajax({type:'get',url:localeLangUrl,error:function(){$changeLanguageModal.find('a.goto-locale-lang').attr('href',localeLangHomeUrl)}})
$changeLanguageModal.fadeIn()}}catch(e){console.log(e)}}
$('.change-language-modal .screen, .change-language-modal .close, .change-language-modal a').click(function(){const $changeLanguageModal=$('.change-language-modal')
localStorage.setItem('isSelectedLanguage',true)
$changeLanguageModal.fadeOut()
if($(this).hasClass('goto-locale-lang')){const href=$(this).attr('href')
location.href=href}
return false})
$('.btn-modal').click(function(){const modalClass=$(this).data('modal')
if(modalClass){$(`${modalClass}`).fadeIn()
return false}})
$('.modal .close, .modal .screen').click(function(){const $modal=$(this).parents('.modal')
if(!$modal.hasClass('close-disable')){$(this).parents('.modal').fadeOut()}})
$('.show-dialog').click(function(){const dialogClassName=$(this).data('dialog')
if(dialogClassName){$('.'+dialogClassName).fadeIn()}})
$('.dialog .close, .dialog .dialog-screen').click(function(){$(this).parents('.dialog').fadeOut()})})