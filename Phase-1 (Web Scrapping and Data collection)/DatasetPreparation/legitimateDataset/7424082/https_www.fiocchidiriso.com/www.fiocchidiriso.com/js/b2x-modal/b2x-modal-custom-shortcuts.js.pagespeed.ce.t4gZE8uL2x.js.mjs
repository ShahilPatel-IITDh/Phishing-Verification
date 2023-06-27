function showMessageAutoClose(icon, text, delay) {
	var delayTime = 1500;
	if (typeof delay !== 'undefined' ) delayTime = delay
	$.b2xModal({
		modalHtml : '<div class="modal modal-autoclose  fade" tabindex="-1" role="dialog" aria-hidden="true">',
		modalHeaderHtml: '',
		modalFooterHtml: '',
//		body: '<div class="modal-icon"><span class="goovi ' + icon + '"></span></div>' + 
		body: '<div class="modal-text">' + text + '</div>',
		autoclose: true,
		delay: delayTime,
		closable: false,
		clazz: 'modal-sm'
	});
}