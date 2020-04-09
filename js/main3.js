require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "login": "login"
    }
})

require(["login"], function (login) {
    login.loginSend();
})