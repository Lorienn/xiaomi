require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav": "nav",
        "goodsDesc": "goodsDesc"
    },
    shim: {
        "jquery-cookie": ["jquery"]
    }
})
require(["nav", "goodsDesc"], function (nav,goodsDesc) {
    nav.topNavDownload();
    nav.sideNavDownload();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();
    nav.allGoodsTab();
    nav.shopCartNum();

    goodsDesc.download();
    goodsDesc.banner();
})