"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [435],
  {
    6843: function (e, r, t) {
      t.d(r, {
        Z: function () {
          return S;
        },
      });
      var o,
        n,
        i = t(7294),
        a = (t(9647), t(7379)),
        l = t(8107),
        c = t.n(l),
        d = t(1154),
        s = (0, d.Ll)({
          name: "Tick",
          width: 1024,
          height: 1024,
          paths: [
            "M914.93 70.689c-11.474 3.141-17.21 5.737-26.226 11.474-9.288 6.010-6.966 3.962-52.587 48.353-21.445 20.898-43.709 42.479-49.446 48.080-18.987 18.44-94.521 91.925-122.248 118.969-14.889 14.615-30.459 29.64-34.284 33.465-3.962 3.688-26.362 25.679-49.991 48.626-23.63 23.084-46.577 45.348-51.085 49.719s-19.942 19.396-34.284 33.329c-73.485 71.71-116.238 113.37-121.975 118.833-3.415 3.279-9.425 9.014-13.112 12.703l-6.966 6.556-11.063-12.567c-6.147-6.966-12.567-14.206-14.342-16.117-2.732-2.868-98.209-109.408-134.132-149.566-12.84-14.342-12.976-14.342-22.128-20.489-27.865-18.44-64.471-18.849-93.974-1.092-9.288 5.6-51.495 46.988-60.509 59.281-19.396 26.771-21.99 63.241-6.556 92.608 3.005 5.6 23.084 32.099 49.308 65.154 77.173 96.979 151.615 190.543 189.041 237.531 19.942 24.996 37.698 47.397 39.611 49.855 21.035 27.865 34.011 38.655 55.319 45.758 31.142 10.518 65.837 2.458 89.057-20.762 3.551-3.551 11.61-12.976 17.757-20.898s15.025-18.987 19.532-24.586c4.507-5.6 11.063-13.932 14.615-18.44 39.202-49.446 67.886-85.369 75.534-94.93 5.19-6.42 23.084-28.82 39.747-49.855 28.41-35.649 64.471-81.135 105.038-131.945 9.425-11.884 24.86-31.28 34.284-43.162s36.47-45.894 60.1-75.534c23.63-29.64 50.265-63.241 59.281-74.442 31.825-40.158 70.070-88.101 108.453-136.317 43.845-54.909 46.167-58.187 51.085-70.753 16.8-42.207-1.639-90.832-42.069-111.73-17.893-9.152-42.479-12.020-60.783-7.103z",
          ],
        });
      function u() {
        return (u =
          Object.assign ||
          function (e) {
            for (var r = 1; r < arguments.length; r++) {
              var t = arguments[r];
              for (var o in t)
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            }
            return e;
          }).apply(this, arguments);
      }
      function h(e, r) {
        return r || (r = e.slice(0)), (e.raw = r), e;
      }
      var b = a.ZP.span(
          o || (o = h(["\n  position: relative;\n  display: inline-flex;\n"]))
        ),
        f = a.ZP.input(n || (n = h(["\n  ", "\n"])), function (e) {
          var r = e.theme,
            t = r.colors,
            o = r.checkbox,
            n = o.shared,
            i = o.checked,
            a = o.unchecked,
            l = n.borderRadius,
            c = n.outlineOffset,
            s = n.outlineWidth;
          return {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            padding: 0,
            opacity: 0,
            margin: 0,
            cursor: "pointer",
            "& ~ div": u(
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              (0, d.dp)(n),
              {
                borderRadius: (0, d.ht)(l),
                outlineOffset: (0, d.ht)(c),
                transition: "outline-offset .2s ease-in-out",
              }
            ),
            "&:enabled:not(:checked) ~ div": u({}, (0, d.o3)(a.inactive), {
              border:
                (0, d.ht)(a.inactive.borderWidth) +
                " solid " +
                t[a.inactive.borderColor],
              backgroundColor: t[a.inactive.backgroundColor],
            }),
            "&:enabled:not(:checked):hover ~ div, &:enabled:not(:checked).focus-visible ~ div":
              u({}, (0, d.o3)(a.hover), {
                border:
                  (0, d.ht)(a.hover.borderWidth) +
                  " solid " +
                  t[a.hover.borderColor],
                backgroundColor: t[a.hover.backgroundColor],
              }),
            "&:enabled:not(:checked).focus-visible ~ div": {
              outline: (0, d.ht)(s) + " solid " + t[a.focus.outlineColor],
              outlineOffset: 0,
            },
            "&:enabled:not(:checked):active ~ div": u({}, (0, d.o3)(a.active), {
              border:
                (0, d.ht)(a.active.borderWidth) +
                " solid " +
                t[a.active.borderColor],
              backgroundColor: t[a.active.backgroundColor],
            }),
            "&:enabled:checked ~ div": u({}, (0, d.o3)(i.inactive), {
              border:
                (0, d.ht)(i.inactive.borderWidth) +
                " solid " +
                t[i.inactive.borderColor],
              backgroundColor: t[i.inactive.backgroundColor],
              "svg > path": { fill: t[i.inactive.tickColor] },
            }),
            "&:enabled:checked:hover ~ div, &:enabled:checked.focus-visible ~ div":
              u({}, (0, d.o3)(i.hover), {
                border:
                  (0, d.ht)(i.hover.borderWidth) +
                  " solid " +
                  t[i.hover.borderColor],
                backgroundColor: t[i.hover.backgroundColor],
                "svg > path": { fill: t[i.hover.tickColor] },
              }),
            "&:enabled:checked.focus-visible ~ div": {
              outline: (0, d.ht)(s) + " solid " + t[i.focus.outlineColor],
              outlineOffset: 0,
            },
            "&:enabled:checked:active ~ div": u({}, (0, d.o3)(i.active), {
              border:
                (0, d.ht)(i.active.borderWidth) +
                " solid " +
                t[i.active.borderColor],
              backgroundColor: t[i.active.backgroundColor],
              "svg > path": { fill: t[i.active.tickColor] },
            }),
            "&:disabled:not(:checked) ~ div": u({}, (0, d.o3)(a.disabled), {
              border:
                (0, d.ht)(a.disabled.borderWidth) +
                " solid " +
                t[a.disabled.borderColor],
              backgroundColor: t[a.disabled.backgroundColor],
            }),
            "&:disabled:checked ~ div": u({}, (0, d.o3)(i.disabled), {
              border:
                (0, d.ht)(i.disabled.borderWidth) +
                " solid " +
                t[i.disabled.borderColor],
              backgroundColor: t[i.disabled.backgroundColor],
              "svg > path": { fill: t[i.disabled.tickColor] },
            }),
            "&:disabled": { cursor: "not-allowed" },
          };
        }),
        v = (0, i.forwardRef)(function (e, r) {
          var t = e.className,
            o = e.theme,
            n = e.disabled,
            a = (0, i.useState)(!1),
            l = a[0],
            c = a[1],
            d = (0, i.useRef)(null);
          (0, i.useImperativeHandle)(r, function () {
            return d.current;
          });
          var h = function (e) {
            c(e.target.checked);
          };
          (0, i.useEffect)(function () {
            var e = d.current;
            return (
              c(e.checked),
              e.addEventListener("change", h),
              function () {
                e.removeEventListener("change", h);
              }
            );
          }, []);
          var v = o.checkbox;
          return i.createElement(
            b,
            { className: t, role: "checkbox", "aria-checked": l },
            i.createElement(
              f,
              u({ ref: d }, e, { type: "checkbox", disabled: n })
            ),
            i.createElement(
              "div",
              null,
              l && i.createElement(s, { size: v.shared.tickSize })
            )
          );
        });
      (v.propTypes = {}), (v.defaultProps = { id: void 0, disabled: !1 });
      var p,
        g,
        m,
        k,
        x,
        y,
        C = (0, a.Zz)(v),
        w = t(2519);
      function L() {
        return (L =
          Object.assign ||
          function (e) {
            for (var r = 1; r < arguments.length; r++) {
              var t = arguments[r];
              for (var o in t)
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            }
            return e;
          }).apply(this, arguments);
      }
      function Z(e, r) {
        return r || (r = e.slice(0)), (e.raw = r), e;
      }
      var E = (0, a.ZP)(w.Z)(p || (p = Z(["\n  ", "\n"])), function (e) {
          var r = e.theme,
            t = e.isLarge,
            o = r.checkboxList,
            n = o.standard,
            i = o.long;
          return {
            maxWidth: t ? (0, d.ht)(i.maxWidth) : (0, d.ht)(n.maxWidth),
          };
        }),
        P = a.ZP.div(
          g || (g = Z(["\n  ", "\n\n  ", "\n  ", "\n"])),
          function (e) {
            var r = e.theme,
              t = e.largePadding,
              o = e.alignTop,
              n = r.checkboxList,
              i = n.shared,
              a = n.standard,
              l = n.long,
              c = i.container;
            return L(
              {
                display: "flex",
                alignItems: o ? "flex-start" : "center",
                maxWidth: (0, d.ht)(o ? l.maxWidth : a.maxWidth),
              },
              (0, d.o3)(
                t
                  ? {
                      paddingTop: c.paddingTop + 3,
                      paddingBottom: c.paddingBottom + 3,
                    }
                  : c
              ),
              {
                "& > span:first-child": L({}, (0, d.e6)(i.checkbox), {
                  top: (0, d.ht)(
                    o ? l.checkbox.offsetTop : a.checkbox.offsetTop
                  ),
                }),
              }
            );
          },
          d.bG,
          d.nI
        ),
        O = a.ZP.label(
          m ||
            (m = Z([
              "\n  display: flex;\n  flex: initial;\n  flex-direction: column;\n",
            ]))
        ),
        W = a.ZP.div(k || (k = Z(["\n  ", "\n"])), function (e) {
          var r = e.theme,
            t = e.hasMargin,
            o = e.isDisabled,
            n = r.colors,
            i = r.text,
            a = r.checkboxList.shared.label;
          return L(
            {},
            (0, d.LZ)(L({}, i.shared.normal, i.standard.xlarge)),
            { color: o ? n[a.disabledColor] : n.black },
            (0, d.e6)(t ? a : {}),
            { cursor: o ? "not-allowed" : "pointer" }
          );
        }),
        z = a.ZP.div(x || (x = Z(["\n  ", "\n"])), function (e) {
          var r = e.theme,
            t = e.isDisabled,
            o = r.colors,
            n = r.text,
            i = r.checkboxList.shared.label;
          return L({}, (0, d.LZ)(L({}, n.shared.normal, n.standard.xlarge)), {
            color: t ? o[i.disabledColor] : o.black,
            margin: 0,
            cursor: t ? "not-allowed" : "pointer",
            "&:not(:last-child)": L({}, (0, d.e6)({ marginBottom: 15 })),
          });
        }),
        A = a.ZP.div(y || (y = Z(["\n  ", "\n"])), function (e) {
          var r = e.theme,
            t = e.isDisabled,
            o = r.colors,
            n = r.text,
            i = r.checkboxList.shared.subLabel;
          return L(
            {},
            (0, d.LZ)(L({}, n.shared.normal, n.mention.xlarge)),
            { color: t ? o[i.disabledColor] : o.grey3 },
            (0, d.e6)(i),
            { cursor: t ? "not-allowed" : "pointer" }
          );
        }),
        T = (0, i.forwardRef)(function (e, r) {
          var t = e.theme,
            o = e.id,
            n = e.disabled,
            a = e.error,
            l = e.label,
            d = e.subLabel,
            s = t.text,
            u = c()(),
            h = u.ref,
            b = u.height > s.standard.xlarge.lineHeight;
          return i.createElement(
            i.Fragment,
            null,
            i.createElement(
              P,
              { largePadding: !b && void 0 === d, alignTop: Array.isArray(l) },
              i.createElement(C, L({ ref: r, id: o, disabled: n }, e)),
              i.createElement(
                O,
                { htmlFor: o },
                "string" == typeof l &&
                  i.createElement(
                    W,
                    { ref: h, hasMargin: !b && void 0 === d, isDisabled: n },
                    l
                  ),
                Array.isArray(l) &&
                  l.map(function (e) {
                    return i.createElement(z, { isDisabled: n }, e);
                  }),
                d && i.createElement(A, { isDisabled: n }, d)
              )
            ),
            !n &&
              "string" == typeof a &&
              i.createElement(E, {
                mini: !0,
                variant: "error",
                title: a,
                isLarge: Array.isArray(l),
              })
          );
        });
      (T.propTypes = {}),
        (T.defaultProps = {
          id: void 0,
          disabled: !1,
          error: void 0,
          subLabel: void 0,
        });
      var S = (0, a.Zz)(T);
    },
    7146: function (e, r, t) {
      t.d(r, {
        Z: function () {
          return s;
        },
      });
      var o = t(7294),
        n = (t(9647), t(8404)),
        i = t(1154),
        a = (0, i.Ll)({
          name: "AccessibilityVision",
          width: 1024,
          height: 1024,
          paths: [
            "M476.019 227.945c-0.228 0.228-5.351 0.683-11.272 1.025-82.201 5.351-176.925 36.204-259.012 84.478-52.485 30.853-92.561 61.593-132.637 101.784-26.868 26.983-46.223 50.892-62.846 77.532-12.41 20.037-11.954 18.103-6.944 27.096 10.019 18.103 29.032 44.858 45.427 63.529 84.478 97.002 212.333 172.598 339.164 200.834 15.483 3.416 38.482 7.4 50.095 8.652 3.757 0.341 7.742 0.911 8.767 1.139 11.613 2.164 88.463 3.074 111.916 1.366 108.159-7.97 225.539-54.421 324.363-128.196 40.645-30.399 83.681-72.296 109.639-106.679 8.995-11.954 19.241-27.438 25.958-38.937l5.351-9.336-5.351-9.449c-7.856-13.662-23.112-36.091-31.992-47.248-14.118-17.647-41.328-46.338-58.633-61.936-8.652-7.742-11.613-10.247-21.518-18.558-74.345-62.162-173.51-112.371-262.427-132.865-27.211-6.262-43.491-9.108-63.187-11.272-6.603-0.683-13.434-1.594-15.37-1.821-3.985-0.797-88.691-1.821-89.487-1.139zM539.889 309.349c56.47 8.539 108.045 40.986 139.468 87.779 31.65 47.248 42.238 101.784 30.626 158.709-12.068 59.772-55.559 114.421-112.371 141.289-20.265 9.564-39.848 15.37-61.593 18.216-11.272 1.48-44.515 1.48-53.054 0-23.112-3.871-35.863-7.514-53.851-15.029-42.808-17.988-81.062-53.851-102.010-95.635-11.499-23.112-16.508-39.735-21.176-71.498-0.911-5.92-0.911-36.204 0-42.125 4.667-31.423 9.677-48.5 21.176-71.498 29.26-58.406 87.893-100.758 152.447-109.98 4.667-0.683 9.791-1.48 11.385-1.708 5.579-0.797 40.531 0.228 48.956 1.48zM744.024 351.018c77.988 38.368 147.551 93.358 193.091 152.447 5.123 6.603 5.92 8.198 4.895 10.247-4.441 9.905-47.931 56.128-71.385 76.052-26.186 22.088-63.643 48.387-92.902 65.009-12.068 6.831-51.347 26.983-52.713 26.983-0.341 0 3.302-5.465 7.97-12.182 37.458-53.397 54.307-115.9 49.069-181.365-3.871-48.5-24.022-101.1-53.851-140.265-5.92-7.742-6.375-7.856 15.826 3.074zM287.481 353.523c-18.216 25.617-32.106 54.421-40.189 83.225-15.029 53.282-13.89 109.525 3.416 161.897 8.198 25.047 23.795 55.218 38.254 74.231 2.846 3.757 5.010 6.944 4.782 7.172-0.456 0.569-33.473-16.053-45.313-22.657-62.732-35.635-118.861-81.86-157.343-129.791-5.010-6.148-9.564-12.41-10.247-13.89-1.139-2.277 0-4.098 10.019-16.622 21.86-27.211 58.861-62.049 92.106-86.868 14.231-10.702 44.289-30.512 58.633-38.823 11.841-6.831 50.55-26.642 51.005-26.072 0.228 0.228-2.049 3.871-5.123 8.198z",
            "M498.333 387.564c-52.485 5.465-95.294 41.784-109.297 92.675-3.871 14.003-4.895 39.848-2.164 54.079 6.49 33.814 25.503 62.618 53.282 81.176 13.434 8.995 25.047 14.118 41.1 18.216 19.811 5.010 47.248 3.871 67.628-2.733 8.767-2.846 27.552-12.637 34.838-18.103 36.774-27.666 54.649-68.88 50.208-115.559-1.139-11.841-9.108-38.823-10.929-36.774-0.456 0.456-1.708 3.302-2.733 6.375-2.733 7.4-10.702 17.76-17.306 22.657-11.499 8.425-20.949 11.385-34.725 11.272-23.681-0.228-44.289-15.939-51.347-39.165-2.96-10.019-2.505-25.389 1.366-34.953 4.782-12.41 15.142-23.567 27.894-30.057 3.188-1.594 5.465-2.96 5.123-2.96s-5.579-1.252-11.613-2.733c-10.816-2.846-31.081-4.441-41.328-3.416z",
          ],
        }),
        l = (0, i.Ll)({
          name: "Hide",
          width: 1024,
          height: 1024,
          paths: [
            "M864 333.44l-49.28 50.56c50.002 33.095 92.365 73.013 127.070 119.032l0.93 1.288c-41.44 53.835-91.68 98.568-148.948 132.746l-2.412 1.334c-18.252 10.798-40.321 22.039-63.081 31.994l-4.119 1.606c36.891-46.099 59.201-105.262 59.201-169.636 0-0.212-0-0.425-0.001-0.637l0 0.033c-0.019-27.832-4.11-54.702-11.708-80.055l0.508 1.975-57.92 57.92q0 10.24 0 20.16c0 0.095 0 0.208 0 0.32 0 112.931-91.549 204.48-204.48 204.48-0.113 0-0.225-0-0.338-0l0.018 0q-9.92 0-20.16 0l-73.28 73.92c24.084 4.368 51.862 6.924 80.216 7.040l0.104 0h27.52c213.44 0 429.44-150.4 499.52-284.48-40.308-68.773-93.84-125.575-157.531-168.44l-1.829-1.16zM214.080 626.88c-52.472-33.69-96.867-74.724-133.165-122.271l-0.915-1.249c41.44-53.835 91.68-98.568 148.948-132.746l2.412-1.334c17.571-10.949 38.558-22.266 60.235-32.348l3.765-1.572c-35.913 45.587-57.6 103.842-57.6 167.162 0 0.182 0 0.364 0.001 0.546l-0-0.028c-0.003 0.441-0.004 0.962-0.004 1.484 0 30.511 5.157 59.817 14.647 87.095l-0.563-1.86 56.32-56.64c-1.429-8.636-2.245-18.588-2.245-28.73 0-0.475 0.002-0.949 0.005-1.423l-0 0.073c0.181-113.148 91.947-204.802 205.12-204.802 0.338 0 0.675 0.001 1.013 0.002l-0.052-0c10.709 0.107 21.128 0.918 31.334 2.388l-1.254-0.148 73.6-73.6c-26.109-4.976-56.196-7.882-86.94-8l-0.1-0h-27.52c-215.040-0-431.040 150.4-501.12 284.16 41.492 70.521 96.899 128.586 162.851 171.918l1.949 1.202zM628.16 461.44l312-311.68-60.48-60.48-477.12 477.12-306.56 307.84 60.48 60.48 313.6-313.6z",
          ],
        });
      function c() {
        return (c =
          Object.assign ||
          function (e) {
            for (var r = 1; r < arguments.length; r++) {
              var t = arguments[r];
              for (var o in t)
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            }
            return e;
          }).apply(this, arguments);
      }
      var d = (0, o.forwardRef)(function (e, r) {
        var t = (0, o.useState)(!1),
          i = t[0],
          d = t[1],
          s = (0, o.useRef)(!0),
          u = (0, o.useRef)(null);
        return (
          (0, o.useImperativeHandle)(r, function () {
            return u.current;
          }),
          (0, o.useEffect)(
            function () {
              if (s.current) s.current = !1;
              else {
                var e,
                  r =
                    null === (e = u.current) || void 0 === e
                      ? void 0
                      : e.nextSibling.querySelector("svg");
                if (r)
                  try {
                    r.focus();
                  } catch (e) {
                    u.current.focus();
                  }
              }
            },
            [i]
          ),
          o.createElement(
            n.Z,
            c({}, e, {
              ref: u,
              type: i ? "text" : "password",
              icon: i ? a : l,
              iconAttrs: c({}, e.iconAttrs, {
                role: "button",
                "aria-label": (i ? "cacher" : "afficher") + " le mot de passe",
                onKeyUp: function (e) {
                  (13 !== e.keyCode && 32 !== e.keyCode) || d(!i);
                },
              }),
              onIconClick: function () {
                return d(!i);
              },
            })
          )
        );
      });
      (d.propTypes = {}), (d.defaultProps = { iconAttrs: void 0 });
      var s = d;
    },
    4362: function (e, r, t) {
      var o,
        n,
        i,
        a,
        l,
        c = t(7294),
        d = (t(9647), t(7379)),
        s = t(7089),
        u = t(1154),
        h = [
          "id",
          "icon",
          "iconAttrs",
          "label",
          "subLabel",
          "truncateLabel",
          "truncateSubLabel",
        ];
      function b() {
        return (b =
          Object.assign ||
          function (e) {
            for (var r = 1; r < arguments.length; r++) {
              var t = arguments[r];
              for (var o in t)
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            }
            return e;
          }).apply(this, arguments);
      }
      function f(e, r) {
        return r || (r = e.slice(0)), (e.raw = r), e;
      }
      var v = d.ZP.div(o || (o = f(["\n  ", "\n"])), function (e) {
          var r = e.theme,
            t = e.truncate,
            o = e.hasSublabel,
            n = r.colors,
            i = r.text,
            a = r.itemList.label;
          return b(
            {
              overflow: t && "hidden",
              textOverflow: t && "ellipsis",
              whiteSpace: t && "nowrap",
              wordBreak: !t && "break-word",
            },
            (0, u.o3)({
              paddingTop: a.paddingTop,
              paddingBottom: o ? 0 : a.paddingBottom,
            }),
            (0, u.LZ)(b({}, i.shared.normal, i.standard.xlarge)),
            { color: n.black }
          );
        }),
        p = d.ZP.div(n || (n = f(["\n  ", "\n"])), function (e) {
          var r = e.theme,
            t = e.truncate,
            o = r.colors,
            n = r.text,
            i = r.itemList.subLabel;
          return b(
            {
              overflow: t && "hidden",
              textOverflow: t && "ellipsis",
              whiteSpace: t && "nowrap",
              wordBreak: !t && "break-word",
            },
            (0, u.LZ)(b({}, n.shared.normal, n.mention.xlarge)),
            { color: o.grey3 },
            (0, u.o3)(i)
          );
        }),
        g = d.ZP.a(
          i || (i = f(["\n  ", "\n\n  ", "\n  ", "\n"])),
          function (e) {
            var r,
              t,
              o = e.theme,
              n = o.colors,
              i = o.itemList,
              a = i.container,
              l = i.icon;
            return {
              display: "flex",
              alignItems: "center",
              maxWidth: (0, u.ht)(a.maxWidth),
              height: "100%",
              textDecoration: "none",
              transition: "outline-offset .2s ease-in-out",
              outlineOffset: (0, u.ht)(a.outlineOffset),
              "svg:first-child": b({}, (0, u.dp)(l), (0, u.e6)(l)),
              "&:hover, &:focus":
                ((r = { "svg:first-child": { path: { fill: n.grey3 } } }),
                (r[v + "," + p] = {
                  color: n.grey3,
                  textDecoration: "underline",
                  textDecorationColor: n.grey3,
                }),
                r),
              "&:focus": {
                outline:
                  (0, u.ht)(a.outlineWidth) + " solid " + n[a.outlineColor],
                outlineOffset: 0,
              },
              "&:active":
                ((t = { "svg:first-child": { path: { fill: n.primary1 } } }),
                (t[v + "," + p] = {
                  color: n.primary1,
                  textDecoration: "underline",
                  textDecorationColor: n.primary1,
                }),
                t),
            };
          },
          u.bG,
          u.nI
        ),
        m = d.ZP.div(a || (a = f(["\n  ", "\n"])), function (e) {
          var r = e.theme,
            t = r.colors,
            o = r.itemList,
            n = o.itemContainer,
            i = o.arrow;
          return {
            display: "flex",
            flex: "1 1 0rem",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            minHeight: (0, u.ht)(n.minHeight),
            minWidth: 0,
            borderBottom: "1px solid " + t.grey4,
            "svg:last-child": b({}, (0, u.dp)(i), (0, u.e6)(i)),
            "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)":
              { "&:after": { content: '""', minHeight: "inherit" } },
          };
        }),
        k = d.ZP.div(
          l ||
            (l = f([
              "\n  display: flex;\n  flex: 1 1 0rem;\n  flex-direction: column;\n  overflow: hidden;\n",
            ]))
        );
      function x(e) {
        var r = e.id,
          t = e.icon,
          o = e.iconAttrs,
          n = e.label,
          i = e.subLabel,
          a = e.truncateLabel,
          l = e.truncateSubLabel,
          d = (function (e, r) {
            if (null == e) return {};
            var t,
              o,
              n = {},
              i = Object.keys(e);
            for (o = 0; o < i.length; o++)
              (t = i[o]), r.indexOf(t) >= 0 || (n[t] = e[t]);
            return n;
          })(e, h);
        return c.createElement(
          "li",
          null,
          c.createElement(
            g,
            b({ id: r }, d),
            t && c.createElement(t, b({}, o)),
            c.createElement(
              m,
              null,
              c.createElement(
                k,
                null,
                c.createElement(
                  v,
                  {
                    id: r + "-label",
                    truncate: a,
                    hasSublabel: i,
                    title: a && n,
                  },
                  n
                ),
                i && c.createElement(p, { id: r + "-sublabel", truncate: l }, i)
              ),
              c.createElement(s.Z, { color: "primary1" })
            )
          )
        );
      }
      (x.propTypes = {}),
        (x.defaultProps = {
          icon: void 0,
          iconAttrs: void 0,
          subLabel: void 0,
          truncateLabel: !1,
          truncateSubLabel: !1,
        }),
        (r.Z = x);
    },
    4439: function (e, r, t) {
      var o,
        n,
        i,
        a = t(7379).ZP.ul(
          o ||
            ((n = ["\n  margin: 0;\n  padding: 0;\n  list-style: none;\n"]),
            i || (i = n.slice(0)),
            (n.raw = i),
            (o = n))
        );
      r.Z = a;
    },
  },
]);
