
        function startCaptchaObserver() {
            const element = document.querySelector("#c_login_captchaadmin_CaptchaImage_HelpLink");

            if (element) {
                const observer = new MutationObserver(handleCaptchaMutations);
                observer.observe(element, {
                    childList: true,
                    subtree: true
                });
			}
        }

        function handleCaptchaMutations(mutations) {
            mutations.forEach(mutation => {
                if (mutation.target.tagName === "A") {
                    const img = mutation.target.querySelector("img");
                    if (img) {
                        updateCaptchaImageSize();
                    }
                }
            });
        }

        function updateCaptchaImageSize() {
            const captchaImage = document.querySelector("#c_login_captchaadmin_CaptchaImage");
            if (captchaImage && (!captchaImage.style.width || !captchaImage.style.height)) {
                captchaImage.style.width = "163px";
                captchaImage.style.height = "40px";
			}

            const captchaDiv = document.querySelector("#c_login_captchaadmin_CaptchaIconsDiv");
            if (captchaDiv && (!captchaDiv.style.width || !captchaDiv.style.height)) {
                captchaDiv.style.position = "relative";
                captchaDiv.style.left = "24px";
			}

            document.getElementsByClassName("BDC_ReloadIcon").alt = 'Aggiorna il codice CAPTCHA';
            document.getElementsByClassName("BDC_SoundIcon").alt = 'Ascolta il codice CAPTCHA';
        }

        document.addEventListener("DOMContentLoaded", function () {
            startCaptchaObserver();
			updateCaptchaImageSize();
		});

		$(document).ready(function () {
			$('.BDC_ReloadIcon').attr('title', 'Aggiorna il codice CAPTCHA');
			$('.BDC_SoundIcon').attr('title', 'Ascolta il codice CAPTCHA');
		});

		
		
				var siteKey = '6Lc3NDsmAAAAAFQCrv9YkUrgDYUUTJnnqzY7LZzB';

                grecaptcha.ready(function () {
                    grecaptcha.execute(siteKey, { action: 'login' }).then(function (token) {
                        // Add your logic to submit to your backend server here.
                        document.getElementById('g-recaptcha-response').value = token;
                    });
					});
		
		

    