define(["jquery"], function ($) {
    function loginSend() {
        $("#login-button").click(function () {
            $.ajax({
                type: "post",
                url: "./php/login.php",
                data: {
                    username: $(".item_account").eq(0).val(),
                    password: $(".item_account").eq(1).val()
                },
                success: function (result) {
                    var obj = JSON.parse(result);

                    if (obj.code) {
                        //登陆失败
                        $(".err_tip").find("em").attr("class","icon_error");
                    } else {
                        //登陆成功
                        $(".err_tip").find("em").attr("class","icon_select icon_true");
                        $(".err_tip").find("span").css("color","#000");
                        var timer = setTimeout(function(){
                            location.assign("index.html");
                        },3000)
                    }
                    $(".err_tip").show().find("span").html(obj.message);
                },
                error: function (msg) {
                    console.log(msg);
                }
            })
        })
    }
    return {
        loginSend: loginSend
    }
})