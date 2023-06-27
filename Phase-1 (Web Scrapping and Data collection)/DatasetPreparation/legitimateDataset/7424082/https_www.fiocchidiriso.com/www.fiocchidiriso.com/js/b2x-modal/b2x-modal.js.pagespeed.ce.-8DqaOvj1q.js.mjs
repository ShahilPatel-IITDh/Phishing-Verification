/**
 * B2X Modal
 * Simone Conti
 *
 * ISTRUZIONI:
 * Il plugin è composto da 4 files:
 *  - b2x-modal.js (questo file)
 *  - b2x-modal-settings (usato dal singolo sito, sovrascrive alcune impostazioni di default)
 *  - b2x-modal-common-shortcuts.js (shortcuts comuni a tutti i siti per richiare alcune configurazioni di base del plugin)
 *  - b2x-modal-custom-shortcuts.js (shortcuts dedicate al singolo sito per richiare alcune configurazioni del plugin)
 */

(function($) {
  $.b2xModal = function(options) {
    // Mi fermo se c'è già un popup da admin da mostrare.
    if (isThereAPopupToShow()) {
      return;
    }

    var options = $.extend(true, {}, $.b2xModal.defaults, options);

    var $modal = jQuery(options.modalHtml);
    $("body").append($modal);

    var $modalDialog = jQuery(options.modalDialogHtml);
    $modal.append($modalDialog);

    var $modalContent = jQuery(options.modalContentHtml);
    $modalDialog.append($modalContent);

    var $modalHeader = jQuery(options.modalHeaderHtml);
    $modalContent.append($modalHeader);

    var $modalCloseButton = jQuery(options.modalCloseButtonHtml);
    $modalHeader.append($modalCloseButton);

    var $modalTitle = jQuery(options.modalTitleHtml);
    $modalHeader.append($modalTitle);

    var $modalBody = jQuery(options.modalBodyHtml);
    $modalContent.append($modalBody);

    var $modalFooter = jQuery(options.modalFooterHtml);
    $modalContent.append($modalFooter);

    var $modalFooterNotes = jQuery(options.modalFooterNotesHtml);
    $modalFooter.append($modalFooterNotes);

    $modalTitle.html(options.title);
    $modalBody.html(options.body);
    $modalFooterNotes.html(options.footerNotes);

    if (options.closable) {
      $modal.data("backdrop", true);
    } else {
      $modal.attr("data-keyboard", "false");
      $modalCloseButton.remove();
      $modal.data("backdrop", "static");
    }

    $modalDialog.addClass(options.clazz);

    if (options.title === "" && options.removeEmptyHeader) {
      $modalHeader.remove();
    }
    if (options.buttons.length === 0 && options.removeEmptyFooter && options.footerNotes === '') {
      $modalFooter.remove();
    }

    $(options.buttons).each(function(index) {
      var $button = jQuery("<button/>");
      $button.attr("type", "button");
      $button.addClass("btn");
      $button.addClass(this.clazz);
      $button.html(this.name);
      $button.bind("click", this.callBack);
      if (this.closeModal) {
        $button.attr("data-dismiss", "modal");
      }
      $modalFooter.prepend($button);
    });

    $modal.on("shown.bs.modal", function(e) {
      if (options.autoclose) {
        setTimeout(function() {
          $modal.modal("hide");
        }, options.delay);
      }
    });

    $modal.on("hidden.bs.modal", function(e) {
      $modal.remove();
    });

    $modal.modal("show");
  };

  $.b2xModal.defaults = {
    modalHtml:
      '<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">',
    modalDialogHtml: '<div class="modal-dialog">',
    modalContentHtml: '<div class="modal-content">',
    modalHeaderHtml: '<div class="modal-header">',
    modalCloseButtonHtml:
      '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
    modalTitleHtml: '<h4 class="modal-title">',
    modalBodyHtml: '<div class="modal-body">',
    modalFooterHtml: '<div class="modal-footer">',
    modalFooterNotesHtml:'<div class="footer-notes">',
    title: "",
    body: "",
    footerNotes: "",
    closable: true,
    autoclose: false,
    delay: 1000,
    clazz: "",
    removeEmptyFooter: true,
    buttons: [
      {
        name: getText("ok_button"),
        clazz: "btn-primary",
        callBack: null,
        closeModal: true
      }
    ]
  };
})(jQuery);
