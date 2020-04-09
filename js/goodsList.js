define(["jquery"], function ($) {
    //请求商品列表数据
    function download() {
        $.ajax({
            type: "get",
            url: "data/goodsList2.json",
            success: function (result) {
                // 大图商品
                $(`<div data-v-61428f58 class = 'section'>
                <div data-v-61428f58 class = 'components-list-box'>
                    <div data-v-a2d6c756 class="channel-product-imgText">
                        <div data-v-a2d6c756 class = 'channel-product-top'>
                            <div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                                <div data-v-a2d6c756 class = 'figure'>
                                    <a href="goodsDesc.html?product_id=${result[0].product_id}">
                                        <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src=${result[0].image} alt=""/>
                                    </a>
                                </div>
                                <div data-v-a2d6c756 class = 'content'>
                                    <h3 data-v-a2d6c756 class = 'title'>
                                        <a data-v-a2d6c756 href="goodsDesc.html?product_id=${result[0].product_id}">
                                            ${result[0].name} 
                                        </a>
                                    </h3>
                                    <p data-v-a2d6c756 class = 'desc'>${result[0].desc}</p>
                                    <p data-v-a2d6c756 class = 'price'>
                                        <strong data-v-a2d6c756>${result[0].price}</strong>元
                                        <span data-v-a2d6c756>起</span>
                                        <del data-v-a2d6c756>${result[0].del}元</del>
                                    </p>
                                    <p data-v-a2d6c756 class = 'link'>
                                        <a data-v-a2d6c756 href="#">立即购买</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`).appendTo(".page-main .app-body");

                //小图列表商品
                for (let i = 1; i < result.length; i++) {
                    //每两个商品创建一行
                    if (i % 2 != 0) {
                        var row = $(`<div data-v-61428f58 class = 'section'>
                    <div data-v-61428f58 class = 'components-list-box'>
                        <div data-v-45ef62b1 class = 'channel-product channel-product-two4'>
                            <div data-v-45ef62b1 class = 'row'></div>
                        </div>
                    </div>
                </div>`);
                        row.appendTo(".page-main .app-body");
                    }

                    $(`<div data-v-45ef62b1 class = 'span10 product-cell shadow'>
                <div data-v-45ef62b1 class = 'figure'>
                    <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}" class = 'exposure'>
                        <img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src=${result[i].image} alt=""/>
                    </a>
                </div>
                <h3 data-v-45ef62b1 class = 'title'>
                    <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}">${result[i].name}</a>
                </h3>
                <p data-v-45ef62b1 class = 'desc'>${result[i].desc}</p>
                <p data-v-45ef62b1 class = 'price'>
                    <strong data-v-45ef62b1>${result[i].price}</strong>元
                    <span data-v-45ef62b1>起</span>
                    <del data-v-45ef62b1>${result[i].del}元</del>
                </p>
            </div>`).appendTo(row.find(".row"));
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    //banner轮播图效果
    function banner() {
        var
            iNow = 0,
            imgs = null,
            btns = null;

        var timer = setInterval(function () {
            iNow++;
            tab();
        }, 4000);

        //封装切换函数
        function tab() {
            imgs = $(".swiper-container .swiper-wrapper");
            btns = $(".swiper-container .swiper-pagination a");

            //切换小圆点
            btns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");

            if (iNow == 2) {
                btns.eq(0).addClass("swiper-pagination-bullet-active");
            }
            //切换图片
            imgs.animate({
                left: -2560 * iNow
            }, 1000, function () {
                if (iNow == 2) {
                    iNow = 0;
                    imgs.css("left", "0");
                }
            });

        }

        //点击小圆点按钮切换图片
        $(".swiper-container .swiper-pagination").on("click", "a", function () {
            iNow = $(this).index();
            tab();
            return false;
        })

        //点击左右按钮切换图片
        $(".swiper-button-prev,.swiper-button-next").click(function () {
            if ($(this).className == "swiper-button-prev") {
                iNow--;
                iNow = iNow == -1 ? 1 : 0;
            } else {
                iNow++;
            }
            tab();
        })

        //鼠标移入移出时停止轮播
        $(".swiper-container").mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            timer = setInterval(function () {
                iNow++;
                tab();
            }, 4000);
        })
    }

    return {
        download: download,
        banner: banner
    }
})