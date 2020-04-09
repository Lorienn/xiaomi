require.config({
    //配置模块路径
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav": "nav",
        "slide":"slide",
        "data":"data"
    },
    //设置依赖关系
    shim: {
        "jquery-cookie": ["jquery"]
    }
})

require(["nav","slide","data"],function(nav,slide,data){
    // banner,侧边导航栏，顶部导航栏
    nav.topNavDownload();
    nav.sideNavDownload();
    nav.bannerDownload();
    nav.banner();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();
    nav.shopCartNum();

    // 小米闪购
    slide.download();
    slide.slideTab();
    slide.countDown();

    //主页商品列表
    data.download();
    data.tabMenu();
})