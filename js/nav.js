//首页导航
define(["jquery", "jquery-cookie"], function ($) {
    //请求顶部导航栏数据
    function topNavDownload() {
        $.ajax({
            type: "get",
            url: "data/nav.json",
            success: function (result) {
                var topArr = result.topNav;
                topArr.push({
                    title: "服务"
                }, {
                    title: "社区"
                });
                for (let i = 0; i < topArr.length; i++) {
                    $(`<li data-index="${i}" class="nav-item">
                    <a href="javascript:void(0);" class='link'>
                        <span class='text'>${topArr[i].title}</span>
                    </a>
                </li>`).appendTo(".site-header .header-nav .nav-list");

                    var newUl = $(`<ul class="children-list clearfix" style="display: ${i == 0 ? "block" : "none"}"></ul>`);
                    newUl.appendTo("#J_navMenu .container");

                    if (topArr[i].childs) {
                        var childArr = topArr[i].childs;
                        for (let j = 0; j < childArr.length; j++) {
                            $(`<li>
                    <a href="#">
                        <div class="figure figure-thumb">
                            <img src="${childArr[j].img}" alt="">
                        </div>
                        <div class="title">${childArr[j].a}</div>
                        <p class="price">${childArr[j].i}</p>
                    </a>
                </li>`).appendTo(newUl);
                        }
                    }
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    //请求侧边导航栏数据
    function sideNavDownload() {
        $.ajax({
            type: "get",
            url: "../data/nav.json",
            success: function (result) {
                var sideArr = result.sideNav;
                for (let i = 0; i < sideArr.length; i++) {
                    var node = $(`<li class='category-item'>
                    <a href="/index.html" class='title'>
                        ${sideArr[i].title}
                        <em class='iconfont-arrow-right-big'></em>
                    </a>
                    <div class="children clearfix children-col-4">
                    </div>
                </li>`);
                    node.appendTo("#J_categoryList");

                    var
                        childArr = sideArr[i].child,
                        col = Math.ceil(childArr.length);
                    node.find("div.children").addClass("children-col-" + col);
                    for (let j = 0; j < childArr.length; j++) {
                        if (j % 6 == 0) {
                            var newUl = $(` <ul class="children-list children-list-col children-list-col-${parseInt(j/6)}"></ul>`);
                            newUl.appendTo(node.find("div.children"));
                        }
                        $(`<li>
                                <a href="http://www.mi.com/redminote8pro"
                                    data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2"
                                    class="link clearfix"
                                    data-stat-id="d678e8386e9cb0fb"
                                    onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                                    <img src="${childArr[j].img}"width="40" height="40" alt="" class="thumb">
                                    <span class="text">${childArr[j].title}</span>
                                </a>
                            </li>`).appendTo(newUl);
                    }
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    //请求banner数据
    function bannerDownload() {
        $.ajax({
            type: "get",
            url: "../data/nav.json",
            success: function (result) {
                var bannerArr = result.banner;
                for (let i = 0; i < bannerArr.length; i++) {
                    //添加banner图片
                    $(`<a href="${bannerArr[i].url}"><img class="swiper-lazy swiper-lazy-loaded" src="../images/banner/${bannerArr[i].img}"></a>`).appendTo("#J_homeSwiper .swiper-slide");
                    //添加banner小圆点按钮
                    var dot = $(`<a href="#" class = 'swiper-pagination-bullet'></a>`);
                    if (i == 0) {
                        dot.addClass("swiper-pagination-bullet-active");
                    }
                    dot.appendTo("#J_homeSwiper .swiper-pagination");
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    //轮播图效果
    function banner() {
        var
            iNow = 0, // 当前显示图片的下标
            imgs = null, // 图片
            btns = null; // 小圆点

        var timer = setInterval(function () {
            iNow++;
            tab();
        }, 4000)

        //封装切换函数
        function tab() {
            imgs = $("#J_homeSwiper .swiper-slide").find("a");
            btns = $("#J_homeSwiper .swiper-pagination").find("a");
            if (iNow == 5) {
                iNow = 0;
            }
            //切换图片
            imgs.hide().css("opacity", 0.2).eq(iNow).show().animate({
                opacity: 1
            }, 500);
            //切换小圆点
            btns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
        }

        //鼠标移入移出时停止轮播
        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            timer = setInterval(function () {
                iNow++;
                tab();
            }, 2500);
        })

        //点击小圆点按钮切换图片
        $("#J_homeSwiper .swiper-pagination").on("click", "a", function () {
            iNow = $(this).index();
            tab();
            return false;
        })

        //点击左右按钮切换图片
        $(".swiper-button-prev,.swiper-button-next").click(function () {
            if (this.className == "swiper-button-prev") {
                iNow--;
                if (iNow == -1) {
                    iNow = 4;
                }
            } else {
                iNow++;
            }
            tab();
        })
    }

    //侧边导航栏效果
    function leftNavTab() {
        $("#J_categoryList").on("mouseenter", ".category-item", function () {
            $(this).addClass("category-item-active");
        })
        $("#J_categoryList").on("mouseleave", ".category-item", function () {
            $(this).removeClass("category-item-active");
        })
    }

    //顶部导航移入移出效果
    function topNavTab() {
        $(".header-nav .nav-list").on("mouseenter", ".nav-item", function () {
            $(this).addClass("nav-item-active");
            var index = $(this).index() - 1;
            if (index >= 0 && index <= 6) {
                $('#J_navMenu').css("display", "block").removeClass("slide-up").addClass("slide-down");
                $('#J_navMenu .container').find("ul").eq(index).css("display", "block").siblings("ul").css("display", "none");
            } else {
                $('#J_navMenu').removeClass("slide-down").addClass("slide-up");
            }
        })
        $(".header-nav .nav-list").on("mouseleave", ".nav-item", function () {
            $(this).removeClass("nav-item-active");
        })
        $(".site-header").mouseleave(function () {
            $('#J_navMenu').removeClass("slide-down").addClass("slide-up");
        })
    }

    //搜索框效果
    function searchTab() {
        $("#search").focus(function () {
            $("#J_keywordList").removeClass("hide").addClass("show")
        }).blur(function () {
            $("#J_keywordList").removeClass("show").addClass("hide")
        })
    }

    //商品列表页侧边导航栏移入移出
    function allGoodsTab() {
        $(".header-nav .nav-list").on("mouseenter", ".nav-category", function () {
            $(this).addClass("nav-category-active");
            $(".header-nav .site-category").css("display", "block");
            $('#J_navMenu').removeClass("slide-down").addClass("slide-up");
        })
        $(".header-nav .nav-list").on("mouseleave", ".nav-category", function () {
            $(this).removeClass("nav-category-active");
            $(".header-nav .site-category").css("display", "none");
        })
    }

    //购物车商品数量
    function shopCartNum() {
        if (!$.cookie("goods")) {
            $("#J_miniCartBtn").find("span").html("(0)");
        } else {
            var
                cookieArr = JSON.parse($.cookie("goods")),
                num = 0;

            for (let i = 0; i < cookieArr.length; i++) {
                num += cookieArr[i].num;
            }
            $("#J_miniCartBtn").find("span").html(`(${num})`);
        }
    }

    return {
        topNavDownload: topNavDownload,
        sideNavDownload: sideNavDownload,
        bannerDownload: bannerDownload,
        banner: banner,
        leftNavTab: leftNavTab,
        topNavTab: topNavTab,
        searchTab: searchTab,
        allGoodsTab: allGoodsTab,
        shopCartNum: shopCartNum
    }
})