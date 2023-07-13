
wp.apiFetch.use( wp.apiFetch.createRootURLMiddleware( "https://www.ebas.ch/wp-json/" ) );
wp.apiFetch.nonceMiddleware = wp.apiFetch.createNonceMiddleware( "d4d37bc25f" );
wp.apiFetch.use( wp.apiFetch.nonceMiddleware );
wp.apiFetch.use( wp.apiFetch.mediaUploadMiddleware );
wp.apiFetch.nonceEndpoint = "https://www.ebas.ch/wp-admin/admin-ajax.php?action=rest-nonce";
