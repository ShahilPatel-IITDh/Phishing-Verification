var byId = function (id) { return document.getElementById(id); }
var programType = 'affiliate'; // no I18N
var domainUrl = byId('thrive_script').src; // no I18N
var arr = domainUrl.split("/");
var zt_parent_domain = arr[0] + "//" + arr[2] + '/';

// Adding Thrive widget frame in customer's page
document.write('<div id="zoho_thrive_widget"></div>');

document.write('<div id="zoho_thrive_cookie_popup"></div>');

// Create SDK method
if (!byId('thrive_sdk_tag')) {
	var connectionTag = document.createElement('script');
	firstScriptTag = document.getElementsByTagName('script')[0];
	connectionTag.src = zt_parent_domain + 'static/thrive_action_scripts/js/thrivesdk.js';
	connectionTag.id = "thrive_sdk_tag";
	firstScriptTag.parentNode.insertBefore(connectionTag, firstScriptTag);
}

async function ZTCookieBannerPopup (data) {
	if((!checkIfConsentProvided()) && checkIfReferrerExists()){
		var paraWrapper = createEle('div','thrive_popup_div'); // NO I18N
		/*
		paraWrapper.innerHTML = 'Our website uses cookies to provide you best browsing experience and to seamlessly run our customer benefit programs. Kindly accept our cookie policy and provide your consent before you proceed.';// NO I18N
		*/
		paraWrapper.innerHTML = data.consentMessage ? data.consentMessage : 'We use cookies to collect information on site traffic and usage for marketing purpose.'; // NO I18N
		if (data.privacyLink){
			paraWrapper.innerHTML += ' ' + data.privacyHTML;
		}	
		var acceptButton = getConsentButtonObject('accept');// NO I18N
		var rejectButton = getConsentButtonObject('reject')// NO I18N
		var buttonDiv =  createEle('div','thrive_popup_btn'); // NO I18N
		buttonDiv.append(acceptButton);
		buttonDiv.append(rejectButton);
		byId('zoho_thrive_cookie_popup').append(paraWrapper,buttonDiv); // no I18N

		document.getElementById("zoho_thrive_cookie_popup").classList.remove("hide");// NO I18N
		document.getElementById("zoho_thrive_cookie_popup").classList.add("show");// NO I18N
	} else{
		ZTbodyLoad();
	}
}

function getConsentButtonObject(buttonType){
	var consentButton = createEle('button');// NO I18N
	consentButton.id = buttonType + 'ZTCookie';
	consentButton.innerHTML = buttonType === 'accept' ? 'Accept' : 'Reject';// NO I18N
	consentButton.addEventListener('click', addConsentButtonListeners.bind(null, buttonType, ''))
	return consentButton;
}

function checkIfConsentProvided(){
	var consent = getConsentCookieInLocalStorage();
	if(consent === "accepted" || consent === "rejected"){
		return true;
	}
	return false;
}

function addConsentButtonListeners(buttonType){
		var consentValue = buttonType === 'accept' ? "accepted" : "rejected";// NO I18N
		let popUp = document.getElementById("zoho_thrive_cookie_popup");
		setConsentCookieInLocalStorage(consentValue);
		popUp.style.display = 'none';// NO I18N
		ZTbodyLoad();
}

function checkIfReferrerExists(){
	var thriveRefID = getUrlParameter('thrive_ref_id'); // NO I18N
	var widget_code = getUrlParameter('widget_code'); // NO I18N
	return (checkVariableValidity(thriveRefID) && checkVariableValidity(widget_code));
}

function checkVariableValidity(checkValue){
	if(checkValue !== undefined && checkValue !== null && checkValue !== ''){
		return true;
	}
	return false;
}

// Post iframe details to landing page
ZTreadyFunction();
ZTcreateIFrame();
window.addEventListener("load", ZTcookieConsent, false);
function ZTbodyLoad () {
	ZTsetRefID();
	var loadingDomain = window.location.href;
	var data = {
		thrivewidgetcode: thriveWidgetCode,
		domain: loadingDomain,
		zt_program_type:programType,
		customer_data: {}
	}
	if (platformType === 'shopify' && ztUserData != undefined && ztUserData.za_email_id!=undefined) {
		data.customer_data.email = ztUserData.za_email_id;
		data.customer_data.zt_customer_id = ztUserData.user_unique_id;
		data.customer_data.thrive_digest = ztUserData.thrive_digest;
	} else if(platformType === 'shopify' && ztUserData != undefined && ztUserData.signUpPage!=undefined){
		data.customer_data.signUpPage=ztUserData.signUpPage;
		data.customer_data.signInPage=ztUserData.signInPage;
	} 
	if (platformType) {
		data.thrive_platform = platformType;
	} if (programType) {
        data.thrive_program = programType;
    }
	if(getConsentCookieInLocalStorage() !== null){
		data.cookieConsent = getConsentCookieInLocalStorage();
	}
	var pathName = window.location.pathname.slice(1);
	data.pathname = pathName;
	ZTthrivePostMessage(data);
	
};

