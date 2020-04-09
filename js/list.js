require.config({
    //配置模块路径
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav": "nav",
        "goodsList":"goodsList"
    },
    //设置依赖关系
    shim: {
        "jquery-cookie": ["jquery"],
    }
})

require(["nav","goodsList"], function (nav,goodsList) {
    // banner,侧边导航栏，顶部导航栏
    nav.topNavDownload();
    nav.sideNavDownload();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();
    nav.allGoodsTab();
    nav.shopCartNum();

    goodsList.download();
    goodsList.banner();
})