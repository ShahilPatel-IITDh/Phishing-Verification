
// May 2001
// Tim Russell
// ------------------------------------
// Javascript form validation utilities
// ------------------------------------

// validateForm takes two parameters:
// 		formName is a string containing the name of the form in the referring
//			document
//		fieldInfo is a 2-dimensional array, a list of sublists which are
//			themselves 3-element arrays, containing the following values:
//			[0]			Name of field (string)
//			[1]			Type of field, which may be one of the following:
//								"name"
//								"address"
//								"phone"
//								"phoneac"
//								"phoneprefix"
//								"phoneexchange"
//								"city"
//								"state2"
//								"state"
//								"zip"
//								"email"
//								"money"
//								"cc"
//								"monthno"
//								"monthname"
//								"dayno"
//								"year2"
//								"year4"
//								"url"
//								"number"
//								"none"
//							Any other values will be ignored by the function, and validation
//							will not be performed on the field.
//			[2]			The field name as it will appear to the user (string)
//			[3]			A boolean value denoting whether the field is required
//
//			Note: A 5th parameter is optional for type="phone"; a boolean which determines
//				whether an area code is required.
//
// If the form fields are determined to be valid, true is returned.
// If the form fields are determined to be invalid, an alert box will appear
// 		notifying the user of the errors made, and false is returned.
function validateForm(formName, fieldInfo) {
	errormsg = "";
	for (i=0; i<fieldInfo.length; i++) {
//		alert(i + ":  " + fieldInfo[i][2] + " contains '" + eval("document." + formName + "." + fieldInfo[i][0] + ".value") + "' and is of type " + fieldInfo[i][1] + ". It is " + (fieldInfo[i][3] ? "" : "not ") + "required.");

		if (fieldInfo[i][3] && isBlank(eval("document." + formName + "." + fieldInfo[i][0] + ".value")))
			result = " is a required field";
		else {
			switch(fieldInfo[i][1].toLowerCase()) {
				case "name":
					result = isValidName(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "address":
					result = isValidAddress(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "phone":
					result = isValidPhone(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "phoneac":
				case "phoneprefix":
					result = isValidPhoneACorPrefix(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "phoneexchange":
					result = isValidPhoneExchange(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "city":
					result = isValidCity(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "state2":
					result = isValidStateAbbr(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "state":
					result = isValidState(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "zip":
					result = isValidZip(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "email":
					result = isValidEmail(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "money":
					result = isValidMoneyAmt(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "cc":
					result = isValidCC(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "monthno":
					result = isValidMonthNo(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "monthname":
					result = isValidMonthName(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "dayno":
					result = isValidDayNo(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "year2":
					result = isValidYear2(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "year4":
					result = isValidYear4(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "url":
					result = isValidURL(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "number":
					result = isValidNumber(eval("document." + formName + "." + fieldInfo[i][0] + ".value"));
					break;
				case "none":
					result = true;
					break;
			}
		}	
		
//		alert(i);
		
		// if an error in the field was found...
		if (result != true) {
			// if it was a blank field and a blank field is allowed, just continue
			if (isBlank(eval("document." + formName + "." + fieldInfo[i][0] + ".value")) && !fieldInfo[i][3])
				;
			// otherwise
			else {
				// if this was the first error msg, add the header before doing anything else
				if (errormsg == "")
					errormsg = "The form could not be submitted: \n\n";
				// append the error for this field to the larger error message
				// field name + error + (optional "you can leave this blank" msg)
				// optional part will appear when the field was not blank, but could be left blank (fieldInfo[i][2] == false)
				errormsg += "     " + fieldInfo[i][2] + result + ((!isBlank(eval("document." + formName + "." + fieldInfo[i][0] + ".value")) && !fieldInfo[i][3]) ? ", or may be left blank" : "") + ".\n";
			}
		}
	}

	if (errormsg != "") {
		errormsg += "\nPlease check the above and try again.";
		alert(errormsg);
		return false;
	}
	
//	alert("Input was ok.");
	return true;
}




// *****************************************************************************
// FORM VALIDATION TESTS
// ---------------------
// isValidName(value)
// isValidAddress(value)
// isValidPhone(value, forceAC)
// isValidPhoneACorPrefix(value)
// isValidPhoneExchange(value)
// isValidCity(value)
// isValidStateAbbr(value)
// isValidState(value)
// isValidZip(value)
// isValidEmail(value)
// isValidMoneyAmt(value)
// isValidCC(value)
// isValidMonthNo(value)
// isValidMonthName(value)
// isValidDayNo(value)
// isValidYear2(value)
// isValidYear4(value)
// isValidURL(value)											(in progress)
// isValidNumber(value)
// isBlank(value)
// ---------------------
// Tests for determining whether the contents of a field are valid.
// These tests return TRUE if contents are valid, or return a string
// 		explaining the error if the contents are not valid.
// All functions require one parameter:
// 		Value to test (string)
// *****************************************************************************

// tests whether a name field is valid
function isValidName(value) {
//		/^ *[a-zA-Z]+([a-zA-Z0-9]| |'|-)+$/
	if (value.search(/^\s*[a-zA-Z]+([a-zA-Z0-9]|\s|'|-)*$/) == -1)
		return " field must contain a valid name";
	return true;
}

// tests whether an address field is valid
function isValidAddress(value) {
//		/^ *(\s|\.|-|#|\/)+(\s|\.|-|#|\/| )*$/
	if (value.search(/^\s*(\w|\.|-|#|\/)+(\w|\.|-|#|\/|\s)*$/) == -1)
		return " field must contain a valid address";
	return true;
}

// tests whether a phone number field is valid
// takes an extra boolean parameter, forceAC, which determines whether an area code is required
// allows numeric, whitespace, and other specific characters
function isValidPhone(value, forceAC) {
//		area code required:
//		/^ *\(?[0-9]{3}(\)|-)? ?[0-9]{3}-?[0-9]{4} *$/				old
//		/^ *\(?[0-9]{3}(\)|-)? ?[0-9]{3}-?[0-9]{4} *((x|x\.|ext|ext\.|extension) ?[0-9]*)? *$/
//		area code not required:
//		/^ *(\(?[0-9]{3}(\)|-)? ?)?[0-9]{3}-?[0-9]{4} *$/			old
//		/^ *(\(?[0-9]{3}(\)|-)? ?)?[0-9]{3}-?[0-9]{4} *((x|x\.|ext|ext\.|extension) ?[0-9]*)? *$/

	if (forceAC) {
		if (value.search(/^\s*\(?[0-9]{3}(\)|-)?\s?[0-9]{3}-?[0-9]{4}\s*((x|x\.|ext|ext\.|extension)\s?[0-9]*)?\s*$/) == -1)
			return " field must contain a valid phone number with area code";
	}
	else if (value.search(/^\s*(\(?[0-9]{3}(\)|-)?\s?)?[0-9]{3}-?[0-9]{4}\s*((x|x\.|ext|ext\.|extension)\s?[0-9]*)?\s*$/) == -1)
			return " field must contain a valid phone number";
	return true;
}

// tests whether a phone number area code or prefix is valid
// allows only strings with 3 numeric characters
function isValidPhoneACorPrefix(value) {
	if (value.search(/^[0-9]{3}$/) == -1)
		return " field must contain 3 digits";
	return true;
}

// tests whether a phone number exchange (last 4 digits) is valid
// allows only strings with 4 numeric characters
function isValidPhoneExchange(value) {
	if (value.search(/^[0-9]{4}$/) == -1)
		return " field must contain 4 digits";
	return true;
}

// tests whether a city field is valid
// allows alphanumeric, whitespace, and other specific characters
function isValidCity(value) {
//		/^ *[a-zA-Z]+([a-zA-Z0-9]| |'|-)+$/
	if (value.search(/^\s*[a-zA-Z]+([a-zA-Z0-9]|\s|'|-)+$/) == -1)
		return " field must be a valid city name";
	return true;
}

// tests whether a 2-letter state abbreviation is valid
// allows only specific 2-letter codes for the 50 states, Washington DC (DC), 
//		Guam (GU), Puerto Rico (PR), and the Virgin Islands (VI)
// valid canadian province abbreviations (not used):	AB	BC	NB	NS	ON	OT	QB
function isValidStateAbbr(value) {
//		/^AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY$/i
	if (value.search(/^AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY$/i) == -1)
		return " field must be a valid 2-letter state/territory abbreviation";
	return true;
}

// tests whether a state field is valid
// allows alphabetic and whitespace characters
function isValidState(value) {
	if (value.search(/^\s*[a-zA-Z]+([a-zA-Z]|\s)+$/) == -1)
		return " field must be a valid state/territory/province name";
	return true;
}

// tests whether a zip code is valid
// allows either 5-digit or 5+4 form (with or without a hyphen)
function isValidZip(value) {
	if (value.search(/^\s*[0-9]{5}(-([0-9]{4}))?\s*$/) == -1)
		return " field must be a valid zip code in ##### or #####-#### form";
	return true;
}

// tests whether an email address is valid
function isValidEmail(value) {
	if (value.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]{2,3}\s*$/) == -1)
		return " field must be a valid email address";
	return true;
}

// tests whether a money amount is valid
function isValidMoneyAmt(value) {
//at least one dollar, decimal and cents optional
// [0-9]+(,|[0-9])*(\.[0-9]{0,2})?
//dollars optional, decimal and cents required
// ([0-9]+(,|[0-9])*)?\.[0-9]{1,2}
//combined: ([0-9]+(\.[0-9]{0,2})?|[0-9]*\.[0-9]{1,2})

// with dollar sign:
//	if (value.search(/^\s*\$?\s*([0-9]+(\.[0-9]{0,2})?|[0-9]*\.[0-9]{1,2})\s*$/) == -1)
	if (value.search(/^\s*([0-9]+(\.[0-9]{0,2})?|[0-9]*\.[0-9]{1,2})\s*$/) == -1)
		return " field must contain a valid dollar amount";
	return true;
}

// tests whether a credit card number is valid
function isValidCC(value) {
	// relies on several checks:
	// 	Visa cards have 13 or 16 digits,
	//	Mastercard and Discover have 16 digits, and
	// 	American Express has 15 digits
	// also:
	// 	American Express cards start with "3",
	//	Visa starts with "4",
	//	Mastercard starts with "5", and
	// 	Discover starts with "6"
	
	// A card number checksum verification utility is available at
	// http://www.inquiry.com/techtips/js_pro/10min/10min0699/listing1.htm

	numbers = 0;
	firstDigit = -1;
	othersAllowed = " \t\r\n\f";
	firstDigitsAllowed = "3456";
	for (j=0; j<value.length; j++) {
		if ('0' <= value.charAt(j) && value.charAt(j) <= '9') {
			numbers++;
			if (firstDigit == -1)
				firstDigit = i;
		}
		else if (othersAllowed.indexOf(value.charAt(j)) == -1)
			return " field may only contain digits and spaces";
	}
	if (firstDigit == -1)
		return " field must contain a valid credit card number";
	if ((numbers != 13 && numbers != 15 && numbers != 16) ||
			firstDigitsAllowed.indexOf(value.charAt(firstDigit)) == -1 ||
			(value.charAt(firstDigit) == '3' && numbers != 15) ||
			(value.charAt(firstDigit) == '4' && numbers != 13 && numbers != 16) ||
			((value.charAt(firstDigit) == '5' || value.charAt(firstDigit) == '6') && numbers != 16)		)
		return " field must contain a valid credit card number";
	return true;
}

// tests whether a 2-digit month is valid
function isValidMonthNo(value) {
	if (value.search(/^([0-9]{2}|\s?[0-9])$/) == -1)
		return " field must contain a valid 2-digit month number";
	if (Number(value) < 1 || Number(value) > 12)
		return " field must contain a valid 2-digit month number";
	return true;	
}

// tests whether a month name is valid (does not check
// spelling; only that it is one word and composed of
// alphabetic characters)
function isValidMonthName(value) {
	if (value.search(/^\s*[a-zA-Z]*\s*$/) == -1)
		return " field must be a valid month name";
	return true;
}

// tests whether a 2-digit day (of month) is valid
function isValidDayNo(value) {
	if (value.search(/^([0-9]{2}|\s?[0-9])$/) == -1)
		return " field must contain a valid 2-digit day of month";
	if (Number(value) < 1 || Number(value) > 31)
		return " field must contain a valid 2-digit day of month";
	return true;	
}

// tests whether a 2-digit year is valid
function isValidYear2(value) {
	if (value.search(/^[0-9]{2}$/) == -1)
		return " field must contain a valid 2-digit year";
	return true;	
}

// tests whether a 4-digit year is valid
function isValidYear4(value) {
	if (value.search(/^[0-9]{4}$/) == -1)
		return " field must contain a valid 4-digit year";
	return true;	
}

// tests whether a URL is valid
// NOTE: does not currently work; need a good regexp for URLs
function isValidURL(value) {
//	if (value.search(/^\s*(https?:\/\/)?[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]{2,3}  (\/)?  \s*$/) == -1)
	return true;	
}

// tests whether a field contains an integer
function isValidNumber(value) {
	if (value.search(/^[0-9]*$/) == -1)
		return " field must contain a valid numeric value";
	return true;	
}

// tests whether a field is blank, or composed entirely of whitespace
function isBlank(value) {
	return !(value.search(/^\s*$/) == -1);
}