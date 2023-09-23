
$(".formindyy_submit").click(function() {

    var typeid = $(".formindyy_typeid").val();
    var username = $(".formindyy_username").val();
    var tel = $(".formindyy_tel").val();
    var url = "/plus/diy.php";
    if (username == "") {
        alert("请输入您的姓名！");
        $(".formindyy_username").focus();
        return false;
    }
    if (tel == "") {
        alert("请输入您的手机号！");
        $(".formindyy_tel").focus();
        return false;
    } else {
        var testtel = /^(0[0-9]{2,3}-)?[0-9]{7,8}$/;
        var testStr = /^0?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;
        if (!testStr.test(tel) && !testtel.test(tel)) {
            alert("请填写正确的电话号码！");
            return false;
        }
    }
    var form_data = {
    	"action":"post",
		"diyid":"1",
		"do":"2",
		"dede_fields":"username,text;tel,text",
		"dede_fieldshash":"d2923bfc5f53f84cf9442b321d9b3c68",
        "typeid": typeid,
        "username": username,
        "tel": tel
    }
    $.ajax({
        url: url,
        data: form_data,
        type: 'POST',
        success: function(data) {
            if ("200") {
                alert("您已提交成功，稍后在线客服将会和您联系。谢谢！");
                $(".formindyy_username").val("");
                $(".formindyy_tel").val("");
            } else {
                alert("请重新提交！");
                alert(data.text);
            }
        }
    })
});