function ZTcookieConsent () {
	var loadingDomain = window.location.href;
	var data = {
		thrivewidgetcode: thriveWidgetCode,
		domain: loadingDomain,
		type: 'ZTcookieConsent'// NO I18N
	}
	ZTthrivePostMessage(data);
	ZTwindowLoaded();
}


function ZTthrivePostMessage(dataToSend){
	var iframeWin = document.getElementById("thrive-widget-iframe").contentWindow; // NO I18N
	iframeWin.postMessage(dataToSend, zt_parent_domain);

}

// Recieve message from parent page
async function ZTwindowLoaded() {
	var domain = ZTgetDomainName();
	if (!domain.includes('zoho.com') && !domain.includes('zohocorpin.com')) {
		window.addEventListener("message", ZTgetStyleFromChild, false);
	}
}

function ZTgetDomainName () {
	var domainName = window.location.href;
	domainName = domainName.split("/");
	domainName = domainName[0] + "//" + domainName[2];
	return domainName;
}

function ZTgetStyleFromChild(event) {
	if (event.data ==='callZohoCommerceCurrentPortalUser'){
		ZTzohoCommerceUserData();
	}else if(event.data ==='callWixSitePortalUser'){// NO I18N
		ZTwixUserData();
	}else if(event.data ==='callCustomUserSitePortalUser'){// NO I18N
		ZTcustomUserData();
	}else if(event.data ==='deleteParentThriveCookie'){// NO I18N
		deleteRefCookieInLocalStorage(thriveWidgetCode);
	}else if(event.data.type ==='ZTCookieConsentResponse'){// NO I18N
		if(event.data.cookieConsent === true){
			ZTCookieBannerPopup(event.data);
		}else{
			setConsentCookieInLocalStorage("disabled");// NO I18N
			ZTbodyLoad();
		}
	}
	else {
		event.data.messageFrom === 'Thrive' ? toggleButtonCreation(event) : '';// NO I18N
	}
}

async function ZTzohoCommerceUserData(){
	var domain = ZTgetDomainName();
	var portalUserData = await ecommerceServer.getCurrentPortalUser(domain);
	if(portalUserData !== undefined ) {
		if(portalUserData.current_user !== undefined && portalUserData.current_user.emailid !== undefined){
			var userProfile = await ecommerceServer.getCurrentUserProfile(domain);
			if(userProfile !== undefined && userProfile.payload !== undefined && userProfile.payload.contacts_zos_response !== undefined
				&& userProfile.payload.contacts_zos_response.contact !== undefined && userProfile.payload.contacts_zos_response.contact.contact_id !== undefined){
					portalUserData.current_user.contact_id = userProfile.payload.contacts_zos_response.contact.contact_id;
				}
		}
		var dataToSend = portalUserData;
		dataToSend.signUpPage=window.location.protocol + "//" + window.location.host+"/"+"signup";// NO I18N
		dataToSend.signInPage=window.location.protocol + "//" + window.location.host+"/"+"signin";// NO I18N
		dataToSend.messageType='zoho_commerce_CurrentPortalUser'; // NO I18N
		ZTthrivePostMessage(dataToSend);
	}
}

async function ZTwixUserData(){
	var domain = ZTgetDomainName();
	var portalUserData = await ecommerceServer.getWixCurrentPortalUser(domain);
	if(portalUserData !== undefined ) {
		var dataToSend = portalUserData;
		dataToSend.signUpPage=window.location.protocol + "//" + window.location.host+"/";// NO I18N
		dataToSend.signInPage=window.location.protocol + "//" + window.location.host+"/";// NO I18N
		dataToSend.messageType='wix_commerce_CurrentPortalUser'; // NO I18N
		ZTthrivePostMessage(dataToSend);
	}
}

