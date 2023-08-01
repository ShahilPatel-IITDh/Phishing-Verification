
wp.apiFetch.use( wp.apiFetch.createRootURLMiddleware( "https://www.ebas.ch/wp-json/" ) );
wp.apiFetch.nonceMiddleware = wp.apiFetch.createNonceMiddleware( "96553a1154" );
wp.apiFetch.use( wp.apiFetch.nonceMiddleware );
wp.apiFetch.use( wp.apiFetch.mediaUploadMiddleware );
wp.apiFetch.nonceEndpoint = "https://www.ebas.ch/wp-admin/admin-ajax.php?action=rest-nonce";
