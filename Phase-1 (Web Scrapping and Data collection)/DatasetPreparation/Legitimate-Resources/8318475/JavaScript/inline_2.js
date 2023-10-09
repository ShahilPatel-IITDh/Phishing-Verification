(() => {
      function gtag(...args){
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({...args});
      }
  
      let consent = {
        analytics_storage: window.Fenrir.continentCode === 'EU' ? 'denied' : 'granted',
        ad_storage: window.Fenrir.continentCode === 'EU' ? 'denied' : 'granted',
        ads_data_redaction: window.Fenrir.continentCode === 'EU',
      };
  
      let stored = window.localStorage.getItem('fenrir-ga-consent');
  
      try {
        stored = JSON.parse(stored);
        if (
          !['granted', 'denied'].includes(stored.analytics_storage)
          || !['granted', 'denied'].includes(stored.ad_storage)
          || ![true, false].includes(stored.ads_data_redaction)
        ) throw new Error('invalid fenrir-ga-consent value');
  
        consent.analytics_storage = stored.analytics_storage;
        consent.ad_storage = stored.ad_storage;
        consent.ads_data_redaction = stored.ads_data_redaction;
      } catch(e) {
        // noop
      }
  
      window.localStorage.setItem('fenrir-ga-consent', JSON.stringify(consent));
  
      const { analytics_storage, ad_storage, ads_data_redaction } = consent;
  
      gtag('consent', 'default', { analytics_storage, ad_storage, wait_for_update: 500 });
      gtag('set', 'ads_data_redaction', ads_data_redaction);
    })()