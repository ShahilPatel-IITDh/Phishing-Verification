
        // if using synchronous loading, will be called once the DOM is ready
        turnstile.ready(function () {
          console.log("hii");
          turnstile.render("#example-container", {
            sitekey: "0x4AAAAAAAJ9NLA3vgPhhl6w",
            callback: function (token) {
              console.log(`Challenge Success ${token}`);
            },
          });
        });
      