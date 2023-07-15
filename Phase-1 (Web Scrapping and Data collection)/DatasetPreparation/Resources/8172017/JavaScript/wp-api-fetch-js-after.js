
wp.apiFetch.use( wp.apiFetch.createRootURLMiddleware( "https://www.ebas.ch/wp-json/" ) );
wp.apiFetch.nonceMiddleware = wp.apiFetch.createNonceMiddleware( "b58efbe306" );
wp.apiFetch.use( wp.apiFetch.nonceMiddleware );
wp.apiFetch.use( wp.apiFetch.mediaUploadMiddleware );
wp.apiFetch.nonceEndpoint = "https://www.ebas.ch/wp-admin/admin-ajax.php?action=rest-nonce";
