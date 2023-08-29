(function () {
  'use strict';

  $("body").on("click", "oem-menu oem-menu-label", function () {
    if ($(this).parent().hasClass('oem-menu-acrive')) {
      $(this).parent().find('.oem-menu-warp').slideUp();
    } else {
      $(this).parent().find('.oem-menu-warp').slideDown();
    }

    switchClass($(this).parent(), 'oem-menu-acrive');
  });
  $(function () {
    function init() {
      $(document).click(function () {
        $("oem-currency").removeClass("drop_currency_on");
      });
      $('oem-currency oem-currency-label').on('click', function (e) {
        e.stopPropagation();
        $(this).parent().toggleClass("drop_currency_on");
      });
      $('oem-currency drop_currency').on('click', function (e) {
        e.stopPropagation();
      });
      $('oem-currency web-currency').on('click', function (e) {
        e.stopPropagation();
        currencyPath($(this).data("type"));
      });

      function currencyPath(val) {
        var currency = moi.getUrlParam("currency");

        if (currency || location.href.indexOf("theme_id") > -1) {
          location.href = moi.changeURLArg(location.href, "currency", val);
        } else {
          location.href = moi.addURLParam(location.href, "currency", val);
        }
      }
    }

    init();
    moi.addEvent("updateBlock", function (e) {
      init();
    });
  });

  window.switchClass = function switchClass(dom, name, hasFunc, notFunc, finallyFunc) {
    if (dom.hasClass(name)) {
      dom.removeClass(name);

      if (hasFunc) {
        hasFunc();
      }
    } else {
      dom.addClass(name);

      if (notFunc) {
        notFunc();
      }
    }

    if (finallyFunc) {
      finallyFunc();
    }
  };

})();
