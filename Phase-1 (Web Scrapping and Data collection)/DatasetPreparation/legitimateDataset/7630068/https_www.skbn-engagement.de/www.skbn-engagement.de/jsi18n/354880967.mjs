

(function(globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function(n) {
    var v=n != 1;
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  /* gettext library */

  django.catalog = django.catalog || {};
  
  var newcatalog = {
    "%(sel)s of %(cnt)s selected": [
      "%(sel)s von %(cnt)s ausgew\u00e4hlt",
      "%(sel)s von %(cnt)s ausgew\u00e4hlt"
    ],
    "%s / %s ( %s characters missing)": "%s / %s ( %s Zeichen fehlen)",
    "%s / %s ( %s too many characters)": "%s / %s ( %s Zeichen zu viel)",
    "%s / %s characters": "%s / %s Zeichen",
    ", plus %s %s on actually donated value": ", plus %s %s auf den tats\u00e4chlich gespendeten Wert",
    ", plus %s %s per cashed in code": "plus %s %s pro eingel\u00f6stem Code",
    ", plus %s% and %s %s on actually donated value": ", plus %s% aund %s %s auf den tats\u00e4chlich gespendeten Wert",
    ", plus %s% on actually donated value": ", plus %s% o auf den tats\u00e4chlich gespendeten Wert",
    "2 clicks for more privacy: When you click here the social media plugin for facebook will be activated. As soon as the button is activated data will be send to third parties. For more information you can find our privacy policy at the end of the page.": "2 Klicks f\u00fcr mehr Datenschutz: Erst wenn Sie hier klicken, wird der Button aktiv und das Facebook Social-Media Plugin wird aktiviert. Schon beim Aktivieren werden Daten an Dritte \u00fcbertragen. F\u00fcr mehr Informationen finden sie unsere Datenschutzerkl\u00e4rung am Ende der Seite.",
    "2 clicks for more privacy: When you click here the social media plugin for twitter will be activated. As soon as the button is activated data will be send to third parties. For more information you can find our privacy policy at the end of the page.": "2 Klicks f\u00fcr mehr Datenschutz: Erst wenn Sie hier klicken, wird der Button aktiv und das Twitter Social-Media Plugin wird aktiviert. Schon beim Aktivieren werden Daten an Dritte \u00fcbertragen. F\u00fcr mehr Informationen finden sie unsere Datenschutzerkl\u00e4rung am Ende der Seite.",
    "2 clicks for more privacy: When you click here the social media plugin for whatsapp will be activated. As soon as the button is activated data will be send to third parties. For more information you can find our privacy policy at the end of the page.": "2 Klicks f\u00fcr mehr Datenschutz: Erst wenn Sie hier klicken, wird der Button aktiv und das WhatsApp Social-Media Plugin wird aktiviert. Schon beim Aktivieren werden Daten an Dritte \u00fcbertragen. F\u00fcr mehr Informationen finden sie unsere Datenschutzerkl\u00e4rung am Ende der Seite.",
    "6 a.m.": "6 Uhr",
    "6 p.m.": "18 Uhr",
    "A new style-file will be generated! It may take a few minutes until everything is generated!": "Eine neue Style-Datei wird generiert! Es kann ein paar Minuten dauern bis alles generiert ist!",
    "Add Customer Milestones": "Customer Milestones hinzuf\u00fcgen",
    "Add User": "Nutzer hinzuf\u00fcgen",
    "Add existing user": "Existierenden Nutzer hinzuf\u00fcgen",
    "An error occurred!": "Ein Fehler ist aufgetreten!",
    "April": "April",
    "Are you sure that you want to delete this scheduled task?": "M\u00f6chten Sie den geplanten Task wirklich l\u00f6schen?",
    "Are you sure you want to delete %s?": "M\u00f6chten Sie %s wirklich l\u00f6schen?",
    "Are you sure you want to delete this need?": "M\u00f6chten Sie den Bedarf wirklich l\u00f6schen?",
    "Assignee": "Verantwortlicher",
    "August": "August",
    "Available %s": "Verf\u00fcgbare %s",
    "Be patient!": "Bitte haben Sie etwas Geduld!",
    "Blob is not supported. Use a Buffer instead.": "Blob wird nicht unterst\u00fctzt. Verwenden Sie stattdessen einen Puffer.",
    "Cancel": "Abbrechen",
    "Choose": "Ausw\u00e4hlen",
    "Choose a Date": "Datum w\u00e4hlen",
    "Choose a Time": "Uhrzeit w\u00e4hlen",
    "Choose a time": "Uhrzeit",
    "Choose all": "Alle ausw\u00e4hlen",
    "Chosen %s": "Ausgew\u00e4hlte %s",
    "Click to choose all %s at once.": "Klicken, um alle %s auf einmal auszuw\u00e4hlen.",
    "Click to remove all chosen %s at once.": "Klicken, um alle ausgew\u00e4hlten %s auf einmal zu entfernen.",
    "Code successfully redeemed!": "Code erfolgreich eingel\u00f6st!",
    "Company name can not be empty!": "Geben Sie bitte den Namen deines Unternehmens ein!",
    "Cookie-Error!": "Cookie-Error!",
    "Cookies are deactivated. Please enable cookies in your browser.": "Cookies sind deaktiviert. Bitte aktivieren Sie Cookies in Ihrem Browser.",
    "Customer Number": "Kundennummer",
    "Days": "Tage",
    "December": "Dezember",
    "Defunding failed.": "Stornieren fehlgeschlagen.",
    "Delete scheduled task.": "Geplanten Task l\u00f6schen.",
    "Description": "Beschreibung",
    "Due date": "F\u00e4lligkeitsdatum",
    "Email can not be empty!": "Geben Sie bitte eine g\u00fcltige E-Mail-Adresse ein!",
    "February": "Februar",
    "Filter": "Filter",
    "Free shipping": "Kostenloser Versand",
    "Hey User!": "Hallo User!",
    "Hide": "Ausblenden",
    "Hour": "Stunde",
    "Hours": "Stunden",
    "In Progress. Don't close the window until all your images are uploaded successfully.": "In Bearbeitung. Schlie\u00dfen Sie nicht das Fenster bevor alle Ihre Bilder erfolgreich hochgeladen sind.",
    "January": "Januar",
    "July": "Juli",
    "June": "Juni",
    "Limit exceeded!": "Limit \u00fcberschritten!",
    "March": "M\u00e4rz",
    "Math": "Math",
    "May": "Mai",
    "Medium": "Mittel",
    "Merchant-ID": "H\u00e4ndler-ID",
    "Midnight": "Mitternacht",
    "Minute": "Minute",
    "Minutes": "Minuten",
    "Months": "Monate",
    "Network Error": "Netzwerkfehler",
    "No Tasks set yet.": "Bisher sind keine Aufgaben angelegt.",
    "No cookies enabled!": "Keine Cookies aktiviert!",
    "Noon": "Mittag",
    "Note: You are %s hour ahead of server time.": [
      "Achtung: Sie sind %s Stunde der Serverzeit vorraus.",
      "Achtung: Sie sind %s Stunden der Serverzeit vorraus."
    ],
    "Note: You are %s hour behind server time.": [
      "Achtung: Sie sind %s Stunde hinter der Serverzeit.",
      "Achtung: Sie sind %s Stunden hinter der Serverzeit."
    ],
    "November": "November",
    "Now": "Jetzt",
    "October": "Oktober",
    "Order changed successfully!": "Reihenfolge erfolgreich ge\u00e4ndert!",
    "Passwords do not match!": "Die Passw\u00f6rter stimmen nicht \u00fcberein!",
    "Please be sure to clear your Cache to see every change.": "Bitte l\u00f6schen Sie Ihren Cache um alle \u00c4nderungen zu sehen.",
    "Please choose:": "W\u00e4hlen Sie bitte:",
    "Please clear your Cache!": "Bitte l\u00f6schen Sie Ihren Cache!",
    "Please enter a city!": "Geben Sie bitte einen Ort an!",
    "Please enter a contact person!": "Geben Sie bitte eine Kontaktperson an!",
    "Please enter a country!": "Geben Sie bitte ein Land an!",
    "Please enter a first name!": "Geben Sie bitte einen Vornamen an!",
    "Please enter a last name!": "Geben Sie bitte einen Nachnamen an!",
    "Please enter a phone number!": "Geben Sie bitte eine Telefonnummer an!",
    "Please enter a postal code!": "Geben Sie bitte eine Postleitzahl an!",
    "Please enter a street!": "Geben Sie bitte eine Stra\u00dfe an!",
    "Please enter a valid email address!": "Geben Sie bitte eine g\u00fcltige E-Mail-Adresse an!",
    "Please enter a website!": "Geben Sie bitte eine Webseite an!",
    "Please fill out all required fields correctly.": "Bitte f\u00fcllen Sie alle Pflichtfelder korrekt aus.",
    "Please make an input or log in. If we do not see any activity after<br><span class=\"lazyuser-countdown\"></span>,<br> this session will automatically end.": "Bitte t\u00e4tigen Sie eine Eingabe oder melden Sie sich an. Wenn wir nach <br><span class=\"lazyuser-countdown\"></span><br> keine Aktivit\u00e4t verzeichnen, wird diese Sitzung automatisch beendet.",
    "Please upload a Logo and a Photo.": "Bitte laden Sie ein Logo und ein Foto hoch.",
    "Please upload a Logo.": "Bitte laden Sie ein Logo hoch.",
    "Please upload a Notice of Exemption.": "Bitte laden Sie einen Freistellungsbescheid hoch.",
    "Please upload a Photo.": "Bitte laden Sie ein Foto hoch.",
    "Please upload a document of proof.": "Bitte laden Sie ein Dokument als Nachweis hoch.",
    "Project Password": "Projekt Passwort",
    "Project-ID": "Projekt-ID",
    "RegExp": "RegExp",
    "Remove": "Entfernen",
    "Remove all": "Alle entfernen",
    "Request aborted": "Anfrage abgebrochen",
    "Request failed with status code ": "Anfrage fehlgeschlagen mit Statuscode ",
    "Second": "Sekunde",
    "Seconds": "Sekunden",
    "Select File": "Datei ausw\u00e4hlen",
    "September": "September",
    "Show": "Einblenden",
    "Something went wrong. Please try again in a minute.": "Etwas ist schiefgelaufen. Bitte versuchen Sie es sp\u00e4ter nochmals.",
    "Something went wrong. Please try again or contact the support.": "Etwas ist schiefgelaufen. Bitte versuchen Sie es sp\u00e4ter nochmals.",
    "Sorry! We didn't find any articles to help you. Please try another search term or go to the help page to see all the articles we provide you.": "Entschuldigung! Wir konnten keinen Artikel finden um Ihnen zu helfen. Bitte versuchen Sie einen anderen Begriff zu suchen oder gehen Sie zu der Hilfeseite um alle Artikel anzusehen.",
    "Strong": "Stark",
    "Success": "Erfolgreich",
    "Successfully created!": "Erfolgreich erstellt!",
    "Successfully defunded": "Erfolgreich storniert",
    "Successfully deleted a need.": "Bedarf erfolgreich gel\u00f6scht.",
    "Successfully deleted!": "Erfolgreich gel\u00f6scht!",
    "Successfully duplicated": "Erfolgreich dupliziert",
    "Successfully funded": "Projekt erfolgreich gef\u00f6rdert mit",
    "Successfully saved!": "Erfolgreich gespeichert!",
    "Successfully updated information.": "Informationen erfolgreich aktualisiert.",
    "Successfully updated payment information.": "Zahlungsinformationen erfolgreich aktualisiert.",
    "Successfully updated!": "Erfolgreich gespeichert!",
    "Tasks for organization": "Aufgaben f\u00fcr Organisation",
    "Tasks for project": "Aufgaben f\u00fcr Projekt",
    "The Company name has to be 3 - 40 characters long!": "Der Name des Unternehmens muss mindestens 3 bis 40 Zeichen haben!",
    "The Username has to be 3 - 30 characters long!": "Der Benutzername muss mindestens 3 bis 30 Zeichen haben!",
    "The donation amount must be at least %s %s.": "Der Spendenbetrag muss mindestens %s %s betragen.",
    "The error has been logged and our team is working on resolving the issue.": "Der Fehler wurde protokolliert und unser Team arbeitet an der L\u00f6sung des Problems.",
    "The file will now be generated. You will soon receive an e-mail with the download link.": "Die Datei wird nun erstellt. Sie erhalten eine E-Mail mit dem Downloadlink.",
    "The following codes are not valid anymore and have been removed: ": "Die folgenden Codes sind nicht mehr g\u00fcltig und wurden entfernt: ",
    "The maximum amount for a private donation was exceeded. This currently amounts to ": "Der H\u00f6chstbetrag f\u00fcr eine private Spende wurde \u00fcberschritten. Dieser bel\u00e4uft sich derzeit auf ",
    "The organization name has to be 3 - 128 characters long!": "Der Name des Unternehmens muss zwischen 3 und 128 Zeichen haben!",
    "The username has to be 3 - 30 characters long!": "Der Benutzername muss mindestens 3 bis 30 Zeichen haben!",
    "These are the suggested help articles for your search. If you looking for something else please use the search field above.": "Dies sind die vorgeschlagenen Hilfeartikel f\u00fcr diese Seite. Wenn Sie etwas anderes brauchen, suchen Sie es bitte mit dem Suchfeld oben.",
    "This is not a valid number (00 49 123456)!": "Das ist keine g\u00fcltige Nummer (00 49 123456)!",
    "This is the list of available %s. You may choose some by selecting them in the box below and then clicking the \"Choose\" arrow between the two boxes.": "Dies ist die Liste der verf\u00fcgbaren %s. Einfach im unten stehenden Feld markieren und mithilfe des \"Ausw\u00e4hlen\"-Pfeils ausw\u00e4hlen.",
    "This is the list of chosen %s. You may remove some by selecting them in the box below and then clicking the \"Remove\" arrow between the two boxes.": "Dies ist die Liste der ausgew\u00e4hlten %s. Einfach im unten stehenden Feld markieren und mithilfe des \"Entfernen\"-Pfeils wieder entfernen.",
    "This value may contain only letters (no umlauts), numbers and  - _ characters. Spaces are not allowed.": "Dieses Feld darf nur Buchstaben (keine Umlaute), Zahlen (0-9), Minus (-) und Unterstrich (_) enthalten. Leerzeichen sind nicht erlaubt.",
    "Today": "Heute",
    "Tomorrow": "Morgen",
    "Type into this box to filter down the list of available %s.": "Durch Eingabe in diesem Feld l\u00e4sst sich die Liste der verf\u00fcgbaren %s eingrenzen.",
    "Unknown option ": "Unbekannte Option ",
    "Unsupported protocol ": "Nicht unterst\u00fctztes Protokoll ",
    "Update Customer Milestone": "Customer Milestone \u00e4ndern",
    "Uploading and editing is currently disabled.": "Das Hochladen und Bearbeiten ist derzeit deaktiviert.",
    "Username can not be empty!": "Geben Sie bitte einen Benutzernamen ein!",
    "Voucher": "Gutschein",
    "Weak": "Schwach",
    "Website must be valid!": "Geben Sie bitte eine g\u00fcltige Webseite an!",
    "Whoops!": "Ups!",
    "Yeah!": "Yeah!",
    "Year": "Jahr",
    "Years": "Jahre",
    "Yesterday": "Gestern",
    "You are using an outdated Browser. This can lead to some problems with the website. Please use new version of <a href='http://www.mozilla.org/firefox'>Firefox</a>, <a href='http://www.google.com/chrome'>Chrome</a>, <a href='http://www.apple.com/safari'>Safari</a> or <a href='http://www.microsoft.com/internetexplorer/'>Internet Explorer</a>.": "Sie benutzten einen veralteten Browser. Das kann zu Problemen mit der Webseite f\u00fchren. Bitte benutzen Sie eine neue Version von <a href='http://www.mozilla.org/firefox'>Firefox</a>, <a href='http://www.google.com/chrome'>Chrome</a>, <a href='http://www.apple.com/safari'>Safari</a> oder <a href='http://www.microsoft.com/internetexplorer/'>Internet Explorer</a>.",
    "You can drag and drop your file(s) here.": "Sie k\u00f6nnen Ihre Datei(en) hier reinziehen.",
    "You can't delete this item!": "Sie k\u00f6nnen dieses Objekt nicht l\u00f6schen!",
    "You do not have %s!": "Sie haben keine %s!",
    "You have selected an action, and you haven't made any changes on individual fields. You're probably looking for the Go button rather than the Save button.": "Sie haben eine Aktion ausgew\u00e4hlt, aber keine \u00c4nderungen an bearbeitbaren Feldern vorgenommen. Sie wollten wahrscheinlich auf \"Ausf\u00fchren\" und nicht auf \"Speichern\" klicken.",
    "You have selected an action, but you haven't saved your changes to individual fields yet. Please click OK to save. You'll need to re-run the action.": "Sie haben eine Aktion ausgew\u00e4hlt, aber ihre vorgenommenen \u00c4nderungen nicht gespeichert. Klicken Sie OK, um dennoch zu speichern. Danach m\u00fcssen Sie die Aktion erneut ausf\u00fchren.",
    "You have unsaved changes on individual editable fields. If you run an action, your unsaved changes will be lost.": "Sie haben \u00c4nderungen an bearbeitbaren Feldern vorgenommen und nicht gespeichert. Wollen Sie die Aktion trotzdem ausf\u00fchren und Ihre \u00c4nderungen verwerfen?",
    "Your currently redeemed Voting-Codes: ": "Ihre aktuell eingel\u00f6sten Voting-Codes: ",
    "Your device is not supported to share in whatsapp.": "Ihr Ger\u00e4t unterst\u00fctzt es nicht in WhatsApp zu teilen.",
    "all": "alle",
    "amount": "Anzahl",
    "an error occurred": "Ein Fehler ist aufgetreten",
    "arguments": "arguments",
    "cancel": "Abbrechen",
    "close": "Schlie\u00dfen",
    "day": "Tag",
    "donations": "Spenden",
    "failed": "Fehlgeschlagen",
    "image": "Bild",
    "logo": "Logo",
    "month": "Monat",
    "one letter Friday\u0004F": "Fr",
    "one letter Monday\u0004M": "Mo",
    "one letter Saturday\u0004S": "Sa",
    "one letter Sunday\u0004S": "So",
    "one letter Thursday\u0004T": "Do",
    "one letter Tuesday\u0004T": "Di",
    "one letter Wednesday\u0004W": "Mi",
    "option ": "Option ",
    "options must be an object": "Option muss ein Objekt sein",
    "please select \u2026": "bitte ausw\u00e4hlen \u2026",
    "redemptions": "Einl\u00f6sungen",
    "selected": "ausgew\u00e4hlt",
    "successfully deleted": "Erfolgreich gel\u00f6scht",
    "successfully updated need.": "Bedarf erfolgreich aktualisiert.",
    "total votes": "alle Stimmen",
    "verified votes": "best\u00e4tigte Stimmen",
    "year": "Jahr"
  };
  for (var key in newcatalog) {
    django.catalog[key] = newcatalog[key];
  }
  

  if (!django.jsi18n_initialized) {
    django.gettext = function(msgid) {
      var value = django.catalog[msgid];
      if (typeof(value) == 'undefined') {
        return msgid;
      } else {
        return (typeof(value) == 'string') ? value : value[0];
      }
    };

    django.ngettext = function(singular, plural, count) {
      var value = django.catalog[singular];
      if (typeof(value) == 'undefined') {
        return (count == 1) ? singular : plural;
      } else {
        return value.constructor === Array ? value[django.pluralidx(count)] : value;
      }
    };

    django.gettext_noop = function(msgid) { return msgid; };

    django.pgettext = function(context, msgid) {
      var value = django.gettext(context + '\x04' + msgid);
      if (value.indexOf('\x04') != -1) {
        value = msgid;
      }
      return value;
    };

    django.npgettext = function(context, singular, plural, count) {
      var value = django.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
      if (value.indexOf('\x04') != -1) {
        value = django.ngettext(singular, plural, count);
      }
      return value;
    };

    django.interpolate = function(fmt, obj, named) {
      if (named) {
        return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
      } else {
        return fmt.replace(/%s/g, function(match){return String(obj.shift())});
      }
    };


    /* formatting library */

    django.formats = {
    "DATETIME_FORMAT": "j. F Y H:i",
    "DATETIME_INPUT_FORMATS": [
      "%d.%m.%Y %H:%M:%S",
      "%d.%m.%Y %H:%M:%S.%f",
      "%d.%m.%Y %H:%M",
      "%d.%m.%Y",
      "%Y-%m-%d %H:%M:%S",
      "%Y-%m-%d %H:%M:%S.%f",
      "%Y-%m-%d %H:%M",
      "%Y-%m-%d"
    ],
    "DATE_FORMAT": "j. F Y",
    "DATE_INPUT_FORMATS": [
      "%d.%m.%Y",
      "%d.%m.%y",
      "%Y-%m-%d"
    ],
    "DECIMAL_SEPARATOR": ",",
    "FIRST_DAY_OF_WEEK": 1,
    "MONTH_DAY_FORMAT": "j. F",
    "NUMBER_GROUPING": 3,
    "SHORT_DATETIME_FORMAT": "d.m.Y H:i",
    "SHORT_DATE_FORMAT": "d.m.Y",
    "THOUSAND_SEPARATOR": ".",
    "TIME_FORMAT": "H:i",
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S",
      "%H:%M:%S.%f",
      "%H:%M"
    ],
    "YEAR_MONTH_FORMAT": "F Y"
  };

    django.get_format = function(format_type) {
      var value = django.formats[format_type];
      if (typeof(value) == 'undefined') {
        return format_type;
      } else {
        return value;
      }
    };

    /* add to global namespace */
    globals.pluralidx = django.pluralidx;
    globals.gettext = django.gettext;
    globals.ngettext = django.ngettext;
    globals.gettext_noop = django.gettext_noop;
    globals.pgettext = django.pgettext;
    globals.npgettext = django.npgettext;
    globals.interpolate = django.interpolate;
    globals.get_format = django.get_format;

    django.jsi18n_initialized = true;
  }

}(this));

