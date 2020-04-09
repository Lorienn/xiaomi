require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "register": "register"
    }
})

require(["register"], function (register) {
    register.registerSend();
})