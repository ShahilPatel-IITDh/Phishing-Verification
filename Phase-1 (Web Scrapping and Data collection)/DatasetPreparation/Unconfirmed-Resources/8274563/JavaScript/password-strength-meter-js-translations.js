
( function( domain, translations ) {
	var localeData = translations.locale_data[ domain ] || translations.locale_data.messages;
	localeData[""].domain = domain;
	wp.i18n.setLocaleData( localeData, domain );
} )( "default", {"translation-revision-date":"2021-09-08 19:39:30+0000","generator":"GlotPress\/3.0.0-alpha.2","domain":"messages","locale_data":{"messages":{"":{"domain":"messages","plural-forms":"nplurals=2; plural=n > 1;","lang":"pt_BR"},"%1$s is deprecated since version %2$s! Use %3$s instead. Please consider writing more inclusive code.":["%1$s est\u00e1 obsoleta desde a vers\u00e3o %2$s. Use %3$s como alternativa. Considere escrever um c\u00f3digo mais inclusivo."]}},"comment":{"reference":"wp-admin\/js\/password-strength-meter.js"}} );
