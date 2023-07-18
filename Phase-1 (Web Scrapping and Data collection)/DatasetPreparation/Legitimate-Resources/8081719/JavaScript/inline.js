
            (function() {
            const agent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
            const REGEX_MATCH_CLIENT_TYPE = /BNC\/([0-9.]+) \(([a-zA-Z]+) ([0-9.]+)\)/;
            const isMiniApp = typeof window !== 'undefined' && window.__NEZHA_BRIDGE__ && !window.__NEZHA_BRIDGE__.postAction
            if(REGEX_MATCH_CLIENT_TYPE.test(agent) || isMiniApp){
              return null
            }
            function getJSON(str) {
              try {
                return JSON.parse(str)
              } catch (e) {
                return {}
              }
            }

            var AutoBlockScriptMap = getJSON('undefined');
            var SDKStubInfoMap = getJSON('undefined');

            var domain = location.hostname.split('.').slice(-2).join('.');
            // var domain = 'binance.com';

            function isString(str) {
              return str && typeof str === 'string';
            };

            var AutoBlockScript = AutoBlockScriptMap[domain];
            var stubInfo = SDKStubInfoMap[domain] || {};

            var SDKStubSrc = stubInfo.src;
            var SDKStubHash = stubInfo.hash;

            var injectAutoBlock = isString(AutoBlockScript);
            var injectSDKStub = isString(SDKStubSrc) && isString(SDKStubHash);

            if (injectAutoBlock) {
              var script = document.createElement('script');
              script.src = AutoBlockScript;
              script.type = 'text/javascript';
              script.async = true;
              document.body.appendChild(script);
            }

            if (injectSDKStub) {
              var script = document.createElement('script');
              script.src = SDKStubSrc;
              script.type = 'text/javascript';
              script.async = true;
              script.setAttribute('charSet', 'UTF-8');
              script.setAttribute('data-domain-script', SDKStubHash);
              document.body.appendChild(script);

              var s = document.createElement('script')
              s.type = 'text/javascript'
              script.async = true;
              s.innerHTML = 'function OptanonWrapper() {};'
              s.nonce = ''
              document.body.appendChild(s)

              var ss = document.createElement('script');
              ss.src = 'https://bin.bnbstatic.com/static/one-trust/onetrust-trigger.js';
              ss.type = 'text/javascript';
              script.async = true;
              ss.setAttribute('charSet', 'UTF-8');
              ss.setAttribute('data-domain-script', SDKStubHash);
              document.body.appendChild(ss);

            }
            }())