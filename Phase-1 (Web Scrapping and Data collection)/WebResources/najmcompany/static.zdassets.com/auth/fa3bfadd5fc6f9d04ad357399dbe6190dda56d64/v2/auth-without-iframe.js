(() => {
    var t, e = {
            749: t => {
                t.exports = function() {
                    var t = document.querySelectorAll('input:not([type="hidden"])[required]'),
                        e = document.querySelector("div#required-input-error-message");
                    if (e.innerText = "Missing the following required fields: ", t) {
                        t.forEach((function(t) {
                            t.setAttribute("aria-invalid", t.value ? "false" : "true"), "true" === t.getAttribute("aria-invalid") ? t.setAttribute("aria-describedby", e.id) : t.removeAttribute("aria-describedby")
                        }));
                        var n = document.querySelectorAll('input[aria-invalid="true"');
                        n && Array.prototype.slice.call(n).map((function(t) {
                            var n = t.id.split("_"),
                                i = n[n.length - 1];
                            return e.innerText += " ".concat(i, ", "), !1
                        }))
                    }
                }
            },
            485: t => {
                t.exports = function(t) {
                    9 === t.keyCode && (this.first && t.shiftKey || !this.first && !t.shiftKey) && (t.preventDefault(), this.nextElement.focus())
                }
            },
            310: t => {
                t.exports = function(t, e, n) {
                    var i;
                    for (i in t) t.hasOwnProperty(i) && e.call(n, i, t[i])
                }
            },
            521: t => {
                t.exports = function(t, e) {
                    return function() {
                        return t.apply(e, arguments)
                    }
                }
            },
            573: t => {
                var e = function() {
                    var t = !1,
                        e = [];
                    return function n() {
                            setTimeout((function() {
                                /loaded|complete/.test(document.readyState) ? (t = !0, e.forEach((function(t) {
                                    t()
                                }))) : n()
                            }), 50)
                        }(),
                        function(n) {
                            t ? n() : e.push(n)
                        }
                }.call();
                t.exports = e
            },
            268: t => {
                t.exports = function(t, e, n) {
                    var i = "on" + e;
                    window.addEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent(i, n)
                }
            },
            239: t => {
                t.exports = function(t, e, n) {
                    var i = "on" + e;
                    window.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent(i, n)
                }
            },
            207: t => {
                t.exports = function() {
                    var t = document.querySelector("#show-password-toggle-svg"),
                        e = document.querySelector("#show-password-toggle-button"),
                        n = document.querySelector("#sr-show-password-button-state"),
                        i = e.getAttribute("aria-checked");
                    if (e) {
                        var o = document.querySelector(".validate_password");
                        e.setAttribute("aria-checked", "false" === i ? "true" : "false"), n.innerText = "true" === i ? "Password hidden" : "Password shown", "password" === o.type ? (o.type = "text", t.innerHTML = "<g fill='none' stroke='currentColor'> <circle cx='6' cy='6' r='1.5'/>  <path stroke-linejoin='round' d='M11.38 6.37c.16-.22.16-.52 0-.75-.63-.9-2.5-3.12-5.38-3.12S1.25 4.72.62 5.63c-.16.22-.16.52 0 .75.63.9 2.5 3.12 5.38 3.12s4.75-2.22 5.38-3.13z'/></g>") : (o.type = "password", t.innerHTML = "<g fill='currentColor'>  <circle cx='6' cy='6' r='1.5'/>  <path d='M11.79 5.34C11.08 4.33 9.1 2 6 2S.92 4.33.21 5.34c-.28.4-.28.93 0 1.32C.92 7.67 2.9 10 6 10s5.08-2.33 5.79-3.34c.28-.39.28-.93 0-1.32zM6 8.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z'/></g>")
                    }
                }
            },
            618: (t, e, n) => {
                var i = n(310),
                    o = n(239),
                    a = n(485),
                    c = function(t) {
                        i(t || {}, (function(t, e) {
                            this[t] = e
                        }), this)
                    };
                c.prototype = {
                    init: function() {},
                    load: function() {},
                    unload: function() {},
                    setCircularTab: function() {
                        var t = document.querySelectorAll('select, input:not([type="hidden"]), textarea, button, a');
                        if (t.length > 0) {
                            var e = t[0],
                                n = t[t.length - 1];
                            e.nextElement = n, e.first = !0, o(e, "keydown", a), n.nextElement = e, o(n, "keydown", a)
                        }
                    },
                    setFocus: function() {
                        var t = document.querySelector('[autofocus="autofocus"]');
                        t && t.focus()
                    }
                }, t.exports = c
            },
            959: (t, e, n) => {
                var i = n(554),
                    o = n(310),
                    a = n(521),
                    c = n(239),
                    r = n(268),
                    s = n(573),
                    u = function() {
                        this._active = null, this.pages = {}, this.defaultPage = null
                    };
                u.prototype = {
                    init: function(t) {
                        o(this.pages, (function(e, n) {
                            n.init.call(n, t)
                        })), this.loadPage = a(this.loadPage, this), this.unloadPage = a(this.unloadPage, this), i.supported ? (c(document, "page:change", this.loadPage), c(document, "page:before-unload", this.unloadPage)) : s(this.loadPage)
                    },
                    getPath: function() {
                        return window.location.pathname
                    },
                    getPageFromRoute: function() {
                        var t, e = this.getPath();
                        return o(this.pages, (function(n, i) {
                            new RegExp(n).test(e) && (t = i)
                        })), t
                    },
                    unloadPage: function() {
                        this._active && this._active.unload.call(this._active)
                    },
                    loadPage: function() {
                        this._active = this.getPageFromRoute();
                        var t = this._active;
                        t ? (t.load.call(t), t.setCircularTab(), t.setFocus()) : (this._active = this.defaultPage, this.defaultPage.load.call())
                    },
                    destroy: function() {
                        r(document, "page:change", this.loadPage), r(document, "page:before-unload", this.unloadPage), this._active = void 0, this.pages = void 0
                    }
                }, u.instance = new u, t.exports = u
            },
            554: t => {
                t.exports = window.Turbolinks
            },
            684: (t, e, n) => {
                var i = n(959).instance,
                    o = n(554);
                i.pages = {
                    "/auth/v2/login/one_time_password": n(659),
                    "/auth/v2/login/registration": n(547),
                    "/auth/v2/login/signed_in": n(480),
                    "/auth/v2/login/signin": n(558),
                    "/auth/v2/login/sso": n(597)
                }, i.defaultPage = n(853), t.exports = function(t) {
                    var e = t || {};
                    o.supported && o.enableProgressBar(), i.init(e)
                }
            },
            853: (t, e, n) => {
                var i = n(618),
                    o = n(239),
                    a = n(207),
                    c = n(749);
                t.exports = new i({
                    init: function() {},
                    unload: function() {},
                    load: function() {
                        var t = document.querySelector("input[type=submit]"),
                            e = document.querySelector("#show-password-toggle-button");
                        "loading" !== document.readyState ? (e && o(e, "click", a), t && o(t, "click", c)) : document.addEventListener("DOMContentLoaded", (function() {
                            e && o(e, "click", a), t && o(t, "click", c)
                        }))
                    }
                })
            },
            659: (t, e, n) => {
                var i = n(618);
                t.exports = new i({
                    init: function() {},
                    load: function() {
                        document.getElementById("password").focus()
                    },
                    unload: function() {}
                })
            },
            547: (t, e, n) => {
                var i = n(618),
                    o = n(239),
                    a = n(749);
                t.exports = new i({
                    init: function() {},
                    load: function() {
                        this.submitButton = document.querySelector("input[type=submit]"), this.submitButton && o(this.submitButton, "click", a)
                    }
                })
            },
            480: (t, e, n) => {
                var i = n(618);
                t.exports = new i({
                    init: function(t) {
                        this.options = t
                    },
                    load: function() {
                        var t = document.querySelector("#return_to").value;
                        window.location.href === t ? window.location.reload(!0) : t && (window.location.href = t)
                    }
                })
            },
            558: (t, e, n) => {
                var i = n(618),
                    o = n(521),
                    a = n(239),
                    c = n(268),
                    r = n(749),
                    s = null;
                t.exports = new i({
                    init: function() {
                        this.onCancelClick = o(this.onCancelClick, this), this.pageWithCancelOnKeyDown = o(this.pageWithCancelOnKeyDown, this)
                    },
                    load: function() {
                        if (this.cancelElement = document.querySelector("[data-close]"), this.cancelElement && (a(this.cancelElement, "click", this.onCancelClick), a(document, "keydown", this.pageWithCancelOnKeyDown)), this.staySignedInCheckBox = document.getElementById("remember_me"), this.staySignedInCheckBox && a(this.staySignedInCheckBox, "change", this.showStaySignedInNotification), a(document, "click", (function(t) {
                                t.target.classList.contains("disabled-click") && t.preventDefault()
                            })), s) {
                            var t = "".concat(s.parentElement.tagName, ".").concat(s.parentElement.classList[0], " ").concat(s.tagName, ".").concat(s.classList[0]),
                                e = document.querySelector(t);
                            setTimeout((function() {
                                e.focus()
                            }), 20)
                        }
                        this.submitButton = document.querySelector("#sign-in-submit-button"), this.submitButton && a(this.submitButton, "click", r)
                    },
                    onCancelClick: function(t) {
                        t.preventDefault(), this.closeOrRedirect()
                    },
                    disableLogin: function() {
                        document.querySelectorAll("#zendesk-js-login-external .service, .auth-actions").forEach((function(t) {
                            t.classList.add("disabled-click"), t.classList.add("is-disabled")
                        }))
                    },
                    unload: function() {
                        this.cancelElement && (c(this.cancelElement, "click", this.onCancelClick), c(document, "keydown", this.pageWithCancelOnKeyDown), this.cancelElement = void 0), s = document.activeElement
                    },
                    cancelElement: void 0,
                    closeOrRedirect: function() {
                        window.location.href = this.cancelElement.href
                    },
                    showStaySignedInNotification: function() {
                        var t = document.getElementById("remember_me"),
                            e = document.getElementById("remember_notification");
                        t.checked ? e.style.display = "block" : e.style.display = "none"
                    },
                    pageWithCancelOnKeyDown: function(t) {
                        "Escape" !== t.key && 27 !== t.keyCode || this.closeOrRedirect()
                    }
                })
            },
            597: (t, e, n) => {
                var i = n(618);
                t.exports = new i({
                    load: function() {
                        var t = document.querySelector("#sso_url");
                        if (t) {
                            var e = t.getAttribute("value");
                            window.location.href = e
                        }
                    }
                })
            }
        },
        n = {};
    t = function t(i) {
        var o = n[i];
        if (void 0 !== o) return o.exports;
        var a = n[i] = {
            exports: {}
        };
        return e[i](a, a.exports, t), a.exports
    }(684), window.App = t
})();