
    document.addEventListener("DOMContentLoaded", function (event) {
       setSearchCookie();
    });
    if (sfInitializers.length > 0) {
        for (var i = 0; i < sfInitializers.length; i++) {
            sfInitializers[i]();
        }
    }
    