async function ZTcustomUserData(){
	var domain = ZTgetDomainName();
	var portalUserData = ztUserData !== undefined ? ztUserData : '';
	if(portalUserData !== undefined ) {
		var dataToSend = portalUserData;
		if(dataToSend.signUpPage === undefined || dataToSend.signUpPage === ''){
			dataToSend.signUpPage=window.location.protocol + "//" + window.location.host;
		}
		dataToSend.messageType='custom_user_site_CurrentPortalUser'; // NO I18N
		ZTthrivePostMessage(dataToSend);
	}
}

/***************************/

//ZTreadyFunction();

function ZTreadyFunction() {
	var commoncssId = 'commonCss'; // NO I18N
	if (!byId(commoncssId)) {
		var head = document.getElementsByTagName('head')[0];
		var commonCss = document.createElement('link');
		commonCss.id = commoncssId;
		commonCss.rel = 'stylesheet';
		commonCss.type = 'text/css';
		commonCss.href = zt_parent_domain + 'static/thrive_action_scripts/css/ztcommon.css';
		commonCss.media = 'all'; // NO I18N
		head.appendChild(commonCss);
	}
}

//ZTcreateIFrame();

function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName;
	for (var i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};

function ZTgetPageHTMLURL() {
	var defaultURL = 'static/thrive_action_scripts/page.html'; // NO I18N
	var thriveRefID = getUrlParameter('thrive_ref_id'); // NO I18N
	var widget_code = getUrlParameter('widget_code'); // NO I18N
	var loginhash = getUrlParameter('loginhash'); // NO I18N
	if (thriveRefID !== undefined && thriveRefID !== null && thriveRefID !== '') {
		if(widget_code !== undefined && widget_code !== null && widget_code !== ''){
			return 'static/thrive_action_scripts/page.html?thrive_ref_id=' + thriveRefID +'&widget_code=' + widget_code; // NO I18N
		}
		return 'static/thrive_action_scripts/page.html?thrive_ref_id=' + thriveRefID; // NO I18N
	}
	else if (loginhash !== undefined && loginhash !== null && loginhash !== '') {
		return 'static/thrive_action_scripts/page.html?loginhash=' + loginhash;// NO I18N
	} else {
		return defaultURL;
	}
}

// Iframe creation
async function ZTcreateIFrame () {
	var widgetWrapper = createEle('div', 'widget-wrapper'); // NO I18N
	var widgetFrame = createEle('div', 'widget-frame'); // NO I18N
	var valueInURL = ZTgetPageHTMLURL();
	var iframe = document.createElement('iframe');
	iframe.setAttribute('src', zt_parent_domain + valueInURL);
	iframe.setAttribute('id', 'thrive-widget-iframe');
	iframe.setAttribute('thrive_widget_code', thriveWidgetCode);
	iframe.setAttribute('height', '100%');
	iframe.setAttribute('width', '100%');
	// iframe.style.display = 'none';
	widgetFrame.append(iframe);
	widgetWrapper.append(widgetFrame)
	byId('zoho_thrive_widget').append(widgetWrapper); // no I18N
}

function toggleButtonCreation (data) {
        document.getElementsByClassName('widget-wrapper')[0].setAttribute('widget-align', data.data.widget_position); // NO I18N
        document.getElementsByClassName('widget-wrapper')[0].style.margin = data.data.widget_bottom_spacing + 'px ' + data.data.widget_side_spacing + 'px'; // NO I18N
        var widgetToggler = createEle('div', 'modal-close-btn'); // NO I18N
        if (data.data.widget_button_text) {
		widgetToggler.classList.add('with-text'); // NO I18N
		widgetToggler.innerHTML = '<span style="font-weight: 800;font-family:'+data.data.font_family+';">' + data.data.widget_button_text  + '</span>'; // NO I18N
        }
	widgetToggler.addEventListener('click', widgetToggle);
        widgetToggler.style.background = data.data.theme_color;
        document.getElementsByClassName('widget-wrapper')[0].append(widgetToggler)
        if(!data.data.widgetBlockingStatus){
                setTimeout(function(){
					document.getElementsByClassName('modal-close-btn')[0].classList.add('active');// NO I18N
				}, 200)
        }else{
			byId('zoho_thrive_widget').style.display = 'none';// NO I18N
		}
}

function widgetToggle () {
    document.getElementsByClassName('widget-wrapper')[0].classList.toggle('show-widget'); // NO I18N
}

function createEle (ele, cls, id) {
	var element = document.createElement(ele);
    	cls ? element.className += cls : '' // Add class
    	id ? element.setAttribute("id", id) : '' // Add id
    	return element;
}
var iframe = document.getElementById("thrive-widget-iframe");
