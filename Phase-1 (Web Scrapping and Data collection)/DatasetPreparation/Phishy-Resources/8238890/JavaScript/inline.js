
            ua = navigator.userAgent;
            var isExplorer = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
            if(isExplorer === true) {
                var message = "<span style='margin-left: 9%; font-size: 18px' attr-i18n='internet.support'>Browser is not fully supported. Changing browser can help you get a better user experience. You can download latest version of Microsoft Edge.</span><a href='https://www.microsoft.com/en-us/edge' target='_blank'> Download</a>";
                document.write(message);
                setTimeout(function() {document.getElementById('wrapper').style.display = 'none'}, 10);
            }
        