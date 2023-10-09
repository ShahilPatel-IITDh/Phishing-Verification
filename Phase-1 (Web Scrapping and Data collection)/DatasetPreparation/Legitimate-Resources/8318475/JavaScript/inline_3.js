window.PARSELY = window.PARSELY || {
      activeTimeout: 60,
      autotrack: false,
      onReady: function() {
        PARSELY.updateDefaults({data:{permutiveid:window.localStorage['permutive-id'] || null}});
        PARSELY.beacon.trackPageView();
      },
    };