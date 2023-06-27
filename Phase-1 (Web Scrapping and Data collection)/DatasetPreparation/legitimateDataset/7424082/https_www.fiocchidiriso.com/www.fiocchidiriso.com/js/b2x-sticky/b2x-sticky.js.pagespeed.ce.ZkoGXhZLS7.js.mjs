/**
 * B2X Sticky
 * Simone Conti
 * ver. 18/06/2019
 */
(function($) {
  $.b2xSticky = function(options) {
    init(options);
    fixTables();
    update();

    $(window).on("load.b2xSticky", function() {
      fixTables();
      update();
    });

    $(window).on(
      "scroll.b2xSticky",
      $.throttle($.b2xSticky.options.throttle, function() {
        update();
      })
    );

    $(window).on(
      "scroll.b2xSticky",
      $.debounce($.b2xSticky.options.debounce, function() {
        checkForRefresh();
      })
    );

    $(window).on(
      "resize.b2xSticky",
      $.debounce($.b2xSticky.options.debounce, function() {
        $.b2xSticky.refresh();
      })
    );
  };

  $.b2xSticky.refresh = function() {
    destroyAll();
    $.b2xSticky($.b2xSticky.options);
  };

  var init = function(options) {
    $(window).off("load.b2xSticky");
    $(window).off("scroll.b2xSticky");
    $(window).off("resize.b2xSticky");

    $.b2xSticky.itemsCount = countTotalVisibleItems();
    $.b2xSticky.containers = [];
    $.b2xSticky.externalTopElementsHeight = 0;
    $.b2xSticky.externalBottomElementsHeight = 0;

    $.b2xSticky.options = $.extend(true, {}, $.b2xSticky.defaults, options);
    $.b2xSticky.windowWidth = $(window).width();
    $.b2xSticky.windowHeight = $(window).outerHeight(true);

    var $containers = $("[data-b2x-sticky-container]:visible");

    $containers.each(function(index) {
      var $container = $(this);
      var stacks = getStacks($container);
      var $stacks = $(stacks);
      $stacks.each(function(index) {
        var $stack = $(this);
        var elements = getElements($container, $stack);
        $stack.data("elements", elements);
      });
      $container.data("stacks", $stacks);
      $.b2xSticky.containers.push($container);
    });

    // Calcolo l'altezza di tutti gli elementi (esterni al plugin) in position fixed-top.
    var $externalTopElements = $(
      "[data-b2x-sticky-external-top-element]:visible"
    );
    if ($externalTopElements.length > 0) {
      $.each($externalTopElements, function(index, value) {
        var $externalTopElement = $(value);
        $.b2xSticky.externalTopElementsHeight += calculateElementHeight(
          $externalTopElement
        );
      });
    }

    // Calcolo l'altezza di tutti gli elementi (esterni al plugin) in position fixed-bottom.
    var $externalBottomElements = $(
      "[data-b2x-sticky-external-bottom-element]:visible"
    );
    if ($externalBottomElements.length > 0) {
      $.each($externalBottomElements, function(index, value) {
        var $externalBottomElement = $(value);
        $.b2xSticky.externalBottomElementsHeight += calculateElementHeight(
          $externalBottomElement
        );
      });
    }

    $.each($.b2xSticky.containers, function(index, value) {
      var $container = $(value);

      $container.addClass("b2x-sticky-container");

      var containerHeight = $container.outerHeight(true);
      $container.data("height", containerHeight);
      var containerMarginTop = parseInt($container.css("margin-top"));
      $container.data("marginTop", containerMarginTop);
      var containerMarginBottom = parseInt($container.css("margin-bottom"));
      $container.data("marginBottom", containerMarginBottom);
      var containerPaddingTop = parseInt($container.css("padding-top"));
      $container.data("paddingTop", containerPaddingTop);
      var containerPaddingBottom = parseInt($container.css("padding-bottom"));
      $container.data("paddingBottom", containerPaddingBottom);

      var $stacks = $container.data("stacks");

      $.each($stacks, function(index, value) {
        var $stack = $(value);
        var $elements = $stack.data("elements");

        var elementsHeight = [];
        var $spacers = [];
        var $placeholders = [];

        $.each($elements, function(index, value) {
          var $element = value;

          var elementHeight = calculateElementHeight($element);
          elementsHeight.push(elementHeight);

          var $spacer = createSpacer($element);
          $spacers.push($spacer);

          var $placeholder = createPlaceholder($element);
          $placeholders.push($placeholder);

          var elementMarginTop = parseInt($element.css("margin-top"));
          $element.data("marginTop", elementMarginTop);
          var elementMarginBottom = parseInt($element.css("margin-bottom"));
          $element.data("marginBottom", elementMarginBottom);
          var elementBorderTop = parseInt($element.css("border-top-width"));
          $element.data("borderTop", elementBorderTop);
          var elementBorderBottom = parseInt(
            $element.css("border-bottom-width")
          );
          $element.data("borderBottom", elementBorderBottom);
          var elementWidth = $element.css("width");
          $element.data("width", elementWidth);

          /*
           * Tolgo il position relative a tutti i padri dell'elemento fino al container,
           * per poter fare un position absolute in relazione al container.
           */
          var $parentsUntilContainer = $element.parentsUntil($container);
          if ($parentsUntilContainer.length > 0) {
            $.each($parentsUntilContainer, function(index, value) {
              var $parent = $(value);
              if ($parent.css("position") === "relative") {
                $parent.addClass("force-position-static");
              }
            });
          }
        });
        $stack.data("elementsHeight", elementsHeight);
        $stack.data("spacers", $spacers);
        $stack.data("placeholders", $placeholders);
      });
    });
  };

  var update = function() {
    var docViewTop = $(window).scrollTop();

    $.each($.b2xSticky.containers, function(index, value) {
      var $container = $(value);

      var $stacks = $container.data("stacks");

      $.each($stacks, function(index, value) {
        var $stack = $(value);

        var $elements = $stack.data("elements");
        var elementsHeight = $stack.data("elementsHeight");
        var $spacers = $stack.data("spacers");
        var $placeholders = $stack.data("placeholders");

        if ($elements.length == 0) {
          return true;
        }

        var containerHeight = $container.data("height");
        var containerTop = $container.offset().top;
        var containerBottom = containerTop + containerHeight;
        var containerMarginTop = $container.data("marginTop");
        var containerMarginBottom = $container.data("marginBottom");
        var containerPaddingTop = $container.data("paddingTop");
        var containerPaddingBottom = $container.data("paddingBottom");

        // Calcolo l'altezza di tutti gli elementi già stickati al di fuori di questo container.
        var otherElementsHeight = 0;
        var $otherContainers = $container.parents(
          "[data-b2x-sticky-container]:visible"
        );
        if ($otherContainers.length > 0) {
          $.each($otherContainers, function(index, value) {
            var $otherContainer = $(value);
            var stickiedElementsTotalHeight = $otherContainer.data(
              "stickied-elements-total-height"
            );
            if (!isNaN(stickiedElementsTotalHeight)) {
              otherElementsHeight += $otherContainer.data(
                "stickied-elements-total-height"
              );
            }
          });
        }

        /*
         * Vedo se la somma delle altezze degli elementi da mettere in sticky è minore dell'altezza dello schermo.
         * In caso contrario non applico il plugin.
         */
        if (
          !checkHeights(
            $container,
            $stack,
            $elements,
            elementsHeight,
            containerPaddingTop,
            otherElementsHeight
          )
        ) {
          destroyStack($stack);
          return true;
        }

        $.each($elements, function(index, value) {
          var $element = value;
          var elementHeight = elementsHeight[index];
          var $spacer = $spacers[index];
          var $placeholder = $placeholders[index];

          var elementMarginTop = $element.data("marginTop");
          var elementMarginBottom = $element.data("marginBottom");
          var elementBorderTop = $element.data("borderTop");
          var elementBorderBottom = $element.data("borderBottom");
          var elementWidth = $element.data("width");

          var placeholderTop = $placeholder.offset().top;
          var placeholderAndContainerDistanceTop =
            placeholderTop - containerTop;
          var zIndex = getElementZIndex($element);

          // Calcolo l'altezza di tutti gli elementi precedenti a quello corrente
          var previousElementsHeight = 0;
          for (var i = 0; i < index; i++) {
            previousElementsHeight += elementsHeight[i];
          }

          // Calcolo l'altezza di tutti gli elementi successivi a quello corrente
          var nextElementsHeight = 0;
          for (var i = index + 1; i < $elements.length; i++) {
            nextElementsHeight += elementsHeight[i];
          }

          var valueToApplyStickyBottom = 0;
          valueToApplyStickyBottom += containerBottom;
          valueToApplyStickyBottom -= elementHeight;
          valueToApplyStickyBottom -= previousElementsHeight;
          valueToApplyStickyBottom -= nextElementsHeight;
          if (!isIgnoreContainerPaddingTop($container)) {
            valueToApplyStickyBottom -= containerPaddingTop;
          }
          if (!isIgnoreContainerPaddingBottom($container)) {
            valueToApplyStickyBottom -= containerPaddingBottom;
          }
          valueToApplyStickyBottom -= containerMarginTop;
          valueToApplyStickyBottom -= containerMarginBottom;
          valueToApplyStickyBottom -= otherElementsHeight;
          valueToApplyStickyBottom -= $.b2xSticky.externalTopElementsHeight;

          var valueToApplyStickyTop = 0;
          valueToApplyStickyTop += containerTop;
          if (!isIgnoreContainerPaddingTop($container)) {
            valueToApplyStickyTop -= containerPaddingTop;
          }
          valueToApplyStickyTop += placeholderAndContainerDistanceTop;
          valueToApplyStickyTop -= previousElementsHeight;
          if (isIgnoreElementMarginTop($element)) {
            valueToApplyStickyTop += elementMarginTop;
          }
          if (isIgnoreElementBorderTop($element)) {
            valueToApplyStickyTop += elementBorderTop;
          }
          valueToApplyStickyTop -= otherElementsHeight;
          valueToApplyStickyTop -= $.b2xSticky.externalTopElementsHeight;

          if (docViewTop > valueToApplyStickyBottom) {
            var bottom = 0;
            bottom += nextElementsHeight;
            if (!isIgnoreContainerPaddingBottom($container)) {
              bottom += containerPaddingBottom;
            }
            if (isIgnoreElementMarginBottom($element)) {
              bottom -= elementMarginBottom;
            }
            if (isIgnoreElementBorderBottom($element)) {
              bottom -= elementBorderBottom;
            }
            $element.removeClass("stickied-top");
            $element.css("top", "auto");
            $element.addClass("stickied-bottom");
            $element.css("bottom", bottom);
            $element.css("width", elementWidth);
            $element.css("z-index", zIndex);
            $spacer.show();
          } else if (docViewTop > valueToApplyStickyTop) {
            var top = 0;
            top += previousElementsHeight;
            if (!isIgnoreContainerPaddingTop($container)) {
              top += containerPaddingTop;
            }
            if (isIgnoreElementMarginTop($element)) {
              top -= elementMarginTop;
            }
            if (isIgnoreElementBorderTop($element)) {
              top -= elementBorderTop;
            }
            top += otherElementsHeight;
            top += $.b2xSticky.externalTopElementsHeight;
            $element.removeClass("stickied-bottom");
            $element.css("bottom", "auto");
            $element.addClass("stickied-top");
            $element.css("top", top);
            $element.css("width", elementWidth);
            $element.css("z-index", zIndex);
            $spacer.show();
          } else {
            destroyElement($element, $spacer);
          }
        });

        // Calcolo l'altezza di tutti gli elementi stickati e me la metto da parte
        var stickiedElementsTotalHeight = 0;
        $.each($elements, function(index, value) {
          var $element = value;
          if ($element.hasClass("stickied-top")) {
            stickiedElementsTotalHeight += elementsHeight[index];
          }
        });
        $stack.data(
          "stickied-elements-total-height",
          stickiedElementsTotalHeight
        );
      });
    });
  };

  var checkForRefresh = function() {
    // Resetto il plugin nel caso in cui cambi il numero di elementi da controllare
    var itemsCount = countTotalVisibleItems();
    if (itemsCount != $.b2xSticky.itemsCount) {
      $.b2xSticky.itemsCount = itemsCount;
      $.b2xSticky.refresh();
      return false;
    }

    // Resetto il plugin nel caso in cui cambi l'altezza di un'elemento
    $.each($.b2xSticky.containers, function(index, value) {
      var $container = $(value);
      var $stacks = $container.data("stacks");
      $.each($stacks, function(index, value) {
        var $stack = $(value);
        var $elements = $stack.data("elements");
        var $spacers = $stack.data("spacers");
        $.each($elements, function(index, value) {
        	var $element = value;
        	var $spacer = $spacers[index];
        	if ($spacer.outerHeight(false) != $element.outerHeight(false)) {
        		$.b2xSticky.refresh();
        		return false;
        	}
        });
      });
    });

    // Resetto il plugin nel caso in cui cambi l'altezza di un container
    $.each($.b2xSticky.containers, function(index, value) {
      var $container = $(value);
      var actualContainerHeight = $container.outerHeight(true);
      var previousContainerHeight = $container.data("height");
      if (actualContainerHeight != previousContainerHeight) {
        $.b2xSticky.refresh();
        return false;
      }
    });
  };

  var destroyElement = function($element, $spacer) {
    $element.removeClass("stickied-top");
    $element.css("top", "auto");
    $element.removeClass("stickied-bottom");
    $element.css("width", "");
    $element.css("z-index", "auto");
    if ($spacer != null) {
      $spacer.hide();
    }
  };

  var destroyStack = function($stack) {
    var $elements = $stack.data("elements");
    var $spacers = $stack.data("spacers");
    $.each($elements, function(index, value) {
      var $element = value;
      var $spacer = $spacers[index];
      destroyElement($element, $spacer);
    });
  };

  var destroyAll = function() {
    $.each($.b2xSticky.containers, function(index, value) {
      var $container = $(value);
      var $stacks = $container.data("stacks");
      $.each($stacks, function(index, value) {
        var $stack = $(value);
        destroyStack($stack);
      });
    });
  };

  var getStacks = function($container) {
    var stacks = $container.find("[data-b2x-sticky-stack]:visible");
    var $stacks = [];

    $.each(stacks, function(index, value) {
      var $stack = $(value);
      var $closestStickyContainer = $stack
        .parents("[data-b2x-sticky-container]:visible")
        .first();
      if ($closestStickyContainer.is($container)) {
        $stacks.push($stack);
      }
    });

    // Se il container non ha degli stack, il container stesso fa da stack.
    if ($stacks.length === 0) {
      $stacks.push($container);
    }

    return $stacks;
  };

  var getElements = function($container, $stack) {
    var elements = $stack.find("[data-b2x-sticky-element]:visible");
    var $elements = [];

    $.each(elements, function(index, value) {
      var $element = $(value);
      var elementMinWindowWidth = getElementMinWindowWidth($element);
      if ($.b2xSticky.windowWidth > elementMinWindowWidth) {
        var $closestStickyContainer = $element
          .parents("[data-b2x-sticky-container]:visible")
          .first();
        if ($closestStickyContainer.is($container)) {
          $elements.push($element);
        }
      }
    });

    $elements = sortByIndex($elements);

    return $elements;
  };

  var calculateElementHeight = function($element) {
    var elementHeight = 0;
    // altezza elemento
    elementHeight += $element.outerHeight(false);
    // margin top
    if (!isIgnoreElementMarginTop($element)) {
      elementHeight += parseInt($element.css("margin-top"));
    }
    // margin bottom
    if (!isIgnoreElementMarginBottom($element)) {
      elementHeight += parseInt($element.css("margin-bottom"));
    }
    // border top
    if (isIgnoreElementBorderTop($element)) {
      elementHeight -= parseInt($element.css("border-top-width"));
    }
    // border bottom
    if (isIgnoreElementBorderBottom($element)) {
      elementHeight -= parseInt($element.css("border-bottom-width"));
    }
    return elementHeight;
  };

  var sortByIndex = function($elements) {
    function compare(a, b) {
      if (a.data("b2x-sticky-element") < b.data("b2x-sticky-element"))
        return -1;
      if (a.data("b2x-sticky-element") > b.data("b2x-sticky-element")) return 1;
      return 0;
    }
    return $elements.sort(compare);
  };

  var createSpacer = function($element) {
    var $spacer;
    var $nextElement = $element.next();
    if ($nextElement.hasClass("b2x-sticky-spacer")) {
      $spacer = $nextElement;
    } else {
      $spacer = jQuery("<div class='b2x-sticky-spacer'>");
      $spacer.insertAfter($element);
    }
    $spacer.height($element.outerHeight(false));
    $spacer.css("margin-top", $element.css("margin-top"));
    $spacer.css("margin-bottom", $element.css("margin-bottom"));
    return $spacer;
  };

  var createPlaceholder = function($element) {
    var $placeholder;
    var $previousElement = $element.prev();
    if ($previousElement.hasClass("b2x-sticky-placeholder")) {
      $placeholder = $previousElement;
    } else {
      $placeholder = jQuery("<div class='b2x-sticky-placeholder'>");
      $placeholder.insertBefore($element);
    }
    return $placeholder;
  };

  var checkHeights = function(
    $container,
    $stack,
    $elements,
    elementsHeight,
    containerPaddingTop,
    otherElementsHeight
  ) {
    var heightNeeded = 0;
    $.each($elements, function(index, value) {
      var $element = value;
      heightNeeded += elementsHeight[index];
    });
    if (!isIgnoreContainerPaddingTop($container)) {
      heightNeeded += containerPaddingTop;
    }
    heightNeeded += otherElementsHeight;
    heightNeeded += $.b2xSticky.externalTopElementsHeight;
    heightNeeded += $.b2xSticky.externalBottomElementsHeight;
    return $.b2xSticky.windowHeight > heightNeeded;
  };

  var fixTables = function() {
    $.each($.b2xSticky.containers, function(index, value) {
      var $container = $(value);
      var $stacks = $container.data("stacks");
      $.each($stacks, function(index, value) {
        var $stack = $(value);
        var $elements = $stack.data("elements");
        $.each($elements, function(index, value) {
          var $elements = $(value);
          var $spacers = $stack.data("spacers");
          $.each($elements, function(index, value) {
            var $element = $(value);
            var $spacer = $spacers[index];
            if ($element.is("thead") || $element.is("tr")) {
              destroyElement($element, $spacer);
              $element.find("th, td").css("width", "");
              $table = $element.closest("table");
              if ($table.find("colgroup").length != 0) {
                $table
                  .find("colgroup")
                  .first()
                  .remove();
              }
              var $colgroup = jQuery("<colgroup>");
              $table.prepend($colgroup);
              $element.find("th, td").each(function() {
                var $th = $(this);
                var $col = jQuery("<col>");
                var thWidth = $th.outerWidth();
                $th.outerWidth(thWidth);
                $col.outerWidth(thWidth);
                $colgroup.append($col);
              });
            }
            // Se si tratta di un thead, sposto il suo placeholder fuori dalla tabella, subito prima, perchè altrimenti disturba il rendering.
            if ($element.is("thead") || $element.is("tr")) {
              var $placeholder = $element.prev();
              if ($placeholder.hasClass("b2x-sticky-placeholder")) {
                var $table = $element.closest("table");
                $placeholder.insertBefore($table);
              }
            }
          });
        });
      });
    });
  };

  var countTotalVisibleItems = function() {
    var containers = $("[data-b2x-sticky-container]:visible");
    var elements = $("[data-b2x-sticky-element]:visible");
    return containers.length + elements.length;
  };

  var isIgnoreContainerPaddingTop = function($container) {
    var ignore = $container.data("b2x-sticky-container-ignore-padding-top");
    if (ignore == null) {
      ignore = $.b2xSticky.options.ignoreContainerPaddingTop;
    }
    return ignore;
  };

  var isIgnoreContainerPaddingBottom = function($container) {
    var ignore = $container.data("b2x-sticky-container-ignore-padding-bottom");
    if (ignore == null) {
      ignore = $.b2xSticky.options.ignoreContainerPaddingBottom;
    }
    return ignore;
  };

  var isIgnoreElementMarginTop = function($element) {
    var ignore = $element.data("b2x-sticky-element-ignore-margin-top");
    if (ignore == null) {
      ignore = $.b2xSticky.options.ignoreElementMarginTop;
    }
    return ignore;
  };

  var isIgnoreElementMarginBottom = function($element) {
    var ignore = $element.data("b2x-sticky-element-ignore-margin-bottom");
    if (ignore == null) {
      ignore = $.b2xSticky.options.ignoreElementMarginBottom;
    }
    return ignore;
  };

  var isIgnoreElementBorderTop = function($element) {
    var ignore = $element.data("b2x-sticky-element-ignore-border-top");
    if (ignore == null) {
      ignore = $.b2xSticky.options.ignoreElementBorderTop;
    }
    return ignore;
  };

  var isIgnoreElementBorderBottom = function($element) {
    var ignore = $element.data("b2x-sticky-element-ignore-border-bottom");
    if (ignore == null) {
      ignore = $.b2xSticky.options.ignoreElementBorderBottom;
    }
    return ignore;
  };

  var getElementZIndex = function($element) {
    var zIndex = $element.data("b2x-sticky-element-z-index");
    if (zIndex == null) {
      zIndex = $.b2xSticky.options.zIndex;
    }
    return zIndex;
  };

  var getElementMinWindowWidth = function($element) {
    var minWindowWidth = $element.data("b2x-sticky-element-min-window-width");
    if (minWindowWidth == null) {
      minWindowWidth = $.b2xSticky.options.minWindowWidth;
    }
    return minWindowWidth;
  };

  $.b2xSticky.defaults = {
    ignoreContainerPaddingTop: true,
    ignoreContainerPaddingBottom: false,
    ignoreElementMarginTop: true,
    ignoreElementMarginBottom: false,
    ignoreElementBorderTop: true,
    ignoreElementBorderBottom: false,
    zIndex: 1,
    minWindowWidth: 0,
    throttle: 10,
    debounce: 100
  };

  $.b2xSticky.options;
  $.b2xSticky.containers;
  $.b2xSticky.itemsCount;
  $.b2xSticky.externalTopElementsHeight;
  $.b2xSticky.externalBottomElementsHeight;
  $.b2xSticky.windowWidth;
  $.b2xSticky.windowHeight;
})(jQuery);
