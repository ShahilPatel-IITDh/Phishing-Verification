//pushevent
function analyticsEvent(category, action, opt_label, opt_value, opt_noninteractive) {
	if(!isTestEnvironment) {
		dataLayer.push({
			"event": category,
			"action": action,
			"opt_label": opt_label,
			"opt_value": opt_value,
			"opt_noninteractive": opt_noninteractive
		});
	}
};


function analyticsPushUserId(cookiePolicy, loggedStatus, userId, pageType, errorType) {
	if(!isTestEnvironment) {
		dataLayer.push({
			"cookiePolicy": cookiePolicy,
			"loggedStatus": loggedStatus,
			"userId": userId,
			"pageType" : pageType,
			"errorType": errorType
		});
	}
};

function analyticsPushHashedEmail(hashedEmail) {
	if(!isTestEnvironment) {
		dataLayer.push({
			"event": 'event-userId',
			"userId": hashedEmail
		});
	}
};

//Called when a link to a product is clicked.
function onProductClickEC(id, name, price, category, brand, listType, url) {
	if(!isTestEnvironment) {
		/* ||| Google Tag Manager script start ||| */
		dataLayer.push({
			"event": "productClick",
			"ecommerce": {
			    "click": {
			      "actionField": {
			        "list": listType
			      },
			      "products": [{
			        "id": id,
			        "name": name,
			        "price": price,
			        "brand": brand,
			        "category": category
			      }]
			    }
			}
		});
		/* ||| Google Tag Manager script finish ||| */
	}
};

//Called when a link to a product is added to cart.
function onProductAddCartEC(id, name, price, category, brand, quantity, customDimension, typeExitPopup) {
	if(!isTestEnvironment) {
		/* ||| Google Tag Manager script start ||| */
		if (customDimension != null) {
			dataLayer.push({
				"event": "addToCart",
				"ecommerce": {
					"currencyCode": "EUR",
					"add": {
						"products": [{
							"id": id,
							"name": name,
							"price":price,
							"brand":brand,
							"category": category,
							"dimension1": customDimension,
							"quantity": quantity
						}]
					}
				}
			});
		} else {
			dataLayer.push({
				"event": "addToCart",
				"ecommerce": {
					"currencyCode": "EUR",
					"add": {
						"products": [{
							"id": id,
							"name": name,
							"price":price,
							"brand":brand,
							"category": category,
							"quantity": quantity
						}]
					}
				}
			});
		}
		/* ||| Google Tag Manager script finish ||| */
	}
};

function onProductRemoveFromCartEC(id, name, price, category, brand) {
	/* ||| Google Tag Manager script start ||| */
	if(!isTestEnvironment) {
		dataLayer.push({
			"event": "removeFromCart",
			"ecommerce": {
			    "currencyCode": "EUR",
			    "remove": {
			      "products": [{
			        "id": id,
			        "name": name,
			        "price": price,
			        "brand": brand,
			        "category": category
			      }]
			    }
			}
		});
	}
	/* ||| Google Tag Manager script finish ||| */
};

function onProductClick(id, name, price, category, brand, listType, url, from) {
	onProductClickEC(id, name, price, category, brand, listType);
	if (typeof from !== 'undefined' && from) {
		analyticsEventClick(listType, 'SliderProdotti', url);
	}
}

function analyticsEventClick(event, from, url) {
	if(!isTestEnvironment) {
		analyticsEvent(event, from, url);
	}
}

function onPromoClickEC(campaignId, campaignName, position) {
	var positionStr = 'slot_' + position;
	
	/* ||| Enhanced ecommerce script start ||| */
	ga('ec:addPromo', {
		'id': campaignId,
		'name': campaignName,
		'creative': campaignName,
		'position': positionStr
	});

	// Send the promo_click action with an event.
	ga('ec:setAction', 'promo_click');
	ga('send', 'event', 'banner', 'click', campaignName);
	/* ||| Enhanced ecommerce script finish ||| */
}

function onPromoViewEC(campaignId, campaignName, position) {
	/* ||| Enhanced ecommerce script start ||| */
	ga('ec:addPromo', {
		'id': campaignId,
		'name': campaignName,
		'creative': campaignName,
		'position': position
	});
	/* ||| Enhanced ecommerce script finish ||| */
};