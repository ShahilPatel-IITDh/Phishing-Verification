
        !(function() {
          try {
            var a = function(c) {
                var v = "(prefers-color-scheme: dark)",
                  h = window.matchMedia(v).matches ? "dark" : "light",
                  r = c === "system" ? h : c,
                  o = document.documentElement,
                  s = document.body,
                  l = "chakra-ui-light",
                  d = "chakra-ui-dark",
                  i = r === "dark";
                return s.classList.add(i ? d : l), s.classList.remove(i ? l : d), o.style.colorScheme = r, o.dataset.theme = r, r
              },
              n = a,
              m = "dark",
              e = "chakra-ui-color-mode",
              t = localStorage.getItem(e);
            t ? a(t) : localStorage.setItem(e, a(m))
          } catch (a) {}
        })();
      