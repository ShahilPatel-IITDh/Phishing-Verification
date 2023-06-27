/**
 * B2X Modal Resource Bundle
 * Simone Conti
 */

(function($){
	
	$.b2xModalResourceBundle = function($element) {
		
		var contentCode = $element.data('content-code');
		var id = $element.data('id');
		var key = $element.data('key');
		var value = $element.data('value');
		var type = $element.data('type');
		var action = $element.data('action');
		var from = $element.data('from');
		
		if (typeof type === 'undefined') {
			type = 'input';
		}
		
		if (typeof action === 'undefined') {
			action = 'edit';
		}
		
		var $modal = jQuery('<div class="modal b2x-modal-resource-bundle" tabindex="-1" role="dialog" aria-hidden="true">');
		$('body').append($modal);
		
		var $form = jQuery('<form id="resource-bundle-edit-form">');
		$modal.append($form);
		
		var $modalDialog = jQuery('<div class="modal-dialog modal-lg">');
		$form.append($modalDialog);
		
		var $modalContent = jQuery('<div class="modal-content">');
		$modalDialog.append($modalContent);
		
		var $modalHeader = jQuery('<div class="modal-header">');
		$modalContent.append($modalHeader);
		
		var $modalCloseButton = jQuery('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
		$modalHeader.append($modalCloseButton);
		
		var $modalTitle = jQuery('<h4 class="modal-title">');
		$modalHeader.append($modalTitle);
		
		var $modalBody = jQuery('<div class="modal-body">');
		$modalContent.append($modalBody);
		
		var $actualValueFormGroup = jQuery('<div class="form-group">');
		$modalBody.append($actualValueFormGroup);
		
		var $actualValueLabel = jQuery('<label>');
		$actualValueFormGroup.append($actualValueLabel);
		
		var $newValueFormGroup = jQuery('<div class="form-group">');
		$modalBody.append($newValueFormGroup);
		
		var $newValueLabel = jQuery('<label>');
		$newValueFormGroup.append($newValueLabel);
		
		var $modalFooter = jQuery('<div class="modal-footer">');
		$modalContent.append($modalFooter);
		
		var $submitButton = jQuery('<button type="submit" class="btn btn-primary">Save changes</button>');
		$modalFooter.append($submitButton);
		
		$modalTitle.html(contentCode + ' - ' + key);
		$actualValueLabel.html('Actual value');
		$newValueLabel.html('New value');
		
		var $actualValueInput;
		var $newValueInput;
		
		switch(type) {
			case 'textarea':
				$actualValueInput = jQuery('<textarea rows="5">');
				$newValueInput = jQuery('<textarea rows="5">');
				break;
			case 'wysiwyg':
				$actualValueInput = jQuery('<textarea rows="5">');
				$newValueInput = jQuery('<textarea rows="5">');
				break;
			default:
				$actualValueInput = jQuery('<input>');
				$newValueInput = jQuery('<input>');
		}
		
		$actualValueInput.addClass('form-control');
		$actualValueInput.attr('name', 'actualValue');
		$actualValueInput.val(value);
		$actualValueInput.prop('disabled', true);
		$actualValueFormGroup.append($actualValueInput);
		
		$newValueInput.addClass('form-control');
		$newValueInput.attr('name', 'newValue');
		$newValueInput.val(value);
		$newValueFormGroup.append($newValueInput);
		
//		if (type === 'wysiwyg') {
//			
//			ClassicEditor
//				.create($actualValueInput.get(0))
//				.then(editor => {
//					editor.isReadOnly = true;
//				});
//			
//			ClassicEditor
//				.create($newValueInput.get(0))
//				.then(editor => {
//					editor.editing.view.focus();
//				});
//			
//		}
		
		var $inputHiddenContentCode = jQuery('<input type="hidden" name="contentCode" value="' + contentCode + '" />');
		$form.append($inputHiddenContentCode);
		
		var $inputHiddenId = jQuery('<input type="hidden" name="id" value="' + id + '" />');
		$form.append($inputHiddenId);
		
		var $inputHiddenKey = jQuery('<input type="hidden" name="key" value="' + key + '" />');
		$form.append($inputHiddenKey);
		
		var $inputHiddenAction = jQuery('<input type="hidden" name="action" value="' + action + '" />');
		$form.append($inputHiddenAction);
		
		$modal.on('hidden.bs.modal', function(e) {
			$modal.remove();
		})
		
		$modal.data('from', from);
		$modal.data('element', $element);
		
		$modal.modal('show');
		
		$newValueInput.focus();
		
		$form.validate({
			rules : {
				newValue : "required"
			},
			submitHandler : function(form) {
				if (ajax_loading) {
					return;
				}
				$.ajax({
					type : "POST",
					url: getAbsoluteurl("../../async/resourceBundleEdit.do"),
					data: $form.serializeArray(),
					error : function(xhr, errtype, e) {
						showError(getText('error'), getText('internal_error'));
					},
					success : function(data) {
						var newValue = data;
						$modal.modal("hide");
						if (from === 'editor') {
							var $tr = $element.parents('tr').first();
							$tr.data('value-modified', newValue);
							updateResourceBundleEditorRow($tr);
						} else {
							$element.html(newValue);
							$element.data('value', newValue);
						}
					}
				});
			}
		});
	}
	
	$(document).on('mouseenter', '.resource-bundle', function(e){
		var $icon = $(this).find('.resource-bundle-edit-icon');
		if (!$icon.exists()) {
			$icon = jQuery('<span class="resource-bundle-edit-icon">');
			$(this).append($icon);
		} else {
			$icon.stop(true, true).show();
		}
	});
	
	$(document).on('mouseleave', '.resource-bundle', function(e){
		var $icon = $(this).find('.resource-bundle-edit-icon');
		$icon.delay(500).fadeOut(250);
	});
	
	$(document).on('click', '.resource-bundle-edit-icon', function(e){
		e.preventDefault();
		e.stopPropagation();
		var $element = $(this).parent();
		$.b2xModalResourceBundle($element);
	});
	
	$(document).on('click', '.resource-bundle-editor-edit-icon', function(e){
		e.preventDefault();
		e.stopPropagation();
		var $element = $(this);
		$.b2xModalResourceBundle($element);
	});
	
	$(document).on('click', '.resource-bundle-editor-restore-icon', function(e){
		e.preventDefault();
		e.stopPropagation();
		var $element = $(this);
		var contentCode = $element.data('content-code');
		var key = $element.data('key');
		var from = $element.data('from');
		$.ajax({
			type : "POST",
			url: getAbsoluteurl("../../async/resourceBundleRestore.do"),
			data: "contentCode=" + contentCode + "&key=" + key,
			error : function(xhr, errtype, e) {
				showError(getText('error'), getText('internal_error'));
			},
			success : function(data) {
				if (from === 'editor') {
					var $tr = $element.parents('tr').first();
					$tr.removeAttr('data-value-content');
					$tr.removeData('value-content');
					$tr.removeAttr('data-value-modified');
					$tr.removeData('value-modified');
					updateResourceBundleEditorRow($tr);
				} else {
					
				}
			}
		});
	});
	
	/*
	 * Permetto la modalità di editing dei bundle solo se la pagina viene caricata dentro un iFrame
	 */
	if (!inIframe()) {
		var resourceBundleEditEnabled = getCookie('resourceBundleEditEnabled');
		if (resourceBundleEditEnabled) {
			deleteCookie('resourceBundleEditEnabled');
			reloadPage();
		}
	}
	
})(jQuery);