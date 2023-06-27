/**
 * B2X Analytics
 */
(function($) {
  $.b2xAnalytics = function(options) {
    init(options);
  };

  var init = function(options) {
    /*
     *
     * Capisce quali metodi utilizzare in base a quelli contenuti nella proprietà trackingIds
     * Dato che GA e GTAG sono due modi diversi per fare la stessa cosa, verrà usato GTAG come default in quanto più moderno
     * e si potrà scegliere GA appositamente per retrocompatibilità. Il debugMode esiste solo per GA.
     * In caso di Test Environment allineerà i metodi di Tracciamento di Test a quelli di produzione
     *
     *	trackingIds: {"ga": "UA-XXXX-Y","gtag": "UA-XXXX-Y","tagm": "GTM-XXXX"}
     *
     * */

    $.b2xAnalytics.testTrackingIds = {
      ga: "UA-111900395-2",
      gtag: "UA-111900395-2",
      tagm: "GTM-P884DZM"
    };

    $.b2xAnalytics.options = $.extend(
      true,
      {},
      $.b2xAnalytics.defaults,
      options
    );
    log("options: " + JSON.stringify($.b2xAnalytics.options));
    $.b2xAnalytics.trackingIds = $.b2xAnalytics.options.trackingIds;

    if (!$.b2xAnalytics.options.doInit) {
      // Se entro qui, vuol dire che ho fatto l'init esternamente al plugin, questo ramo è per retrocompatibilità.
      // Escludo uno tra ga e gtag.
      if (typeof ga === "function") {
        delete $.b2xAnalytics.trackingIds["gtag"];
        delete $.b2xAnalytics.testTrackingIds["gtag"];
      }
      if (typeof gtag === "function") {
        delete $.b2xAnalytics.trackingIds["ga"];
        delete $.b2xAnalytics.testTrackingIds["ga"];
      }
    } else {
      // Se entro qui, vuol dire che ho delegato al plugin l'init dei tracciamenti.
      if (
        $.b2xAnalytics.options.useGaInsteadOfGtag ||
        $.b2xAnalytics.options.debugMode
      ) {
        delete $.b2xAnalytics.trackingIds["gtag"];
        delete $.b2xAnalytics.testTrackingIds["gtag"];
      } else {
        delete $.b2xAnalytics.trackingIds["ga"];
        delete $.b2xAnalytics.testTrackingIds["ga"];
      }
    }

    if (isTestEnvironment) {
      if ($.b2xAnalytics.options.useDefaultCodesInTest) {
        // Allinea i metodi di tracciamento di Test a quelli di Produzione
        for (var trackingMethod in $.b2xAnalytics.testTrackingIds) {
          if (!(trackingMethod in $.b2xAnalytics.trackingIds)) {
            delete $.b2xAnalytics.testTrackingIds[trackingMethod];
          }
        }

        $.b2xAnalytics.trackingIds = $.b2xAnalytics.testTrackingIds;
        log(
          "Test Environment detected. Redirecting tracking to Test Analytics accounts: " +
            JSON.stringify($.b2xAnalytics.testTrackingIds)
        );
      } else {
        log(
          "Test Environment detected. Using DB tracking: " +
            JSON.stringify($.b2xAnalytics.trackingIds)
        );
      }
    }

    if ($.b2xAnalytics.options.doInit) {
      for (var method in $.b2xAnalytics.trackingIds) {
        switch (method) {
          case "ga":
            if ($.b2xAnalytics.options.debugMode) {
              var analyticsUrl =
                "https://www.google-analytics.com/analytics_debug.js";
            } else {
              var analyticsUrl =
                "https://www.google-analytics.com/analytics.js";
            }

            (function(i, s, o, g, r, a, m) {
              i["GoogleAnalyticsObject"] = r;
              (i[r] =
                i[r] ||
                function() {
                  (i[r].q = i[r].q || []).push(arguments);
                }),
                (i[r].l = 1 * new Date());
              (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
              a.async = 1;
              a.src = g;
              m.parentNode.insertBefore(a, m);
            })(window, document, "script", analyticsUrl, "ga");
            ga("create", $.b2xAnalytics.trackingIds[method], "auto");
            if ($.b2xAnalytics.options.anonymizeIp) {
              ga("set", "anonymizeIp", true);
            }
            
            log("GA Analytics Loaded with code: " + $.b2xAnalytics.trackingIds[method]);
            break;

          case "gtag":
            (function() {
              var s = document.createElement("script");
              s.type = "text/javascript";
              s.async = false;
              s.src =
                "https://www.googletagmanager.com/gtag/js?id=" +
                $.b2xAnalytics.trackingIds[method];
              var x = document.getElementsByTagName("script")[0];
              x.parentNode.insertBefore(s, x);
            })();
            window.dataLayer = window.dataLayer || [];
            $.b2xAnalytics.gtag = function() {
              dataLayer.push(arguments);
            };
            $.b2xAnalytics.gtag("js", new Date());
			$.b2xAnalytics.gtag('config', $.b2xAnalytics.trackingIds[method], { 'anonymize_ip': $.b2xAnalytics.options.anonymizeIp });
						           
            log("GTAG Analytics Loaded with code: " + $.b2xAnalytics.trackingIds[method]);
            break;

          case "tagm":
            //            (function() {
            //              var s = document.createElement("iframe");
            //              s.height = 0;
            //              s.width = 0;
            //              s.style = "display:none;visibility:hidden";
            //              s.src =
            //                "https://www.googletagmanager.com/ns.html?id=" +
            //                $.b2xAnalytics.trackingIds[method];
            //              document.body.appendChild(s);
            //            })();

			if (!$.b2xAnalytics.options.noGtmInit) {	
	            (function(w, d, s, l, i) {
	              w[l] = w[l] || [];
	              w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
	              var f = d.getElementsByTagName(s)[0],
	                j = d.createElement(s),
	                dl = l != "dataLayer" ? "&l=" + l : "";
	              j.async = true;
	              j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
	              f.parentNode.insertBefore(j, f);
	            })(
	              window,
	              document,
	              "script",
	              "dataLayer",
	              $.b2xAnalytics.trackingIds[method]
	            );
            
            	log("GTM Loaded with code: " + $.b2xAnalytics.trackingIds[method]);
			}
			
            break;
        }
      }
    }

    $.b2xAnalytics.initialized = true;

    if ($.b2xAnalytics.options.doSendPageView) {
      $.b2xAnalytics.send("sendPageview");
    }
  };

  /**
   * Attempt to implement a single function to handle all the possible calls.
   * Otherwise, multiple methods will be done (onProductAddedToCart, onProductClick, etc...)
   */
  $.b2xAnalytics.send = function(action, obj) {
    /*
     * Checking if the plugin is being correctly initialized.
     */
    if (!$.b2xAnalytics.initialized) {
      error("Analytics not Initialized");
      return;
    }
    
    if (!enabledThirdPartiesCookie) {    	
    	return;
    }

    //log("send: " + JSON.stringify(obj));

    switch (action) {
      case "sendPageview":
        /*
         * Management of sendPageviews (send Pageviews to Google Analytics)
         */
        for (var method in $.b2xAnalytics.trackingIds) {
          switch (method) {
            case "ga":
              ga("send", "pageview");
              log(method.toUpperCase() + " " + action + " Sent!");
              break;
            case "gtag":
              if (typeof $.b2xAnalytics.gtag === "function") {
                $.b2xAnalytics.gtag(
                  "config",
                  $.b2xAnalytics.trackingIds[method]
                );
              } else {
                gtag("config", $.b2xAnalytics.trackingIds[method]);
              }
              log(method.toUpperCase() + " " + action + " Sent!");
              break;
            case "tagm":
              log(method.toUpperCase() + " " + action + " Sent!");
              break;
          }
        }
        break;
      case "sendEvent":
        /*
         * Management of sendEvent (send Events to Google Analytics)
         * Example, call:
         * $.b2xAnalytics.send("sendEvent",['newsletterSubscribe', 'newsletter', 'Newsletter Subscribe Error: reCaptcha_error']);
         */

        for (var method in $.b2xAnalytics.trackingIds) {
          switch (method) {
            case "ga":
              ga("send", "event", obj[0], obj[1], obj[2]);
              break;
            case "gtag":
              if (typeof $.b2xAnalytics.gtag === "function") {
                $.b2xAnalytics.gtag("event", obj[1], {
                  event_category: obj[0],
                  event_label: obj[2]
                });
              } else {
                gtag("config", $.b2xAnalytics.trackingIds[method]);
              }
              break;
            case "tagm":
              dataLayer.push({
                event: obj[0],
                eventCategory: obj[0],
                eventAction: obj[1],
                eventLabel: obj[2]
              });
              break;
          }
        }
        break;

      case "sendTransaction":
        /*
         * Management of sendTransaction
         * Example, call:
         * $.b2xAnalytics.send('sendTransaction', ['visa', '01', 1000, [['sku1', 'name1', 'giocattoli', '9,99', '1'], ['sku2', 'name2', 'sport', '19,99', '2']]]);
         */

        for (var method in $.b2xAnalytics.trackingIds) {
          switch (method) {
            case "ga":
              break;
            case "gtag":
              break;
            case "tagm":
              var transactionProducts = [];
              obj[3].forEach(function(item, index) {
                var transactionProduct = {};
                transactionProduct.sku = item[0];
                transactionProduct.name = item[1];
                transactionProduct.category = item[2];
                transactionProduct.price = item[3];
                transactionProduct.quantity = item[4];
                transactionProducts.push(transactionProduct);
              });
              dataLayer.push({
                paymentMethod: obj[0],
                transactionId: obj[1],
                transactionTotal: obj[2],
                transactionProducts: transactionProducts
              });
              break;
          }
        }
        break;

      case "sendAddToCart":
        /*
         * Management of sendAddToCart
         * Example, call:
         * $.b2xAnalytics.send('sendAddToCart', ['add_to_Cart', ['AA12345', 'cart', 49, 'E-card']]);
         */

        for (var method in $.b2xAnalytics.trackingIds) {
          switch (method) {
            case "ga":
              break;
            case "gtag":
              break;
            case "tagm":
              dataLayer.push({
                event: obj[0],
                google_tag_params: {
                  ecomm_prodid: obj[1][0],
                  ecomm_pagetype: obj[1][1],
                  //              				ecomm_totalvalue: obj[1][2],
                  ecomm_category: obj[1][3]
                }
              });
              break;
          }
        }
        break;

      case "sendUser":
        /*
         * Management of sendUser
         * Example, call:
         * $.b2xAnalytics.send('sendUser', ['123456']);
         */

        for (var method in $.b2xAnalytics.trackingIds) {
          switch (method) {
            case "ga":
              break;
            case "gtag":
              break;
            case "tagm":
              dataLayer.push({
                customerId: obj[0]
              });
              break;
          }
        }
        break;

      case "sendViewItem":
        /*
         * Management of sendViewItem
         * Example, call:
         * $.b2xAnalytics.send("sendViewItem", ['view_item', [ [['id1','name1','list_name1','brand1','category1','variant1','list_position1'],['id2','name2','list_name2','brand2','category2','variant2','list_position2']] ] ]);
         */

        for (var method in $.b2xAnalytics.trackingIds) {
          switch (method) {
            case "ga":
              break;

            case "gtag":
              if (typeof $.b2xAnalytics.gtag === "function") {
                var itemsList = [];
                var itemsListTemp = [];
                itemsListTemp = obj[1][0];
                itemsListTemp.forEach(function(item, index) {
                  var viewItem = {};
                  viewItem.id = item[0];
                  viewItem.name = item[1];
                  viewItem.list_name = item[2];
                  viewItem.brand = item[3];
                  viewItem.category = item[4];
                  viewItem.variant = item[5];
                  viewItem.list_position = item[6];
                  itemsList.push(viewItem);
                });

                $.b2xAnalytics.gtag("event", obj[0], {
                  items: itemsList
                });

//                log(
//                  "action: " +
//                    action +
//                    ", method: " +
//                    method +
//                    ", params: " +
//                    JSON.stringify(obj)
//                );
//                log("obj[0]: " + obj[0] + ", items:" + itemsList);
              } else {
                gtag("config", $.b2xAnalytics.trackingIds[method]);
              }
              break;

            case "tagm":
              break;
          }
        }
        break;

      case "sendCheckoutProgress":
        /*
         * Management of sendCheckoutProgress
         * Example, call:
         * $.b2xAnalytics.send("sendCheckoutProgress", ['checkout_progress', [3, [['id1','name1','price1','brand1','category1','quantity1'],['id2','name2','price2','brand2','category2','quantity2']] ] ]);
         */

        for (var method in $.b2xAnalytics.trackingIds) {
          switch (method) {
            case "ga":
              break;

            case "gtag":
              if (typeof $.b2xAnalytics.gtag === "function") {
                var itemsList = [];
                var checkoutStep = obj[1][0];
                var itemsListTemp = [];
                itemsListTemp = obj[1][1];
                itemsListTemp.forEach(function(item, index) {
                  var itemTemp = {};
                  itemTemp.id = item[0];
                  itemTemp.name = item[1];
                  itemTemp.price = item[2];
                  itemTemp.brand = item[3];
                  itemTemp.category = item[4];
                  itemTemp.quantity = item[5];
                  itemsList.push(itemTemp);
                });

                $.b2xAnalytics.gtag("event", obj[0], {
                  checkout_step: checkoutStep,
                  items: itemsList
                });
              } else {
                gtag("config", $.b2xAnalytics.trackingIds[method]);
              }
              break;

            case "tagm":
              break;
          }
        }
        break;
    }

    log("ACTION: " + action + ", METHOD: " + method + ", PARAMS: " + JSON.stringify(obj));
  };

  $.b2xAnalytics.ecProductClick = function(productFieldObject, list, url) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
		
    for (var method in $.b2xAnalytics.trackingIds) {
      log("ACTION: ecProductClick, METHOD: " + method);

      switch (method) {
        case "ga":
          ga("ec:addProduct", {
            id: productFieldObject.id,
            name: productFieldObject.name,
            price: productFieldObject.price,
            brand: productFieldObject.brand,
            category: productFieldObject.category
          });
          ga("ec:setAction", "click", { list: list });
          ga("send", "event", list, "click", "", {
            hitCallback: function() {
              if (url !== undefined && url !== "") {
                document.location = url;
              }
            }
          });
          break;
        case "gtag":
          break;
        case "tagm":
          dataLayer.push({
            event: "productClick",
            ecommerce: {
              click: {
                actionField: { list: list },
                products: [productFieldObject]
              }
            },
            eventCallback: function() {
              if (url !== undefined && url !== "") {
                document.location = url;
              }
            }
          });
          break;
      }
    }
  };

  $.b2xAnalytics.ecAddToCart = function(productFieldObject, list) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
		
    for (var method in $.b2xAnalytics.trackingIds) {
      log("ACTION: ecAddToCart, METHOD: " + method);

      switch (method) {
        case "ga":
          ga("ec:addProduct", {
            id: productFieldObject.id,
            name: productFieldObject.name,
            category: productFieldObject.category,
            brand: productFieldObject.brand,
            price: productFieldObject.price,
            quantity: productFieldObject.qty
          });
          ga("ec:setAction", "add");
          ga("send", "event", list, "click", "add to cart");
          break;
        case "gtag":
          break;
        case "tagm":
          dataLayer.push({
            event: "addToCart",
            ecommerce: {
              currencyCode: "EUR",
              add: {
                products: [productFieldObject]
              }
            }
          });
          break;
      }
    }
  };

  $.b2xAnalytics.ecRemoveFromCart = function(productFieldObject, list) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
		
	for (var method in $.b2xAnalytics.trackingIds) {
      log("ACTION: ecRemoveFromCart, METHOD: " + method);      

      switch (method) {
        case "ga":
          ga("ec:addProduct", {
            id: productFieldObject.id,
            name: productFieldObject.name,
            price: productFieldObject.price,
            brand: productFieldObject.brand,
            category: productFieldObject.category
          });
          ga("ec:setAction", "remove");
          ga("send", "event", list, "click", "remove from cart");
          break;
        case "gtag":
          break;
        case "tagm":
          dataLayer.push({
            event: "removeFromCart",
            ecommerce: {
              remove: {
                products: [productFieldObject]
              }
            }
          });
          break;
      }
    }
  };

  $.b2xAnalytics.ecCheckout = function(step, productFieldObjects) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
		
    for (var method in $.b2xAnalytics.trackingIds) {
	  log("ACTION: ecCheckout, METHOD: " + method);
	
      switch (method) {
        case "ga":
          break;
        case "gtag":
          break;
        case "tagm":
          dataLayer.push({
            event: "checkout",
            ecommerce: {
              checkout: {
                actionField: {
                  step: step
                },
                products: productFieldObjects
              }
            }
          });
          break;
      }
    }
  };
  
  $.b2xAnalytics.ecPurchase = function(actionObj, productObjArray) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
		 	   
    for (var method in $.b2xAnalytics.trackingIds) {
	  log("ACTION: ecPurchase, METHOD: " + method);

      switch (method) {
        case "ga":
          break;
        case "gtag":
          break;
        case "tagm":
          dataLayer.push({
            event: "purchase",
            ecommerce: {
              currencyCode: "EUR",
              purchase: {
                actionField: actionObj,
                products: productObjArray
              }
            }
          });
          break;
      }
    }
  };

  // Evento Login
  $.b2xAnalytics.login = function(userId, customerType) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
	
    for (var method in $.b2xAnalytics.trackingIds) {
      log("EVENT: login, METHOD: " + method);
	  
	  switch (method) {
        case "ga":
          break;
        case "gtag":
          break;
        case "tagm":
			if ($.b2xAnalytics.options.GA4Spec) { 
				window.dataLayer = window.dataLayer || [];
				dataLayer.push({
					event: 'login',
					evtCat: 'user',
					evtAct: 'login',
					evtLab: userId,
					user_id: userId,
					customerType: customerType
				});
			}
          break;
      }
    }
  };

  // Evento Sign Up
  $.b2xAnalytics.registration = function(userId, customerType) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
		
    for (var method in $.b2xAnalytics.trackingIds) {
	  log("EVENT: registration, METHOD: " + method);
	
      switch (method) {
        case "ga":
          break;
        case "gtag":
          break;
        case "tagm":
			if ($.b2xAnalytics.options.GA4Spec) { 
				window.dataLayer = window.dataLayer || [];
				dataLayer.push({
					event: 'sign_up',
					evtCat: 'user',
					evtAct: 'register',
					evtLab: userId,
					user_id: userId,
					customerType: customerType
				});
			}
          break;
      }
    }
  };

  // Evento Select Item
  $.b2xAnalytics.selectItem = function(items) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
	  	
    for (var method in $.b2xAnalytics.trackingIds) {
	  log("EVENT: select_item, METHOD: " + method);
      
      switch (method) {
        case "ga":
          break;
        case "gtag":
          break;
        case "tagm":
			if ($.b2xAnalytics.options.GA4Spec) { 
				window.dataLayer = window.dataLayer || [];
				dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object
				dataLayer.push({
					event: "select_item",
					ecommerce: {
						items: items
					}
				});
			}
          break;
      }
    }
  };

  // Evento Add to cart
  $.b2xAnalytics.addToCart = function(items) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
	  	
    for (var method in $.b2xAnalytics.trackingIds) {
	  log("EVENT: add_to_cart, METHOD: " + method);
      
      switch (method) {
        case "ga":
          break;
        case "gtag":
          break;
        case "tagm":
			if ($.b2xAnalytics.options.GA4Spec) { 
				window.dataLayer = window.dataLayer || [];
				dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object
				dataLayer.push({
					event: "add_to_cart",
					ecommerce: {
						items: items
					}
				});
			}
          break;
      }
    }
  };

  // Evento Remove from cart
  $.b2xAnalytics.removeFromCart = function(items) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
	  	
    for (var method in $.b2xAnalytics.trackingIds) {
	  log("EVENT: remove_from_cart, METHOD: " + method);
      
      switch (method) {
        case "ga":
          break;
        case "gtag":
          break;
        case "tagm":
			if ($.b2xAnalytics.options.GA4Spec) { 
				window.dataLayer = window.dataLayer || [];
				dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object
				dataLayer.push({
					event: "remove_from_cart",
					ecommerce: {
						items: items
					}
				});
			}
          break;
      }
    }
  };

  // Evento Begin Checkout (Proceed Cart)
  $.b2xAnalytics.beginCheckout = function(items) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
	  	
    for (var method in $.b2xAnalytics.trackingIds) {
	  log("EVENT: begin_checkout, METHOD: " + method);
      
      switch (method) {
        case "ga":
          break;
        case "gtag":
          break;
        case "tagm":
			if ($.b2xAnalytics.options.GA4Spec) { 
				window.dataLayer = window.dataLayer || [];
				dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object
				dataLayer.push({
					event: "begin_checkout",
					ecommerce: {
						items: items
					}
				});
			}
          break;
      }
    }
  };

  // Evento Select payment
  $.b2xAnalytics.selectPayment = function(paymentMethod) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
	  	
    for (var method in $.b2xAnalytics.trackingIds) {
	  log("EVENT: begin_checkout, METHOD: " + method);
      
      switch (method) {
        case "ga":
          break;
        case "gtag":
          break;
        case "tagm":
			if ($.b2xAnalytics.options.GA4Spec) { 
				window.dataLayer = window.dataLayer || [];				
				dataLayer.push({
					event: "select_payment",
					evtCat: "checkout",
					evtAct: "click",
					evtLab: "payment_method",
					payment_method: paymentMethod
				});
			}
          break;
      }
    }
  };

  // Evento Add coupon
  $.b2xAnalytics.addCoupon = function(couponCode) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
	  	
    for (var method in $.b2xAnalytics.trackingIds) {
	  log("EVENT: begin_checkout, METHOD: " + method);
      
      switch (method) {
        case "ga":
          break;
        case "gtag":
          break;
        case "tagm":
			if ($.b2xAnalytics.options.GA4Spec) { 
				window.dataLayer = window.dataLayer || [];				
				dataLayer.push({
					event: "add_coupon",
					evtCat: "checkout",
					evtAct: "click",
					evtLab: "coupon_code",
					coupon_code: couponCode
				});
			}
          break;
      }
    }
  };

  // Evento Add shipping info
  $.b2xAnalytics.addShippingInfo = function(couponCode, totalCost, paymentMethod, shippingName, items) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
	  	
    for (var method in $.b2xAnalytics.trackingIds) {
	  log("EVENT: add_shipping_info, METHOD: " + method);
      
      switch (method) {
        case "ga":
          break;
        case "gtag":
          break;
        case "tagm":
			if ($.b2xAnalytics.options.GA4Spec) { 
				window.dataLayer = window.dataLayer || [];
				dataLayer.push({ ecommerce: null });	
				dataLayer.push({
					event: "add_shipping_info",
					ecommerce: {
						currency: "EUR",
						value: totalCost,
						coupon: couponCode,
						payment_method: paymentMethod,
						shipping_tier: shippingName,
						items: items
					}
				});
			}
          break;
      }
    }
  };

  // Evento Purchase
  $.b2xAnalytics.purchase = function(couponCode, paymentMethod, shippingName, totalCost, orderCode, shippingCost, productsTax, items) {
	if (!enabledThirdPartiesCookie) {    	
	   	return;
	}
	  	
    for (var method in $.b2xAnalytics.trackingIds) {
	  log("EVENT: purchase, METHOD: " + method);
      
      switch (method) {
        case "ga":
          break;
        case "gtag":
			if ($.b2xAnalytics.options.GA4Spec) {
				gtag("event", "purchase", {
				    transaction_id: orderCode,
				    value: totalCost,
				    tax: productsTax,
				    shipping: shippingCost,
				    currency: "EUR",
				    coupon: couponCode,
				    items: items
				});
			}
          break;
        case "tagm":
			if ($.b2xAnalytics.options.GA4Spec) { 
				window.dataLayer = window.dataLayer || [];
				dataLayer.push({ ecommerce: null });	
				dataLayer.push({
					event: "purchase",
					ecommerce: {
						transaction_id: orderCode,
						value: totalCost,
						tax: productsTax,
						shipping: shippingCost,
						currency: "EUR",						
						coupon: couponCode,
						payment_method: paymentMethod,
						shipping_tier: shippingName,
						items: items
					}
				});
			}
          break;
      }
    }
  };

  // Options default
  $.b2xAnalytics.defaults = {
    doInit: false,
    doSendPageView: false,
    debugMode: false,
    verbose: false,
    anonymizeIp: false,
    useGaInsteadOfGtag: false,
    trackingIds: [],
    useDefaultCodesInTest: true,
	noGtmInit: false,
	GA4Spec: false					// Abilita le specifiche GA4
  };

  function error(string) {
    console.error("[B2X Analytics] " + string);
  }

  function log(string) {
    if ($.b2xAnalytics.options.verbose) {
      console.log("[B2X Analytics] " + string);
    }
  }

  $.b2xAnalytics.initialized = false;
})(jQuery);
