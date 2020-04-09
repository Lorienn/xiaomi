require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "shopCart": "shopCart"
    },
    shim: {
        "jquery-cookie": ["jquery"]
    }
})
require(["shopCart"],function(shopCart){
    shopCart.download();
    shopCart.cartHover();
    shopCart.cartDownload();
    shopCart.select();
    shopCart.changeNum();
})