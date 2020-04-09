//小米闪购
define(['jquery'], function ($) {
    //下载小米闪购数据
    function download() {
        $.ajax({
            url: "data/slide.json",
            success: function (result) {
                var slideArr = result.data.list.list;
                for (let i = 0; i < slideArr.length; i++) {
                    $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                                            <a href="#" target = "_blank">
                                                <div class = 'content'>
                                                    <div class = 'thumb'>
                                                        <img width="160" height="160" src=${slideArr[i].img} alt=""/>
                                                    </div>
                                                    <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                                                    <p class = 'desc'>${slideArr[i].desc}</p>
                                                    <p class = 'price'>
                                                        <span>${slideArr[i].seckill_Price}</span>元
                                                        <del>${slideArr[i].goods_price}</del>
                                                    </p>
                                                </div>
                                            </a>
                                        </li>`).appendTo("#J_flashSaleList ul");
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    //商品列表滚动效果
    function slideTab() {
        var
            spans = $(".swiper-controls").find("span"), //左右按钮
            iNow = 0, // 图片下标
            count = Math.ceil(26 / 4) - 1, //图片组数（4张/组）
            timer = null;

        timer = setInterval(function () {
            iNow++;
            tab();
            if (iNow == count) {
                clearInterval(timer);
            }
        }, 4000)

        function tab() {
            iNow == 0 ? spans.eq(0).addClass("swiper-button-disabled") : spans.eq(0).removeClass("swiper-button-disabled");
            iNow == count ? spans.eq(1).addClass("swiper-button-disabled") : spans.eq(1).removeClass("swiper-button-disabled");

            var iTarget = iNow == count ? iNow * -992 + 496 : iNow * -992;
            $("#J_flashSaleList ul").css({
                transform: `translate3d(${iTarget}px,0px,0px)`,
                transitionDuration: "1000ms"
            })
        }

        spans.click(function () {
            if ($(this).index() == 0) {
                iNow--;
                iNow = Math.max(0, iNow);
            } else {
                iNow++;
                iNow = Math.min(count, iNow);
            }
            tab();
        })

        $("#J_flashSaleList").mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            if (iNow != count) {
                timer = setInterval(function () {
                    iNow++;
                    tab();
                    if (iNow == count) {
                        clearInterval(timer);
                    }
                }, 4000)
            }
        })
    }

    //倒计时效果
    function countDown() {
        var
            timer = null,
            d = new Date(),
            endTime = new Date(`${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} 20:00:00`);

        timer = setInterval(() => {
            updateTime();
        }, 1000);

        function updateTime() {
            var
                startTime = new Date(),
                countDown = (endTime.getTime() - startTime.getTime()) / 1000,
                oHours = parseInt(countDown / (60 * 60) % 24),
                oMinutes = parseInt(countDown / 60 % 60),
                oSeconds = parseInt(countDown % 60);

            $(".flashsale-countdown").find(".countdown span").eq(0).html(doubleNum(oHours));
            $(".flashsale-countdown").find(".countdown span").eq(1).html(doubleNum(oMinutes));
            $(".flashsale-countdown").find(".countdown span").eq(2).html(doubleNum(oSeconds));

            if (oHours == 0 && oMinutes == 0 && oSeconds == 0) {
                clearInterval(timer);
            }
        }
    }

    function doubleNum(n) {
        if (n < 10) {
            return "0" + n;
        } else {
            return n;
        }
    }

    return {
        download: download,
        slideTab: slideTab,
        countDown: countDown
    }
})