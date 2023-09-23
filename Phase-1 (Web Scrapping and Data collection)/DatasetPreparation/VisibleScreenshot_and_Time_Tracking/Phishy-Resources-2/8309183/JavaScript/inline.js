
    
            var options = {};
            var attrs = {provider: 'sbbkn'};
            new OevcResourceLoader('/idp/co-branding', 'co-branding', 'fr',attrs, options).load();
            // Hide 'remember me' checkbox for mobile devices except for specified providers
            var allowedProviders = ['sbbkn','now'];
            var isMobile = (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
            );
            var rememberMe = document.getElementById('remember-me-container');
            var providerAllowsRememberMe = allowedProviders.filter(function(domain) {
                return attrs.provider && attrs.provider.indexOf(domain) > -1;
            }).length > 0;
            if (rememberMe && (!isMobile || providerAllowsRememberMe)) {
                rememberMe.classList.remove('hidden');
            }
            
