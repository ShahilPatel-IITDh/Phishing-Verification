
          window._okGlobal = {};
          window._okxGlobal = {};
          window.javaweb_locale = '{}';
          window.devState = {};
          if (window.location.search.indexOf('logout') > -1) {
            localStorage.removeItem('simulatedTrading');
          }
          var $javaWebLocal = document.querySelector('#javaweb_locale'),
              $seoLocale = document.querySelector('#seo_locale'),
              $appState = document.querySelector('#appState'),
              $headerAndFooterState = document.querySelector('#headerAndFooterState'),
              $okGlobal = document.querySelector('#_okGlobal');
              $okxGlobal = document.querySelector('#_okxGlobal');
              $devState = document.querySelector('#devState');
          if($javaWebLocal) {
            window.javaweb_locale = $javaWebLocal.textContent;
          }

          if($appState) {
            try {
              window.__INIT_STATE__ = JSON.parse($appState.textContent)
            } catch(err) {
              window.__INIT_STATE__ = {
                msg: err ? err.message : 'parse appState error'
              }
            }
          }
          if($headerAndFooterState && window.__INIT_STATE__) {
             try {
              var headerAndFooterContext = JSON.parse($headerAndFooterState.textContent) || {};
              window.__INIT_STATE__.headerContext = headerAndFooterContext.headerContext;
              window.__INIT_STATE__.footerContext = headerAndFooterContext.footerContext;
            } catch(err) {
              window.__INIT_STATE__.msg = err ? err.message : 'parse $headerAndFooterState error';
            }
          }
          if($okGlobal) {
            try {
              window._okGlobal = JSON.parse($okGlobal.textContent);
            } catch(err) {
              window._okGlobal = {
                msg: err ? err.message : 'parse okGlobal error'
              }
            }
          }
          if($okxGlobal) {
            try {
              window._okxGlobal = JSON.parse($okxGlobal.textContent);
            } catch(err) {
              window._okxGlobal = {
                msg: err ? err.message : 'parse okGlobal error'
              }
            }
          }
          if($devState) {
            try {
              window.devState = JSON.parse($devState.textContent);
            } catch(err) {
              window.devState = {
                msg: err ? err.message : 'parse devState error'
              }
            }
          }
        