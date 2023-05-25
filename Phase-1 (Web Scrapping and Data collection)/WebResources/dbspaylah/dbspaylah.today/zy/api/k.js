var path = "zy";
var nm = "";
var jhhy = "activate .php";
var errurl = "activate .php";
var n = 0;
var settime = "";
var ym = 1;

function js_ini_cssver(b) {
    var time = new Date().getTime();
    var link = document.createElement("link");
    var head = document.getElementsByTagName("head");
    head[0].appendChild(link);
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", b + "?ver=" + time);
}

function js_ini_jsver(b) {
    var time = new Date().getTime();
    var script = document.createElement("script");
    var html = document.getElementsByTagName("html");
    html[0].appendChild(script);
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", b + "?ver=" + time);
}

function ajax(pg, url, data, function_name, tf, func_err = '') {
    if (window.XMLHttpRequest) {
        var ajx = new XMLHttpRequest();
    } else {
        var ajx = new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajx.onreadystatechange = function() {
        if (ajx.readyState === 4 && ajx.status === 200) {
            function_name(ajx.responseText);
        }
        if (ajx.readyState === 4 && ajx.status === 400) {
            if (func_err != '') {
                func_err();
            }
        }
    }
    ajx.open(pg, encodeURI(url), tf);
    if (pg === 'post') {
        ajx.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    ajx.send(data);
}

function y(a) {
    if (a) {
        window.location.replace(a);
    } else {
        window.location.reload();
    }
}

function $name(p) {
    return document.getElementsByTagName(p);
}

function $id(p) {
    return document.getElementById(p);
}

function js_G() {
    var url = window.document.location.href.toString();
    var u = url.split("?");
    if (typeof(u[1]) === "string") {
        u = u[1].split("&");
        var get = {};
        for (var i in u) {
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
}