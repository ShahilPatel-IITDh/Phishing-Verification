
( function( domain, translations ) {
	var localeData = translations.locale_data[ domain ] || translations.locale_data.messages;
	localeData[""].domain = domain;
	wp.i18n.setLocaleData( localeData, domain );
} )( "default", {"translation-revision-date":"2021-09-08 19:39:30+0000","generator":"GlotPress\/3.0.0-alpha.2","domain":"messages","locale_data":{"messages":{"":{"domain":"messages","plural-forms":"nplurals=2; plural=n > 1;","lang":"pt_BR"},"Your new password has not been saved.":["Sua nova senha n\u00e3o foi salva."],"Hide":["Esconder"],"Show":["Mostrar"],"Confirm use of weak password":["Confirmar o uso de uma senha fraca"],"Hide password":["Ocultar senha"],"Show password":["Mostrar senha"]}},"comment":{"reference":"wp-admin\/js\/user-profile.js"}} );
