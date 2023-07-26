jQuery(document).ready(function ($) {
  $(document).on('input', 'input', function () {
    validate($(this));
  });
  // let validText = document.getElementById('validPhone');
  let invalidText = document.getElementById('invalidPhone');
  let invalidTextQ = document.getElementById('invalidPhoneQ');
  let invalidEmail = document.getElementById('invalidEmail');
  let invalidEmailQ = document.getElementById('invalidEmailQ');
  let btn = document.getElementById('btn');
  let btnQ = document.getElementById('btn');
  function validate(that) {
    if (that.attr('type') == 'text') {
      console.log(222);
      if (that.val()) {
        that.removeClass('error').addClass('valid');
      } else {
        that.removeClass('valid').addClass('error');
      }
    } else if (that.attr('type') == 'email') {
      if (validateEmail(that.val()) === false) {
        that.removeClass('valid').addClass('error');
        btn.disabled = true;
        btnQ.disabled = true;
        invalidEmail.style.display = 'block';
        invalidEmailQ.style.display = 'block';
      } else {
        that.removeClass('error').addClass('valid');
        btn.disabled = false;
        btnQ.disabled = false;
        invalidEmail.style.display = 'none';
        invalidEmailQ.style.display = 'none';
      }
    } else if (that.attr('type') == 'tel') {
      if (that.intlTelInput("isValidNumber")) {
        that.removeClass('error').addClass('valid');
        btn.disabled = false;
        btnQ.disabled = false;
        invalidText.style.display = 'none';
        invalidTextQ.style.display = 'none';
       
      } else {
        that.removeClass('valid').addClass('error');
        btn.disabled = true;
        btnQ.disabled = true;
        invalidText.style.display = 'block';
        invalidTextQ.style.display = 'block';
      


      }
    }
  }

  function validateEmail(email) {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(String(email).toLowerCase());
  }
  $('input[type="tel"]').each(function () {
    $(this).intlTelInput({
      nationalMode: true,
      separateDialCode: true,
      initialCountry: "auto",
      autoPlaceholder: "aggressive",
      hiddenInput: "realPhone",
      excludeCountries: ["ua"],
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
      geoIpLookup: function (success, failure) {
        $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
          countryCode = "PL";
          success(countryCode);
        });
      }
    });
  });
 
  
  $(phone).on("countrychange", function(event) {

    // Get the selected country data to know which country is selected.
    var selectedCountryData = iti.getSelectedCountryData();

    // Get an example number for the selected country to use as placeholder.
    newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils.numberFormat.INTERNATIONAL),

      // Reset the phone number input.
      iti.setNumber("");

    // Convert placeholder as exploitable mask by replacing all 1-9 numbers with 0s
    mask = newPlaceholder.replace(/[1-9]/g, "0");

    // Apply the new mask for the input
    $(this).mask(mask);
  });


  // When the plugin loads for the first time, we have to trigger the "countrychange" event manually, 
  // but after making sure that the plugin is fully loaded by associating handler to the promise of the 
  // plugin instance.

  iti.promise.then(function() {
    $(phoneInputID).trigger("countrychange");
  });
});
