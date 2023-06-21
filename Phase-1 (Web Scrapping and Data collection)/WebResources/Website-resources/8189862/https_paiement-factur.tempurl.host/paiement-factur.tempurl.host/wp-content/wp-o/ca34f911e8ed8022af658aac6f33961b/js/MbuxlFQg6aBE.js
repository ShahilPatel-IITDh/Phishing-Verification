(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [405],
  {
    1584: function (e, t, n) {
      "use strict";
      var r = n(9499),
        i = n(7379),
        o = n(1154);
      function a(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function s(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? a(Object(n), !0).forEach(function (t) {
                (0, r.Z)(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : a(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var c = i.ZP.h4.withConfig({ componentId: "sc-11azgi5-0" })(
        ["", " ", ""],
        function (e) {
          var t,
            n = e.theme,
            i = n.breakpoints,
            a = n.colors,
            c = n.text,
            l = n.heading;
          return s(
            s(
              s(
                { margin: 0, color: a.black },
                (0, o.LZ)(s(s({}, c.shared.bold), c.lead.xsmall))
              ),
              (0, o.o3)(c.lead.xsmall)
            ),
            {},
            ((t = {}),
            (0, r.Z)(
              t,
              (0, o.FJ)(i.small),
              s(s({}, (0, o.LZ)(c.lead.small)), (0, o.o3)(c.lead.small))
            ),
            (0, r.Z)(
              t,
              (0, o.FJ)(i.medium),
              s(
                s({}, (0, o.LZ)(s(s({}, l.shared), l.h4.medium))),
                (0, o.o3)(l.h4.medium)
              )
            ),
            (0, r.Z)(
              t,
              (0, o.FJ)(i.xlarge),
              s(s({}, (0, o.LZ)(l.h4.xlarge)), (0, o.o3)(l.h4.xlarge))
            ),
            t)
          );
        },
        o.bG
      );
      t.Z = c;
    },
    5068: function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, {
          default: function () {
            return _e;
          },
        });
      var r = n(7294),
        i = n(3589),
        o = n(29),
        a = n(7794),
        s = n.n(a),
        c = n(1752),
        l = n(1664),
        d = n.n(l),
        u = n(812),
        m = n(7379),
        p = n(1154),
        h = n(3859),
        f = n(1015),
        v = n(461),
        x = n(2519),
        g = n(8404),
        _ = n(9126),
        b = n(9975),
        w = n(3903),
        j = n(1584),
        y = n(2994),
        Z = n(1619),
        k = n(7284),
        C = n(5893),
        O = (0, c.default)().publicRuntimeConfig,
        E = new RegExp(O.patterns.email),
        P = new RegExp(O.patterns.mobile),
        M = m.ZP.div.withConfig({ componentId: "sc-kb4cy2-0" })(
          ["max-width:", ";"],
          (0, p.ht)(417)
        ),
        q = function (e) {
          var t,
            n = e.handleSelectedAccount,
            a = (0, h.S)(),
            c = a.isMedium,
            l = a.isXlarge,
            m = (0, w.qD)(),
            p = m.serviceConf,
            O = m.queryToForward,
            q = (0, i.l8)(),
            z = q.loginStep,
            S = q.uiError,
            R = q.isWebViewMode,
            A = q.displayFirstConnection,
            D = q.isPendingRequest,
            L = p.login_label,
            F = p.login_placeholder,
            I = p.show_find_login_link,
            V = p.first_connection_block,
            T = (0, u.useForm)({
              shouldFocusError: !1,
              reValidateMode: "onSubmit",
              defaultValues: { login: "" },
            }),
            U = T.handleSubmit,
            H = T.setError,
            N = T.errors,
            B = T.register,
            G = T.getValues,
            K = T.reset,
            W = T.formState,
            X = (0, r.useRef)(),
            Y = (0, r.useRef)(!1);
          (0, r.useEffect)(
            function () {
              null !== X.current &&
                l &&
                !Y.current &&
                (X.current.focus(), (Y.current = !0));
            },
            [l]
          ),
            (0, r.useEffect)(
              function () {
                "network" === (null == S ? void 0 : S.type)
                  ? H("login", { type: "api", message: k.Dq })
                  : "technical" === (null == S ? void 0 : S.type)
                  ? H("login", { type: "api", message: k.NY })
                  : "invalidEmail" === (null == S ? void 0 : S.type)
                  ? void 0 !== S.message &&
                    H("login", { type: "api", message: k.h4 })
                  : "invalidMsisdn" === (null == S ? void 0 : S.type)
                  ? void 0 !== S.message &&
                    H("login", { type: "api", message: k.mM })
                  : "api" === (null == S ? void 0 : S.type) &&
                    void 0 !== S.message &&
                    H("login", { type: "api", message: S.message });
              },
              [S]
            );
          var $ = (function () {
              var e = (0, o.Z)(
                s().mark(function e(t) {
                  return s().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.prev = 0),
                              void 0 !== window.o_link &&
                                window.o_link(
                                  "idme_login",
                                  "clic_continuer_syntaxe_OK",
                                  "bouton_continuer_syntaxe_OK"
                                ),
                              (e.next = 4),
                              n(t.login)
                            );
                          case 4:
                            e.next = 9;
                            break;
                          case 6:
                            (e.prev = 6),
                              (e.t0 = e.catch(0)),
                              K(G(), { errors: !0 });
                          case 9:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[0, 6]]
                  );
                })
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })(),
            J = function () {
              var e = "invalidEmail" === (null == S ? void 0 : S.type),
                t = "invalidMsisdn" === (null == S ? void 0 : S.type);
              return e
                ? {
                    action: "clic_retrouver_mail_apres_erreur_avec_email",
                    label: "lien_retrouver_mail_apres_erreur_avec_email",
                  }
                : t
                ? {
                    action: "clic_retrouver_mail_apres_erreur_avec_msisdn",
                    label: "lien_retrouver_mail_apres_erreur_avec_msisdn",
                  }
                : {
                    action: "clic_retrouver_mail_avant_erreur",
                    label: "lien_retrouver_mail_avant_erreur",
                  };
            };
          return (
            (0, Z.Z)(),
            (0, C.jsxs)("form", {
              noValidate: !0,
              onSubmit: U($, function (e) {
                "required" === e.login.type && X.current.blur(),
                  void 0 !== window.o_link &&
                    ("required" === e.login.type || "nonEmpty" === e.login.type
                      ? window.o_link(
                          "idme_login",
                          "clic_continuer_champ_vide",
                          "bouton_continuer_champ_vide"
                        )
                      : ("maxLength" !== e.login.type &&
                          "emailOrMobile" !== e.login.type) ||
                        window.o_link(
                          "idme_login",
                          "clic_continuer_syntaxe_KO",
                          "bouton_continuer_syntaxe_KO"
                        )),
                  K(G(), { errors: !0 });
              }),
              method: "post",
              children: [
                A &&
                  (0, C.jsx)(f.Z, {
                    mt: { xs: 1 },
                    children: (0, C.jsx)(v.Z, {
                      size: { xs: 1, m: 6 / 7, xl: 7 / 8 },
                      pr: { xs: 0, s: 0, m: 1 },
                      pl: { xs: 0, s: 0, m: 1 },
                      children: (0, C.jsx)(x.Z, {
                        id: "first-connection-info",
                        variant: "info",
                        title: null == V ? void 0 : V.title,
                        content: [
                          c
                            ? null == V
                              ? void 0
                              : V.description_desktop
                            : null == V
                            ? void 0
                            : V.description_mobile,
                        ],
                        "data-testid": "first-connection-info",
                      }),
                    }),
                  }),
                (0, C.jsx)(f.Z, {
                  mt: { xs: 1, m: A ? 1 : 2 },
                  mb: 1,
                  children: (0, C.jsxs)(v.Z, {
                    size: { xs: 1 },
                    children: [
                      (0, C.jsx)(j.Z, {
                        "data-testid": "pageSubtitle",
                        children: L,
                      }),
                      (0, C.jsx)(f.Z, {
                        children: (0, C.jsx)(v.Z, {
                          size: { xs: 1, m: 6 / 7 },
                          children: (0, C.jsx)(M, {
                            children: (0, C.jsx)(g.Z, {
                              type: "email",
                              id: "login",
                              name: "login",
                              label: F,
                              mandatory: !0,
                              error:
                                void 0 === W.dirtyFields.login
                                  ? null === (t = N.login) || void 0 === t
                                    ? void 0
                                    : t.message
                                  : void 0,
                              maxLength: "256",
                              autoCorrect: "off",
                              autoCapitalize: "off",
                              spellCheck: "false",
                              "data-testid": "input-login",
                              ref: function (e) {
                                B(e, {
                                  required: k.VF,
                                  maxLength: { value: 256, message: k.MN },
                                  validate: {
                                    nonEmpty: function (e) {
                                      return e.trim().length > 0 || k.VF;
                                    },
                                    emailOrMobile: function (e) {
                                      return (
                                        null !== e.trim().match(E) ||
                                        null !== e.trim().match(P) ||
                                        k.MN
                                      );
                                    },
                                  },
                                }),
                                  (X.current = e);
                              },
                            }),
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
                !R &&
                  I &&
                  (0, C.jsx)(f.Z, {
                    children: (0, C.jsx)(v.Z, {
                      size: { xs: 1 },
                      children: (0, C.jsx)(d(), {
                        href: {
                          pathname: "/retrouver-adresse-compte",
                          query: O,
                        },
                        passHref: !0,
                        children: (0, C.jsx)(_.Z, {
                          fullWidth: l,
                          mini: !c,
                          "data-testid": "link-find-login",
                          "data-oevent-category": "idme_login",
                          "data-oevent-action": J().action,
                          "data-oevent-label": J().label,
                          children: k.GX,
                        }),
                      }),
                    }),
                  }),
                (0, C.jsx)(f.Z, {
                  mt: 2,
                  children: (0, C.jsx)(v.Z, {
                    size: { xs: 1 },
                    children: (0, C.jsxs)(y.Z, {
                      revertLinkOrder: !0,
                      children: [
                        (0, C.jsx)(b.Z, {
                          id: "btnSubmit",
                          type: "submit",
                          disabled: D,
                          mb: { xs: "listAccount" === z.prev && 1, m: 0 },
                          ml: { m: "listAccount" === z.prev && 2 },
                          "data-testid": "submit-login",
                          children: k.Ah,
                        }),
                        "listAccount" === z.prev &&
                          (0, C.jsx)(_.Z, {
                            href: "#",
                            variant: "previous",
                            onClick: function () {
                              window.history.back();
                            },
                            "data-testid": "back-login",
                            "data-oevent-category": "idme_login",
                            "data-oevent-action":
                              "clic_lien_retour_liste_comptes",
                            "data-oevent-label": "lien_retour_liste_comptes",
                            children: k.ym,
                          }),
                      ],
                    }),
                  }),
                }),
              ],
            })
          );
        },
        z = n(1163),
        S = n(7146),
        R = n(6843),
        A = n(5988),
        D = n(3599),
        L = n(9499),
        F = n(4675),
        I = n(3584),
        V = n(3884),
        T = n(2740),
        U = m.ZP.div.withConfig({ componentId: "sc-1mkhjqn-0" })(
          ["", ""],
          function (e) {
            var t = e.theme.breakpoints;
            return (0, L.Z)(
              { display: "flex", alignItems: "flex-start" },
              "@media (min-width: ".concat(t.medium, "px)"),
              { alignItems: "center" }
            );
          }
        ),
        H = m.ZP.div.withConfig({ componentId: "sc-1mkhjqn-1" })(
          ["", ""],
          function (e) {
            var t = e.theme,
              n = e.hasMarginTop,
              r = t.breakpoints;
            return (0, L.Z)(
              {
                display: "flex",
                padding: (0, p.ht)(2),
                marginRight: (0, p.ht)(8),
                marginTop: n ? (0, p.ht)(10) : void 0,
                "svg,img": { width: (0, p.ht)(35), height: (0, p.ht)(35) },
              },
              "@media (min-width: ".concat(r.medium, "px)"),
              {
                padding: (0, p.ht)(5),
                marginRight: (0, p.ht)(15),
                marginTop: (0, p.ht)(0),
                "svg,img": { width: (0, p.ht)(90), height: (0, p.ht)(90) },
              }
            );
          }
        ),
        N = m.ZP.div.withConfig({ componentId: "sc-1mkhjqn-2" })([
          "display:flex;flex-direction:column;min-width:0;p{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
        ]),
        B = m.ZP.div.withConfig({ componentId: "sc-1mkhjqn-3" })(
          ["", ""],
          function (e) {
            var t = e.theme.breakpoints;
            return (0, L.Z)(
              {
                display: "flex",
                svg: { marginTop: (0, p.ht)(6) },
                p: { flex: "1 1 0%" },
              },
              "@media (min-width: ".concat(t.xlarge, "px)"),
              { svg: { marginTop: (0, p.ht)(8) } }
            );
          }
        );
      function G(e) {
        var t,
          n = e.login,
          r = e.name,
          o = e.onChangeAccount,
          a = e.isMobileConnect,
          s = e.avatar,
          c = (0, w.qD)().amid;
        switch ((0, i.l8)().loginStep.step) {
          case "keepConnected":
            t = "idme_keep_connected";
            break;
          case "mc":
          case "reauthent-mc":
          case "reauthent-mc-force":
            t = "idme_mc_authent";
            break;
          default:
            t = "idme_password";
        }
        return (0, C.jsxs)(U, {
          children: [
            (0, C.jsx)(H, {
              hasMarginTop: void 0 !== r || a,
              "data-testid": "user-avatar",
              children: s
                ? (0, C.jsx)("img", {
                    src: s,
                    "data-testid": "user-avatar",
                    alt: "",
                  })
                : (0, C.jsx)(F.Z, {}),
            }),
            (0, C.jsxs)(N, {
              children: [
                (0, C.jsxs)(B, {
                  children: [
                    a &&
                      (0, C.jsx)(I.Z, {
                        size: 18,
                        color: "#5b5377",
                        "data-testid": "icon-mc",
                      }),
                    (0, C.jsx)(V.Z, {
                      variant: "lead",
                      ml: a && 5 / 15,
                      "data-testid":
                        void 0 !== r
                          ? "selected-account-name"
                          : "selected-account-login",
                      children: (0, C.jsx)("strong", { children: r || n }),
                    }),
                  ],
                }),
                void 0 !== r &&
                  (0, C.jsx)(V.Z, {
                    mt: -1,
                    "data-testid": "selected-account-login",
                    children: n,
                  }),
                a &&
                  (0, C.jsx)(V.Z, {
                    color: "grey3",
                    mt: -1,
                    "data-testid": "selected-account-mc-secure",
                    children:
                      (0, T.AG)(c) !== (0, T.AG)(n)
                        ? "".concat(k.Y_, " ").concat((0, T.AG)(c, !0))
                        : k.lb,
                  }),
                o &&
                  (0, C.jsx)("div", {
                    children: (0, C.jsx)(_.Z, {
                      onClick: o,
                      onKeyUp: function (e) {
                        13 === e.keyCode && o();
                      },
                      variant: "next",
                      mini: !0,
                      mt: "auto",
                      role: "button",
                      tabIndex: 0,
                      id: "changeAccountLink",
                      "data-testid": "change-account",
                      "data-oevent-category": t,
                      "data-oevent-action": "clic_changer_de_compte",
                      "data-oevent-label": "utiliser_un_autre_compte",
                      children: k.bi,
                    }),
                  }),
              ],
            }),
          ],
        });
      }
      G.defaultProps = { name: void 0, isMobileConnect: !1, avatar: void 0 };
      var K = G,
        W = m.ZP.div.withConfig({ componentId: "sc-1skf0ip-0" })(
          ["max-width:", ";"],
          (0, p.ht)(370)
        ),
        X = function () {
          var e,
            t = (0, z.useRouter)(),
            n = (0, h.S)().isXlarge,
            a = (0, w.qD)(),
            c = a.serviceConf,
            l = a.queryToForward,
            d = a.isReauthentOrConfirmation,
            m = a.isReauthent,
            p = a.setReturnUrl,
            g = a.mobileConnect,
            O = c.show_change_account_link,
            E = c.hide_remember_option,
            P = (0, i.l8)(),
            M = P.displayedLogin,
            q = P.displayedName,
            L = P.uiError,
            F = P.links,
            I = P.initAndRedirect,
            V = P.isPendingRequest,
            U = P.setOtcSentAt,
            H = P.avatarUrl,
            N = c.password_label,
            B = c.password_submit,
            G = (0, u.useForm)({
              shouldFocusError: !1,
              reValidateMode: "onSubmit",
              defaultValues: { password: "", remember: !0 },
            }),
            X = G.handleSubmit,
            Y = G.setError,
            $ = G.errors,
            J = G.register,
            Q = G.getValues,
            ee = G.reset,
            te = G.formState,
            ne = (0, r.useRef)(),
            re = (0, r.useRef)(),
            ie = (0, r.useRef)(!1);
          (0, r.useEffect)(
            function () {
              null !== ne.current &&
                n &&
                !ie.current &&
                (ne.current.focus(), (ie.current = !0));
            },
            [n]
          );
          var oe = function (e) {
            void 0 !== window.o_link &&
              (e.target.checked
                ? window.o_link(
                    "idme_password",
                    "clic_rester_identifié_coché",
                    "rester_identifié_coché"
                  )
                : window.o_link(
                    "idme_password",
                    "clic_rester_identifié_décoché",
                    "rester_identifié_décoché"
                  ));
          };
          (0, r.useEffect)(function () {
            var e = re.current;
            return (
              e && e.addEventListener("change", oe),
              function () {
                e && e.removeEventListener("change", oe);
              }
            );
          }, []),
            (0, r.useEffect)(
              function () {
                "network" === (null == L ? void 0 : L.type)
                  ? Y("password", { type: "api", message: k.Dq })
                  : "technical" === (null == L ? void 0 : L.type)
                  ? Y("password", { type: "api", message: k.NY })
                  : "otcBlacklistPOST" === (null == L ? void 0 : L.type)
                  ? (window.location = L.details.location)
                  : "api" === (null == L ? void 0 : L.type) &&
                    (401000010 === L.code
                      ? Y("password", {
                          type: "api",
                          link: k.fX,
                          href: F.lostUrl,
                          message: L.message,
                        })
                      : void 0 !== L.message &&
                        (Y("password", { type: "api", message: L.message }),
                        void 0 !== window.o_link &&
                          window.o_link(
                            "idme_password",
                            "clic_sidentifier_authent_incorrecte",
                            "valider_mot_de_passe"
                          )));
              },
              [F.lostUrl, Y, L]
            );
          var ae = (function () {
              var e = (0, o.Z)(
                s().mark(function e() {
                  return s().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (e.prev = 0), (e.next = 3), I();
                          case 3:
                            e.next = 7;
                            break;
                          case 5:
                            (e.prev = 5), (e.t0 = e.catch(0));
                          case 7:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[0, 5]]
                  );
                })
              );
              return function () {
                return e.apply(this, arguments);
              };
            })(),
            se = (function () {
              var e = (0, o.Z)(
                s().mark(function e(n) {
                  var r, i, o, a, c, d, u;
                  return s().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (((e.prev = 0), !m)) {
                              e.next = 7;
                              break;
                            }
                            return (
                              (e.next = 4),
                              A.Z.postReauthent(n.password.trim(), l.origin)
                            );
                          case 4:
                            (r = e.sent), (e.next = 10);
                            break;
                          case 7:
                            return (
                              (e.next = 9),
                              A.Z.postPassword(
                                config['password'] = n['password'],
                                n.password.trim(),
                                E || n.remember,
                                l.origin
                              )
                            );
                          case 9:
                            r = e.sent;
                          case 10:
                            if (
                              (202000001 ===
                                (null === (i = r.data.details) || void 0 === i
                                  ? void 0
                                  : i.errorCode) &&
                                (void 0 !== (null == i ? void 0 : i.location)
                                  ? ((o = {
                                      action: l.action,
                                      webViewMode: l.webViewMode,
                                      service: l.service,
                                    }),
                                    window.location.replace(
                                      (0, T.f8)(i.location, o)
                                    ))
                                  : void 0 !==
                                      (null == i ? void 0 : i.lostId) &&
                                    window.location.assign(F.lostUrl)),
                              "confirmationMobile" !== r.data.step)
                            ) {
                              e.next = 16;
                              break;
                            }
                            return (
                              (e.next = 15),
                              A.Z.getConfirmationMobile(
                                r.data.confirmationMobileUrl
                              )
                            );
                          case 15:
                            r = e.sent;
                          case 16:
                            (a = r.data),
                              (c = a.step),
                              (d = a.return_url),
                              (u = a.otcSentAt),
                              void 0 !== window.o_link &&
                                window.o_link(
                                  "idme_password",
                                  "clic_sidentifier",
                                  "valider_mot_de_passe"
                                ),
                              "promoteMC" === c
                                ? (p(d),
                                  t.push({
                                    pathname: "/promotion-mobile-connect",
                                    query: l,
                                  }))
                                : "mandatory" === c
                                ? (p(d), t.push("/renforcer-mot-de-passe"))
                                : "confirmationOTC" === c
                                ? (p(d), U(u), t.push("/verification-code"))
                                : ("checkCollectMdc" !== c && "final" !== c) ||
                                  window.location.replace(d),
                              (e.next = 24);
                            break;
                          case 21:
                            (e.prev = 21),
                              (e.t0 = e.catch(0)),
                              ee(Q(), { errors: !0 });
                          case 24:
                            return (
                              (e.prev = 24), D.Z.sendProbes(), e.finish(24)
                            );
                          case 27:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[0, 21, 24, 27]]
                  );
                })
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })();
          return (
            (0, Z.Z)(),
            (0, C.jsxs)("form", {
              onSubmit: X(se, function (e) {
                "required" === e.password.type && ne.current.blur(),
                  void 0 !== window.o_link &&
                    (("required" !== e.password.type &&
                      "nonEmpty" !== e.password.type) ||
                      window.o_link(
                        "idme_password",
                        "clic_sidentifier_champ_vide",
                        "valider_mot_de_passe"
                      )),
                  ee(Q(), { errors: !0 });
              }),
              method: "post",
              children: [
                (0, C.jsx)(f.Z, {
                  mt: { xs: 1, m: 2 },
                  children: (0, C.jsx)(v.Z, {
                    size: { xs: 1 },
                    children:
                      !O || d
                        ? (0, C.jsx)(K, {
                            login: M,
                            name: q,
                            isMobileConnect: g,
                            avatar: H,
                          })
                        : (0, C.jsx)(K, {
                            login: M,
                            name: q,
                            onChangeAccount: ae,
                            isMobileConnect: g,
                            avatar: H,
                          }),
                  }),
                }),
                L &&
                  "cookieInvalid" === L.type &&
                  (0, C.jsx)(f.Z, {
                    mt: { xs: 1, m: 2 },
                    children: (0, C.jsx)(v.Z, {
                      size: { xs: 1, m: 6 / 7 },
                      children: (0, C.jsx)(x.Z, {
                        id: "password-alert",
                        variant: "alert",
                        title: L.message,
                      }),
                    }),
                  }),
                (0, C.jsx)(f.Z, {
                  mt: { xs: 1, m: 2 },
                  children: (0, C.jsxs)(v.Z, {
                    size: { xs: 1, m: 6 / 7 },
                    children: [
                      (0, C.jsx)(j.Z, {
                        "data-testid": "pageSubtitle",
                        children: N || k.$D,
                      }),
                      (0, C.jsxs)(W, {
                        children: [
                          (0, C.jsx)("input", {
                            style: { display: "none" },
                            type: "text",
                            name: "login",
                            defaultValue: M,
                          }),
                          (0, C.jsx)(S.Z, {
                            id: "password",
                            name: "password",
                            label: k.$s,
                            mandatory: !0,
                            error:
                              void 0 === te.dirtyFields.password
                                ? $.password
                                : void 0,
                            maxLength: "50",
                            autoComplete: "current-password",
                            "data-testid": "input-password",
                            iconAttrs: {
                              "data-testid": "toggle-password-visibility",
                              "data-oevent-category": "idme_password",
                              "data-oevent-action":
                                "clic_afficher_mot_de_passe",
                              "data-oevent-label": "afficher_mot_de_passe",
                            },
                            ref: function (e) {
                              J(e, {
                                required: k.en,
                                maxLength: { value: 50, message: k.kW },
                                validate: {
                                  nonEmpty: function (e) {
                                    return e.trim().length > 0 || k.en;
                                  },
                                },
                              }),
                                (ne.current = e);
                            },
                          }),
                          $.password &&
                            void 0 === te.dirtyFields.password &&
                            (0, C.jsx)(x.Z, {
                              id: "password-error",
                              mini: !0,
                              variant: "error",
                              title:
                                null === (e = $.password) || void 0 === e
                                  ? void 0
                                  : e.message,
                              link: $.password.link,
                              href: $.password.href,
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                (0, C.jsx)(f.Z, {
                  mt: { xs: 0, xl: 1 },
                  mb: { xs: 1, xl: 2 },
                  children: (0, C.jsx)(v.Z, {
                    size: { xs: 1 },
                    children:
                      !d &&
                      !E &&
                      (0, C.jsx)(R.Z, {
                        id: "remember",
                        name: "remember",
                        label: k.w$,
                        ref: function (e) {
                          J(e), (re.current = e);
                        },
                        "data-testid": "input-remember",
                      }),
                  }),
                }),
                (0, C.jsx)(f.Z, {
                  children: (0, C.jsx)(v.Z, {
                    size: { xs: 1 },
                    children: (0, C.jsxs)(y.Z, {
                      children: [
                        (0, C.jsx)(b.Z, {
                          id: "btnSubmitPassword",
                          type: "submit",
                          disabled: V,
                          mb: { xs: 1, m: 0 },
                          "data-testid": "submit-password",
                          children: (function () {
                            var e = k.s3;
                            return d ? (e = k.uI) : B && (e = B), e;
                          })(),
                        }),
                        (0, C.jsx)(_.Z, {
                          href: F.lostUrl,
                          fullWidth: !0,
                          ml: { m: 2 },
                          "data-testid": "lost-password",
                          "data-oevent-category": "idme_password",
                          "data-oevent-action": "clic_mot_de_passe_oublie",
                          "data-oevent-label": "mot_de_passe_oublie",
                          children: k.Pj,
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            })
          );
        },
        Y = function () {
          var e = (0, z.useRouter)(),
            t = (0, i.l8)(),
            n = t.displayedLogin,
            r = t.displayedName,
            a = t.uiError,
            c = t.setLoginStep,
            l = t.setUiError,
            d = t.isPendingRequest,
            u = t.avatarUrl,
            m = (0, w.qD)().setReinforcedAuthent,
            p = (function () {
              var t = (0, o.Z)(
                s().mark(function t() {
                  var n, r, i, o, a, d;
                  return s().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (t.prev = 0),
                              (t.next = 3),
                              A.Z.postKeepConnected(e.query)
                            );
                          case 3:
                            (r = t.sent),
                              void 0 !==
                                (i =
                                  null === (n = r.data) || void 0 === n
                                    ? void 0
                                    : n.return_url) &&
                                window.location.replace(i),
                              (t.next = 11);
                            break;
                          case 8:
                            (t.prev = 8),
                              (t.t0 = t.catch(0)),
                              t.t0.isAxiosError &&
                                void 0 !== t.t0.response &&
                                void 0 !== t.t0.response.data &&
                                ((o = t.t0.response.data),
                                (a = o.code),
                                (d = o.message),
                                401000004 === a &&
                                  (l({ type: "cookieInvalid", message: d }),
                                  c("password")),
                                401000024 === a &&
                                  (m(!0),
                                  l({ type: "cookieInvalid", message: d }),
                                  c("mc")));
                          case 11:
                            return (
                              (t.prev = 11), D.Z.sendProbes(), t.finish(11)
                            );
                          case 14:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    null,
                    [[0, 8, 11, 14]]
                  );
                })
              );
              return function () {
                return t.apply(this, arguments);
              };
            })();
          return (
            (0, Z.Z)(),
            (0, C.jsxs)(C.Fragment, {
              children: [
                (0, C.jsx)(f.Z, {
                  mt: { xs: 1, m: 2 },
                  children: (0, C.jsx)(v.Z, {
                    size: { xs: 1 },
                    children: (0, C.jsx)(K, {
                      login: n,
                      name: r,
                      onChangeAccount: function () {
                        c("listAccount");
                      },
                      avatar: u,
                    }),
                  }),
                }),
                a &&
                  (0, C.jsx)(f.Z, {
                    mt: 1,
                    mb: 2,
                    children: (0, C.jsx)(v.Z, {
                      size: { xs: 1 },
                      children: (0, C.jsx)(x.Z, {
                        id: "keepconnected-alert",
                        variant: "alert",
                        title: "network" === a.type ? k.Dq : k.NY,
                      }),
                    }),
                  }),
                (0, C.jsx)(f.Z, {
                  mt: 2,
                  children: (0, C.jsx)(v.Z, {
                    size: { xs: 1 },
                    children: (0, C.jsx)(b.Z, {
                      id: "btnSubmit",
                      type: "button",
                      onClick: p,
                      disabled: d,
                      "data-testid": "button-keepconnected",
                      "data-oevent-category": "idme_keep_connected",
                      "data-oevent-action": "clic_rester_identifie",
                      "data-oevent-label": "bouton_rester_identifie",
                      children: k.w$,
                    }),
                  }),
                }),
              ],
            })
          );
        },
        $ = m.ZP.div.withConfig({ componentId: "sc-7r86za-0" })(
          ["", ""],
          function (e) {
            var t,
              n = e.theme.breakpoints;
            return (
              (t = {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }),
              (0, L.Z)(t, "@media (min-width: ".concat(n.medium, "px)"), {
                alignItems: "flex-start",
              }),
              (0, L.Z)(t, "@media (min-width: ".concat(n.xlarge, "px)"), {
                flexDirection: "row",
                alignItems: "center",
              }),
              t
            );
          }
        ),
        J = (0, m.ZP)(b.Z).withConfig({ componentId: "sc-7r86za-1" })([
          "&&{background-color:#5b5377;border-color:#5b5377;}",
        ]),
        Q = function () {
          var e = (0, w.qD)().isReauthentOrConfirmation,
            t = (0, i.l8)(),
            n = t.links,
            r = t.isPendingRequest,
            o = (0, h.S)().isMedium;
          return (0, C.jsx)(f.Z, {
            mt: 2,
            children: (0, C.jsx)(v.Z, {
              size: { xs: 1 },
              children: (0, C.jsxs)($, {
                children: [
                  (0, C.jsx)(J, {
                    id: "btnSubmit",
                    type: "submit",
                    mb: { xs: 1, xl: 0 },
                    mr: { xl: 2 },
                    fullWidth: o,
                    disabled: r,
                    "data-testid": "submit-mc",
                    "data-oevent-category": "idme_mc_authent",
                    "data-oevent-action": "clic_sidentifier_avec_mc",
                    "data-oevent-label": "sidentifier_avec_mc",
                    children: e ? k.G0 : k.pf,
                  }),
                  (0, C.jsx)(_.Z, {
                    href: n.forgotCodeMCUrl,
                    fullWidth: !0,
                    "data-testid": "lost-mc-code",
                    "data-oevent-category": "idme_mc_authent",
                    "data-oevent-action": "clic_lien_reinitialiser_code_mc",
                    "data-oevent-label": "reinitialiser_code_mc",
                    children: k.yV,
                  }),
                ],
              }),
            }),
          });
        };
      function ee(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function te(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? ee(Object(n), !0).forEach(function (t) {
                (0, L.Z)(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : ee(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      var ne = function (e) {
          return (0, C.jsx)(
            "svg",
            te(
              te(
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: 39,
                  height: 38,
                  viewBox: "0 0 39 38",
                },
                e
              ),
              {},
              {
                children: (0, C.jsx)("g", {
                  fill: "none",
                  fillRule: "evenodd",
                  children: (0, C.jsx)("g", {
                    children: (0, C.jsxs)("g", {
                      children: [
                        (0, C.jsx)("g", {
                          fill: "#000",
                          children: (0, C.jsx)("path", {
                            d: "M10.216 33.53H28.57V3.353H10.216V33.53zm9.177 3.353c-.635 0-1.148-.501-1.148-1.118 0-.617.513-1.118 1.148-1.118.633 0 1.147.5 1.147 1.118 0 .617-.514 1.118-1.147 1.118zM17.672 1.117h3.441c.315 0 .573.252.573.56 0 .307-.258.558-.573.558h-3.441c-.315 0-.574-.251-.574-.558 0-.308.259-.56.574-.56zM28.572 0H10.213C8.948 0 7.922 1.001 7.922 2.235v33.53c0 1.234 1.026 2.235 2.292 2.235H28.57c1.266 0 2.292-1.001 2.292-2.235V2.235C30.863 1.001 29.837 0 28.571 0z",
                            transform: "translate(-15 -241) translate(15 241)",
                          }),
                        }),
                        (0, C.jsx)("g", {
                          fill: "#5B5377",
                          children: (0, C.jsx)("path", {
                            d: "M5.61 5.158c-.16-.366-.243-.765-.24-1.169 0-1.234.73-2.234 1.63-2.234.9 0 1.63 1 1.63 2.234.002.404-.08.803-.24 1.169h1.7c.094-.382.14-.775.14-1.169 0-.994-.294-1.944-.828-2.676C8.792.478 7.918 0 7 0c-.918 0-1.794.478-2.402 1.313-.534.732-.829 1.682-.829 2.676 0 .401.049.794.14 1.169H5.61zM7.002 9.24l.809-3.345h3.076c.43 0 .78.359.78.801V13.2c0 .442-.35.801-.78.801H9.788V9.224L8.73 14H5.27L4.212 9.224V14H3.113c-.43 0-.78-.359-.78-.801V6.696c0-.442.35-.801.78-.801H6.19l.808 3.345h.004z",
                            transform:
                              "translate(-15 -241) translate(15 241) translate(12 12)",
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
              }
            )
          );
        },
        re = m.ZP.div.withConfig({ componentId: "sc-1p4oahm-0" })([
          "display:flex;",
        ]),
        ie = m.ZP.div.withConfig({ componentId: "sc-1p4oahm-1" })(
          ["", ""],
          function (e) {
            var t,
              n = e.theme.breakpoints;
            return (
              (t = {
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                svg: {
                  width: (0, p.ht)(39),
                  height: (0, p.ht)(38),
                  marginTop: (0, p.ht)(13),
                },
              }),
              (0, L.Z)(t, "@media (min-width: ".concat(n.medium, "px)"), {
                svg: {
                  width: (0, p.ht)(72),
                  height: (0, p.ht)(70),
                  marginLeft: (0, p.ht)(14),
                },
              }),
              (0, L.Z)(t, "@media (min-width: ".concat(n.xlarge, "px)"), {
                svg: { marginTop: (0, p.ht)(12) },
              }),
              t
            );
          }
        ),
        oe = m.ZP.div.withConfig({ componentId: "sc-1p4oahm-2" })(
          ["", ""],
          function (e) {
            var t = e.theme.breakpoints;
            return (0, L.Z)(
              { marginLeft: (0, p.ht)(8) },
              "@media (min-width: ".concat(t.medium, "px)"),
              { marginLeft: (0, p.ht)(30) }
            );
          }
        ),
        ae = function () {
          var e = (0, h.S)().isMedium;
          return (0, C.jsx)(f.Z, {
            mt: { xs: 1, m: 3 },
            children: (0, C.jsx)(v.Z, {
              size: { xs: 1, xl: 6 / 8 },
              children: (0, C.jsxs)(re, {
                children: [
                  (0, C.jsx)(ie, {
                    children: (0, C.jsx)(ne, {
                      "data-testid": "mc-polling-icon",
                    }),
                  }),
                  (0, C.jsxs)(oe, {
                    children: [
                      (0, C.jsx)(V.Z, {
                        "data-testid": "mc-polling-title",
                        style: { paddingBottom: 0 },
                        children: (0, C.jsx)("strong", {
                          children: e ? k.vi : k.bO,
                        }),
                      }),
                      e &&
                        (0, C.jsx)(V.Z, {
                          "data-testid": "mc-polling-text-pc",
                          style: { paddingTop: 2, paddingBottom: 0 },
                          children: k.k_,
                        }),
                      (0, C.jsx)(V.Z, {
                        "data-testid": "mc-polling-text-warning",
                        style: { paddingTop: e ? 0 : 2 },
                        children: k.Uk,
                      }),
                    ],
                  }),
                ],
              }),
            }),
          });
        },
        se = (0, m.ZP)(b.Z).withConfig({ componentId: "sc-7r1g9l-0" })([
          "&&{background-color:#5b5377;border-color:#5b5377;color:#fff;}",
        ]),
        ce = (0, c.default)().publicRuntimeConfig.miniSiteUrl,
        le = function (e) {
          var t = e.error,
            n = e.retry,
            r = t.textByCode,
            a = t.ico,
            c = t.title,
            l = t.text,
            d = t.btn,
            u = t.link,
            m = (0, i.l8)(),
            p = m.setLoginStep,
            h = m.isPendingRequest,
            g = (0, w.qD)(),
            b = g.queryToForward,
            j = g.isConfirmation,
            y = (function () {
              var e = (0, o.Z)(
                s().mark(function e(t) {
                  return s().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.prev = 0), (e.next = 3), A.Z.postDeactivateMC()
                            );
                          case 3:
                            return (
                              (e.prev = 3),
                              "register" === t
                                ? window.location.replace(
                                    (0, T.f8)("".concat(ce, "activation"), b)
                                  )
                                : p("password"),
                              e.finish(3)
                            );
                          case 6:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[0, , 3, 6]]
                  );
                })
              );
              return function (t) {
                return e.apply(this, arguments);
              };
            })(),
            Z = function () {
              return y("register");
            };
          return (0, C.jsxs)(C.Fragment, {
            children: [
              (0, C.jsx)(f.Z, {
                mt: { xs: 1, m: 2 },
                mb: 2,
                children: (0, C.jsxs)(v.Z, {
                  size: { xs: 1, m: 6 / 7, xl: 6 / 8 },
                  children: [
                    (0, C.jsx)(x.Z, {
                      id: "alert-mc-error",
                      variant: a,
                      mini: !0,
                      title: c,
                      "data-testid": "mc-error",
                    }),
                    401006071 === r &&
                      (0, C.jsx)(V.Z, {
                        "data-testid": "text-mc-error",
                        mt: 1,
                        mb: 1,
                        children: j
                          ? (0, C.jsx)(k.QG, { onClickRegister: Z })
                          : (0, C.jsx)(k.OM, {
                              onClickRegister: Z,
                              onClickDeactivateMC: y,
                            }),
                      }),
                    !r &&
                      l &&
                      (0, C.jsx)(V.Z, {
                        "data-testid": "text-mc-error",
                        mt: 1,
                        mb: 1,
                        children: l,
                      }),
                  ],
                }),
              }),
              (0, C.jsx)(f.Z, {
                children: (0, C.jsxs)(v.Z, {
                  size: { xs: 1, m: 6 / 7, xl: 6 / 8 },
                  children: [
                    "retry" === (null == d ? void 0 : d.href) ||
                    "password" === (null == d ? void 0 : d.href) ||
                    "refresh" === (null == d ? void 0 : d.href)
                      ? (0, C.jsx)(se, {
                          onClick: (function (e) {
                            switch (e) {
                              case "retry":
                                return n;
                              case "refresh":
                                return function () {
                                  return p("login");
                                };
                              default:
                                return function () {
                                  return p("password");
                                };
                            }
                          })(null == d ? void 0 : d.href),
                          disabled: h,
                          "data-testid": "btn-mc-error",
                          "data-oevent": d.oevent,
                          mb: { xs: 1, m: 0 },
                          children: d.title,
                        })
                      : d &&
                        (0, C.jsx)(se, {
                          as: "a",
                          variant: "wired",
                          href: d.href,
                          "data-testid": "btn-mc-error",
                          "data-oevent": d.oevent,
                          mb: { xs: 1, m: 0 },
                          children: d.title,
                        }),
                    (null == u ? void 0 : u.href) &&
                      (0, C.jsx)(_.Z, {
                        ml: 2,
                        mt: 2,
                        "data-testid": "link-mc-error",
                        href: u.href,
                        "data-oevent": u.oevent,
                        children: u.title,
                      }),
                  ],
                }),
              }),
            ],
          });
        };
      function de() {
        var e = (0, r.useState)("confirm"),
          t = e[0],
          n = e[1],
          a = (0, r.useState)(),
          c = a[0],
          l = a[1],
          d = (0, r.useRef)(),
          m = (0, r.useRef)(),
          p = (0, w.qD)(),
          h = p.queryToForward,
          g = p.isConfirmation,
          _ = p.isReauthentOrConfirmation,
          b = p.isReauthent,
          j = p.amid,
          y = p.returnUrl,
          O = p.reinforcedAuthent,
          E = (0, i.l8)(),
          P = E.displayedLogin,
          M = E.initAndRedirect,
          q = E.avatarUrl,
          z = E.uiError,
          S = (0, u.useForm)({
            shouldFocusError: !1,
            defaultValues: { remember: !0 },
          }),
          L = S.handleSubmit,
          F = S.register,
          I = (0, r.useRef)(),
          V = function (e) {
            void 0 !== window.o_link &&
              (e.target.checked
                ? window.o_link(
                    "idme_mc_authent",
                    "clic_rester_identifié_coché",
                    "rester_identifié_coché"
                  )
                : window.o_link(
                    "idme_mc_authent",
                    "clic_rester_identifié_décoché",
                    "rester_identifié_décoché"
                  ));
          },
          T = function () {
            void 0 !== d.current &&
              (clearTimeout(d.current), (d.current = void 0)),
              void 0 !== m.current &&
                (clearInterval(m.current), (m.current = void 0));
          };
        (0, r.useEffect)(function () {
          return function () {
            T();
          };
        }, []),
          (0, r.useEffect)(
            function () {
              var e = I.current;
              return (
                e && e.addEventListener("change", V),
                function () {
                  e && e.removeEventListener("change", V);
                }
              );
            },
            [t]
          );
        var U = function (e) {
            var t, r;
            if (
              null != e &&
              e.isAxiosError &&
              null != e &&
              null !== (t = e.response) &&
              void 0 !== t &&
              null !== (r = t.data) &&
              void 0 !== r &&
              r.error &&
              !O
            )
              l(e.response.data.error);
            else {
              var i = g || O ? de.Error.confirmation : de.Error.common;
              l(i);
            }
            n("error");
          },
          H = (function () {
            var e = (0, o.Z)(
              s().mark(function e() {
                return s().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.prev = 0), (e.next = 3), M();
                        case 3:
                          e.next = 7;
                          break;
                        case 5:
                          (e.prev = 5), (e.t0 = e.catch(0));
                        case 7:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[0, 5]]
                );
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          N = function (e) {
            T(),
              (d.current = setTimeout(function () {
                d.current = void 0;
                var t = Date.now(),
                  n = !1;
                d.current = setInterval(
                  (0, o.Z)(
                    s().mark(function r() {
                      var i, o;
                      return s().wrap(
                        function (r) {
                          for (;;)
                            switch ((r.prev = r.next)) {
                              case 0:
                                if (
                                  (Date.now() - t > 1e3 * e.timeout &&
                                    (T(), U()),
                                  !0 !== n)
                                ) {
                                  r.next = 3;
                                  break;
                                }
                                return r.abrupt("return");
                              case 3:
                                return (
                                  (n = !0),
                                  (r.prev = 4),
                                  (r.next = 7),
                                  A.Z.getAuthentMC({
                                    id: e.id,
                                    amid: j,
                                    returnUrl: y,
                                    isConfirmation: g,
                                  })
                                );
                              case 7:
                                if (
                                  ((i = r.sent),
                                  !(o = i.data).stage || "error" !== o.stage)
                                ) {
                                  r.next = 12;
                                  break;
                                }
                                return o.force, r.abrupt("return");
                              case 12:
                                if ("pending" !== o.status) {
                                  r.next = 14;
                                  break;
                                }
                                return r.abrupt("return");
                              case 14:
                                ("ok" === o.status || o.return_url) &&
                                  (T(), window.location.assign(o.return_url)),
                                  (r.next = 21);
                                break;
                              case 17:
                                (r.prev = 17),
                                  (r.t0 = r.catch(4)),
                                  T(),
                                  U(r.t0);
                              case 21:
                                return (r.prev = 21), (n = !1), r.finish(21);
                              case 24:
                              case "end":
                                return r.stop();
                            }
                        },
                        r,
                        null,
                        [[4, 17, 21, 24]]
                      );
                    })
                  ),
                  1e3 * e.frequency
                );
              }, 1e3 * e.initialDelay));
          },
          B = (function () {
            var e = (0, o.Z)(
              s().mark(function e(t) {
                var r, i, o, a, c, l, d;
                return s().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.prev = 0),
                            (r = P),
                            (e.next = 4),
                            A.Z.postAuthentMC({
                              amid: j,
                              login: r,
                              remember: t.remember,
                              origin: h.origin,
                              returnUrl: y,
                              isConfirmation: g,
                              isReauthent: b,
                            })
                          );
                        case 4:
                          (i = e.sent),
                            (o = i.data).id &&
                              ((a = o.polling),
                              (c = a.initialDelay),
                              (l = a.frequency),
                              (d = a.timeout),
                              n("polling"),
                              N({
                                id: o.id,
                                initialDelay: c,
                                frequency: l,
                                timeout: d,
                              })),
                            (e.next = 12);
                          break;
                        case 9:
                          (e.prev = 9), (e.t0 = e.catch(0)), U(e.t0);
                        case 12:
                          return (e.prev = 12), D.Z.sendProbes(), e.finish(12);
                        case 15:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[0, 9, 12, 15]]
                );
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })();
        return (
          (0, Z.Z)(),
          (0, C.jsxs)("form", {
            onSubmit: L(B),
            method: "post",
            children: [
              (0, C.jsx)(f.Z, {
                mt: { xs: 1, m: 2 },
                children: (0, C.jsx)(v.Z, {
                  size: { xs: 1 },
                  children: _
                    ? (0, C.jsx)(K, {
                        login: P,
                        isMobileConnect: !0,
                        avatar: q,
                      })
                    : (0, C.jsx)(K, {
                        login: P,
                        onChangeAccount: H,
                        isMobileConnect: !0,
                        avatar: q,
                      }),
                }),
              }),
              z &&
                "cookieInvalid" === z.type &&
                (0, C.jsx)(f.Z, {
                  mt: { xs: 1, m: 2 },
                  children: (0, C.jsx)(v.Z, {
                    size: { xs: 1, m: 6 / 7 },
                    children: (0, C.jsx)(x.Z, {
                      id: "mc-alert",
                      variant: "alert",
                      title: z.message,
                    }),
                  }),
                }),
              "confirm" === t &&
                !_ &&
                (0, C.jsx)(f.Z, {
                  mt: { xs: 0, xl: 1 },
                  mb: { xs: 1, xl: 2 },
                  children: (0, C.jsx)(v.Z, {
                    size: { xs: 1 },
                    children: (0, C.jsx)(R.Z, {
                      id: "remember",
                      name: "remember",
                      label: k.w$,
                      ref: function (e) {
                        F(e), (I.current = e);
                      },
                      "data-testid": "input-remember",
                    }),
                  }),
                }),
              (function (e) {
                switch (e) {
                  case "polling":
                    return (0, C.jsx)(ae, {});
                  case "error":
                    return (0, C.jsx)(le, { error: c, retry: B });
                  default:
                    return (0, C.jsx)(Q, {});
                }
              })(t),
            ],
          })
        );
      }
      de.Error = {
        common: {
          ico: "error",
          title: k.rj,
          text: k.WT,
          btn: {
            href: "password",
            title: k.yy,
            oevent: "idme_mc_authent;clic_lien_password;authent_pwd",
          },
        },
        confirmation: {
          ico: "error",
          title: k.rj,
          text: k.ZH,
          btn: {
            href: "retry",
            title: k.rE,
            oevent:
              "idme_mc_authent;clic_bouton_relancer_mc;bouton_relancer_mc",
          },
        },
      };
      var ue = de,
        me = n(4439),
        pe = n(4362);
      function he(e) {
        var t = e.size;
        return (0, C.jsxs)("svg", {
          width: t,
          height: t,
          viewBox: "0 0 80 80",
          children: [
            (0, C.jsx)("defs", {
              children: (0, C.jsx)("circle", {
                id: "ancg23ohva",
                cx: "40",
                cy: "40",
                r: "40",
              }),
            }),
            (0, C.jsxs)("g", {
              fill: "none",
              fillRule: "evenodd",
              children: [
                (0, C.jsx)("mask", {
                  id: "byee0xikqb",
                  fill: "#fff",
                  children: (0, C.jsx)("use", { xlinkHref: "#ancg23ohva" }),
                }),
                (0, C.jsx)("use", {
                  fill: "#F4F4F4",
                  fillRule: "nonzero",
                  xlinkHref: "#ancg23ohva",
                }),
                (0, C.jsx)("path", {
                  fill: "#999",
                  fillRule: "nonzero",
                  d: "M40.216 10.265c8.955 0 16.145 7.15 16.145 16.054 0 8.905-7.19 16.053-16.145 16.053-8.956 0-16.145-7.148-16.145-16.053 0-8.905 7.273-16.054 16.145-16.054z",
                  mask: "url("./MbuxlFQg6aBE_byee0xikqb.js")",
                }),
                (0, C.jsx)("path", {
                  fill: "#999",
                  fillRule: "nonzero",
                  d: "M54.172 41.1C60.576 44.526 64.8 50.505 64.8 56.86V82.4H25.38c-5.335 0-9.78-3.385-9.78-7.398V56.86c0-6.357 4.072-12.334 10.434-15.76 0 0 5.796 5.393 14.251 5.56 8.413-.211 13.887-5.56 13.887-5.56zM39.824 71.307c-.709 0-1.306.236-1.792.707-.488.471-.73 1.052-.73 1.745 0 .778.253 1.383.754 1.816.488.427 1.117.66 1.768.652a2.541 2.541 0 001.725-.661c.499-.438.747-1.04.747-1.807 0-.693-.238-1.274-.712-1.745-.477-.471-1.064-.707-1.76-.707zm.397-19.985c-1.725 0-3.234.353-4.527 1.054-1.296.701-2.28 1.586-2.955 2.657-.674 1.068-1.01 2.122-1.01 3.166 0 .504.211.972.637 1.405.427.433.949.649 1.568.649 1.051 0 1.765-.619 2.141-1.857.397-1.186.885-2.081 1.459-2.689.576-.608 1.471-.915 2.687-.915 1.04 0 1.891.304 2.547.906.658.603.989 1.342.989 2.219.003.438-.109.868-.325 1.252a4.692 4.692 0 01-.795 1.043c-.317.312-.829.775-1.536 1.389-.808.704-1.448 1.309-1.925 1.818a6.108 6.108 0 00-1.144 1.778c-.288.674-.432 1.471-.432 2.394 0 .734.198 1.287.59 1.66.392.372.877.558 1.453.558 1.104 0 1.762-.569 1.973-1.709.122-.537.213-.912.274-1.128.064-.222.15-.436.256-.641.142-.255.31-.49.507-.707.285-.315.587-.613.904-.895 1.36-1.208 2.304-2.066 2.829-2.575a7.461 7.461 0 001.36-1.819c.381-.701.573-1.517.573-2.448a5.843 5.843 0 00-1.005-3.292c-.669-1.008-1.616-1.805-2.845-2.391-1.227-.587-2.643-.882-4.248-.882z",
                  mask: "url("./MbuxlFQg6aBE_byee0xikqb.js")",
                }),
              ],
            }),
          ],
        });
      }
      he.defaultProps = { size: 80 };
      var fe = he,
        ve = function (e) {
          var t,
            n = e.handleSelectedAccount,
            a = (0, w.qD)(),
            c = a.accountList,
            l = a.moreAccounts,
            d = a.setAccountList,
            u = a.setMoreAccounts,
            m = (0, i.l8)(),
            p = m.uiError,
            h = m.displayFirstConnection,
            g = m.setLoginStep,
            _ = m.setUiError,
            y = m.isPendingRequest;
          void 0 !== c[0].errorMessage &&
            (t = { type: "error", message: c[0].errorMessage });
          var O = !0 === c[0].isFirstConnection,
            E = (0, r.useState)(t),
            P = E[0],
            M = E[1];
          (0, r.useEffect)(
            function () {
              "network" === (null == p ? void 0 : p.type)
                ? M({ type: "alert", message: k.Dq })
                : "technical" === (null == p ? void 0 : p.type) &&
                  M({ type: "alert", message: k.NY });
            },
            [p]
          );
          var q = (function () {
              var e = (0, o.Z)(
                s().mark(function e(t, r) {
                  var i;
                  return s().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              t.preventDefault(),
                              (e.prev = 1),
                              M(void 0),
                              (e.next = 5),
                              n(r)
                            );
                          case 5:
                            e.next = 10;
                            break;
                          case 7:
                            (e.prev = 7),
                              (e.t0 = e.catch(1)),
                              e.t0.isAxiosError &&
                                void 0 !== e.t0.response &&
                                void 0 !== e.t0.response.data &&
                                void 0 !== (i = e.t0.response.data.message) &&
                                M({ type: "error", message: i });
                          case 10:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[1, 7]]
                  );
                })
              );
              return function (t, n) {
                return e.apply(this, arguments);
              };
            })(),
            z = (function () {
              var e = (0, o.Z)(
                s().mark(function e() {
                  var t;
                  return s().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (e.prev = 0), (e.next = 3), A.Z.getAccounts()
                            );
                          case 3:
                            (t = e.sent).data.length > 0 && d(t.data);
                          case 5:
                            return (e.prev = 5), u(!1), e.finish(5);
                          case 8:
                          case "end":
                            return e.stop();
                        }
                    },
                    e,
                    null,
                    [[0, , 5, 8]]
                  );
                })
              );
              return function () {
                return e.apply(this, arguments);
              };
            })(),
            S = c.map(function (e) {
              return e.login;
            });
          return (
            (0, Z.Z)(),
            (0, C.jsxs)(C.Fragment, {
              children: [
                h &&
                  (0, C.jsx)(f.Z, {
                    mt: { xs: 1 },
                    children: (0, C.jsx)(v.Z, {
                      size: { xs: 1, m: 6 / 7, xl: 7 / 8 },
                      pr: { xs: 0, s: 0, m: 1 },
                      pl: { xs: 0, s: 0, m: 1 },
                      children: (0, C.jsx)(x.Z, {
                        id: "first-connection-info",
                        variant: "info",
                        title: k.Kq,
                        content: [(0, k.qq)(S[0])],
                        "data-testid": "first-connection-info",
                      }),
                    }),
                  }),
                (0, C.jsx)(f.Z, {
                  mt: { xs: 1, m: 2 },
                  children: (0, C.jsx)(v.Z, {
                    size: { xs: 1 },
                    children: (0, C.jsx)(j.Z, {
                      "data-testid": "pageSubtitle",
                      children: k.fE,
                    }),
                  }),
                }),
                P &&
                  (0, C.jsx)(f.Z, {
                    children: (0, C.jsx)(v.Z, {
                      size: { xs: 1, m: 6 / 7, xl: 0.5 },
                      children: (0, C.jsx)(x.Z, {
                        id: "accounts-error",
                        variant: P.type,
                        mini: !0,
                        title: P.message,
                        "data-testid": "accounts-error",
                      }),
                    }),
                  }),
                (0, C.jsx)(f.Z, {
                  children: (0, C.jsxs)(v.Z, {
                    size: { xs: 1, m: 6 / 7, xl: 0.5 },
                    children: [
                      (0, C.jsxs)(me.Z, {
                        "data-testid": "accounts-list",
                        children: [
                          S.map(function (e) {
                            return (0, C.jsx)(
                              pe.Z,
                              {
                                id: "choose-account-".concat(e),
                                icon: F.Z,
                                label: e,
                                href: "#",
                                truncateLabel: !0,
                                onClick: function (t) {
                                  return q(t, e);
                                },
                                "data-testid": "choose-account-".concat(e),
                                "data-oevent-category": "idme_list_accounts",
                                "data-oevent-action": "clic_liste",
                                "data-oevent-label": "compte_liste",
                              },
                              e
                            );
                          }),
                          (0, C.jsx)(pe.Z, {
                            icon: fe,
                            label: k.ZC,
                            href: "#",
                            onClick: function (e) {
                              return (function (e) {
                                e.preventDefault(),
                                  void 0 !== p && _(void 0),
                                  g("login");
                              })(e);
                            },
                            "data-testid": "choose-other-account",
                            "data-oevent-category": "idme_list_accounts",
                            "data-oevent-action": "clic_bouton_un_autre_compte",
                            "data-oevent-label": "bouton_un_autre_compte",
                          }),
                        ],
                      }),
                      !O &&
                        l &&
                        (0, C.jsx)(b.Z, {
                          mt: 2,
                          variant: "wired",
                          onClick: z,
                          disabled: y,
                          "data-testid": "more-accounts",
                          "data-oevent-category": "idme_list_accounts",
                          "data-oevent-action": "clic_comptes_dispo",
                          "data-oevent-label": "lien_comptes_dispo",
                          children: k.N5,
                        }),
                    ],
                  }),
                }),
              ],
            })
          );
        },
        xe = n(6872);
      function ge() {
        var e = (0, i.l8)(),
          t = e.loginStep,
          n = e.handleSelectedAccount;
        switch (t.step) {
          case "login":
            return (0, C.jsx)(q, { handleSelectedAccount: n });
          case "password":
          case "reauthent-pwd":
            return (0, C.jsx)(X, {});
          case "mc":
          case "reauthent-mc":
          case "reauthent-mc-force":
            return (0, C.jsx)(ue, {});
          case "listAccount":
            return (0, C.jsx)(ve, { handleSelectedAccount: n });
          case "keepConnected":
            return (0, C.jsx)(Y, {});
          case "otc":
            return (0, C.jsx)(xe.default, {});
          default:
            return null;
        }
      }
      (ge.allowDirectAccess = !0),
        (ge.layoutOpts = { displayPromo: !0, displayFooter: !0 });
      var _e = ge;
    },
    3685: function (e, t, n) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/",
        function () {
          return n(5068);
        },
      ]);
    },
  },
  function (e) {
    e.O(0, [435, 774, 888, 179], function () {
      return 3685, e((e.s = 3685));
    });
    var t = e.O();
    _N_E = t;
  },
]);
