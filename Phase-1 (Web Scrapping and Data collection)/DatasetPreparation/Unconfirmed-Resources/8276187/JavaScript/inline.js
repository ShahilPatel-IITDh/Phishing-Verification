
var current_url = window.location.href;
//alert(current_url);
    var str2 = 'utm_';
    if(current_url.indexOf(str2) != -1)
    {
        setCookie('cp_utm_data_damaccoralreef',current_url, 1);
    }
    
    
    function setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
