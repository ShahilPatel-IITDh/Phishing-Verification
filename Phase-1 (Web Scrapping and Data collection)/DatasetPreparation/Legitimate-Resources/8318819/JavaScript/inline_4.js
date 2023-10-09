/* be sure to have the main Object there as well for Variables */
            window.TFT = window.TFT || {};
			window.TFT.Ext = window.TFT.Ext || {};
			window.TFT.Ext.FOL = window.TFT.Ext.FOL || {};
			window._folmq = window._folmq || [];


            window.TFT.Ext.loadAsynchOwnJs = function(ownJsUrl) {
                /* this part could be part of the main js as well */
                var FocusQueue = function () {
                    /* iterates through the parts of e.g. TFT.Ext.FOL.browserDetect.init and selects the function and the scope around it: function TFT.Ext.FOL.browserDetect.init, scope: TFT.Ext.FOL.browserDetect */
                    function getQueuedFunctionAndScopeByString(string) {
                        var splitted_string = string.split('.'),
                            curr_func = window[splitted_string.shift()],
                            curr_scope = window;

                        while(splitted_string.length > 0) {
                            curr_scope = curr_func;
                            curr_func = curr_func[splitted_string.shift()];
                        }

                        return {
                            func: curr_func,
                            scope: curr_scope
                        };
                    }

                    this.push = function () {
                        var current_argument,
                            funcAndScope;

                        for (var i = 0; i < arguments.length; i++) {
                            current_argument = arguments[i];

                            try {
                                if (typeof arguments[i] === "function") {
                                    /*  argument is already a function */
                                    current_argument();
                                } else {
                                    /*  argument is an array containing a string and the parameters */
                                    funcAndScope = getQueuedFunctionAndScopeByString(current_argument[0]);
                                    funcAndScope.func.apply(funcAndScope.scope, current_argument.splice(1));
                                }
                            } catch (error) {
                            	console.debug(error);
                                console.debug("Calling folmq failed: " +
                                            current_argument + " func: " +
                                            funcAndScope.func  + " scope: " +
                                            funcAndScope.scope);
                                TFT.Core.Console.debug('WireFrameHelperMethodQueue', 'message: ' + error.message,'error');
                            }
                        }
                    }
                };

                function handleQueue() {
                    var old_folmq = window._folmq;

                    window._folmq = new FocusQueue();
                    window._folmq.push.apply(window._folmq, old_folmq);
                }
                /*  until here. By doing this the onload handler gets unnecessary and the script can just be included with an async or defer tag */

                var s = document.createElement("script"),
                    t = document.getElementsByTagName("script")[0];
                s.onload = handleQueue;
                s.src= ownJsUrl;
                t.parentNode.insertBefore(s, t);

            };