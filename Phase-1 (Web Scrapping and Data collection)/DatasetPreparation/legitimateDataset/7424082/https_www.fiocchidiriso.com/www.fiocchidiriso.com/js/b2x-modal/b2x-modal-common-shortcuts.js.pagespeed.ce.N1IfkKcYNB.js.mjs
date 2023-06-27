function showMessage(title, body) {
	$.b2xModal({
		title: title,
		body: body,
	});
}

function showError(title, body) {
	$.b2xModal({
		title: title,
		body: body,
		clazz: 'modal-error'
	});
}

function showMessageNoClose(title, body, buttonName, buttonCallback) {
	$.b2xModal({
		title: title,
		body: body,
		closable: false,
		buttons: [{
			name: buttonName,
			clazz: 'btn-primary',
			callBack: buttonCallback
		}]
	});
}

function showMessageWithCallback(title, body, buttonName, buttonCallback) {
	$.b2xModal({
		title: title,
		body: body,
		buttons: [{
			name: buttonName,
			clazz: 'btn-primary',
			callBack: buttonCallback
		}]
	});
}

function showErrorNoClose(title, body, buttonName, buttonCallback) {
	$.b2xModal({
		title: title,
		body: body,
		closable: false,
		clazz: 'modal-error',
		buttons: [{
			name: buttonName,
			clazz: 'btn-primary',
			callBack: buttonCallback
		}]
	});
}

function showMessageRegistrationSuccess(title, body) {
	$.b2xModal({
		title: title,
		body: body,
		buttons: [{
			name: getText('ok_button'),
			clazz: 'btn-primary',
			callBack: redirectToHomePage
		}]
	});
}

function showMessageCartMerged() {
	$.b2xModal({
		title: getText('warning_msg'),
		body: getText('warningMergeMsg'),
		closable: false,
		buttons: [{
			name: getText('cart_go_review'),
			clazz: 'btn-primary',
			callBack: redirectToCart
		}]
	});
}

function showMessageProductAddedToCart(title, body) {
	$.b2xModal({
		title: title,
		body: body,
		buttons: [{
				name: getText('continue_shopping'),
				clazz: 'btn-default',
			},{
				name: getText('go_checkout'),
				clazz: 'btn-primary',
				callBack: redirectToCart
			}
		]
	});
}

function showMessageProductAddedToCartFromCart(title, body) {
	$.b2xModal({
		title: title,
		body: body,
		buttons: [{
				name: getText('ok_button'),
				clazz: 'btn-primary',
				callBack: redirectToCart
			}
		]
	});
}

function showMessageProductAddedToPurchaseList(title, body) {
	$.b2xModal({
		title: title,
		body: body,
		buttons: [{
				name: getText('continue_shopping'),
				clazz: 'btn-default',
			},{
				name: getText('go_to_purchase_list'),
				clazz: 'btn-primary',
				callBack: redirectToPurchaseList
			}
		]
	});
}


function showMessageProductRemovedFromPurchaseList(title, body) {
	$.b2xModal({
		title: title,
		body: body,
		buttons: [{
				name: getText('purchase_list_button_ok'),
				clazz: 'btn-primary'
			}
		]
	});
}


function showMessageProductAddedToWishlist(title, body) {
	$.b2xModal({
		title: title,
		body: body,
		buttons: [{
				name: getText('continue_shopping'),
				clazz: 'btn-default',
			},{
				name: getText('go_to_wishlist'),
				clazz: 'btn-primary',
				callBack: redirectToWishlist
			}
		]
	});
}

function showMessageSessionExpired(title, body) {
	$.b2xModal({
		title: title,
		body: body,
		clazz: 'modal-error',
		buttons: [{
			name: getText('ok_button'),
			clazz: 'btn-primary',
			callBack: redirectToHomePage
		}]
	});
}

function showMessageLoginRequired(title, body) {
	$.b2xModal({
		title: title,
		body: body,
		buttons: [{
			name: getText('login_text'),
			clazz: 'btn-primary',
			callBack: redirectToLoginPage
		}]
	});
}

function showErrorNoButtonEmptyFooter(title, body) {
	$.b2xModal({
		title: title,
		body: body,
		clazz: 'modal-error',
		removeEmptyFooter: false,
		buttons: []
	});
}

function showMessageAutoClose(title, body) {
	$.b2xModal({
		title: title,
		body: body,
		autoclose: true
	});
}

function showMessageAutoClose(title, body, delay) {
	$.b2xModal({
		title: title,
		body: body,
		autoclose: true,
		delay: delay,
	});
}