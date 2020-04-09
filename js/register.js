define(["jquery"], function ($) {
    function registerSend() {
        $("#register-button").click(function () {
            $.ajax({
                type: "post",
                url: "./php/register.php",
                data: {
                    username: $(".item_account").eq(0).val(),
                    password: $(".item_account").eq(1).val(),
                    repassword: $(".item_account").eq(2).val(),
                    ctime: (new Date()).getTime()
                },
                success: function (result) {
                    var obj = JSON.parse(result);

                    if (obj.code) {
                        //注册失败
                        $(".err_tip").find("em").attr("class","icon_error");
                    } else {
                        //注册成功
                        $(".err_tip").find("em").attr("class","icon_select icon_true");
                        $(".err_tip").find("span").css("color","#000");
                        var timer = setTimeout(function(){
                            location.assign("login.html");
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
        registerSend: registerSend
    }
})