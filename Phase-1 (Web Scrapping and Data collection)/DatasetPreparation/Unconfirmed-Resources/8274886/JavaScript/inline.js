
		const replacementLink = 'namecheap.com';
		const host = document.location.host.replace('www.', '');
		function replaceUtmSource(source) {
			return source.replace('utm_source=parkingpage', 'utm_source=' + host);
		}
		for (const link of Array.from(document.getElementsByTagName('a'))) {
			const dataHrefValue = link.getAttribute('data-href');
			if (dataHrefValue && dataHrefValue.includes(replacementLink)) {
				link.setAttribute('data-href', replaceUtmSource(dataHrefValue));
				continue;
			}
			const hrefValue = link.getAttribute('href');
			if (hrefValue && hrefValue.includes(replacementLink)) {
				link.setAttribute('href', replaceUtmSource(hrefValue));
				continue;
			}
		}
	