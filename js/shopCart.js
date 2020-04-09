define(["jquery", "jquery-cookie"], function ($) {
    //请求购物车中商品数据
    function cartDownload() {
        //清空上一次加载的数据
        $("#J_cartBox .item-table").html("");
        //获取商品的具体信息
        new Promise(function (resolve, reject) {
            $.ajax({
                url: "data/goodsCarList.json",
                success: function (obj) {
                    resolve(obj.data)
                },
                error: function (msg) {
                    reject(msg);
                }
            })
        }).then(function (arr1) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: "data/goodsList2.json",
                    success: function (arr2) {
                        var newArr = arr1.concat(arr2);
                        resolve(newArr);
                    },
                    error: function (msg) {
                        reject(msg);
                    }
                })
            })
        }).then(function (arr) {
            var cookieStr = $.cookie("goods");
            if (cookieStr) {
                var
                    cookieArr = JSON.parse(cookieStr),
                    newArr = [];

                for (let i = 0; i < cookieArr.length; i++) {
                    for (let j = 0; j < arr.length; j++) {
                        if (cookieArr[i].id == arr[j].product_id || cookieArr[i].id == arr[j].goodsid) {
                            //设置商品数量
                            arr[j].num = cookieArr[i].num;
                            //设置商品id
                            arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].goodsid;
                            newArr.push(arr[j]);
                        }
                    }
                }
                for (let i = 0; i < newArr.length; i++) {
                    var node = $(`<div class="item-row clearfix" id="${newArr[i].id}"> 
                    <div class="col col-check">  
                        <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
                    </div> 
                    <div class="col col-img">  
                        <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                            <img alt="" src=${newArr[i].image} width="80" height="80"> 
                        </a>  
                    </div> 
                    <div class="col col-name">  
                        <div class="tags">   
                        </div>     
                        <div class="tags">  
                        </div>   
                        <h3 class="name">  
                            <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                ${newArr[i].name} 
                            </a>  
                        </h3>        
                    </div> 
                    <div class="col col-price"> 
                        ${newArr[i].price}元 
                        <p class="pre-info">  </p> 
                    </div> 
                    <div class="col col-num">  
                        <div class="change-goods-num clearfix J_changeGoodsNum"> 
                            <a href="javascript:void(0)" class="J_minus">
                                <i class="iconfont"></i>
                            </a> 
                            <input tyep="text" name="2192300031_0_buy" value="${newArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                            <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                        </div>  
                    </div> 
                    <div class="col col-total"> 
                    ${(newArr[i].price * newArr[i].num).toFixed(1)}元 
                        <p class="pre-info">  </p> 
                    </div> 
                    <div class="col col-action"> 
                        <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                    </div> 
                </div>`);
                    node.appendTo("#J_cartBox .item-table");
                }
                isCheckAll();
            }
        })
    }

    //请求“更多商品”数据
    function download() {
        $.ajax({
            url: "../data/goodsCarList.json",
            success: function (result) {
                var arr = result.data;
                for (let i = 0; i < arr.length; i++) {
                    $(`<li class="J_xm-recommend-list span4">    
                    <dl> 
                        <dt> 
                            <a href="#"> 
                                <img src=${arr[i].image} srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt=${arr[i].name}> 
                            </a> 
                        </dt> 
                        <dd class="xm-recommend-name"> 
                            <a href="#"> 
                                ${arr[i].name}
                            </a> 
                        </dd> 
                        <dd class="xm-recommend-price">${arr[i].price}元</dd> 
                        <dd class="xm-recommend-tips">   ${arr[i].comments}人好评    
                            <a href="#" class="btn btn-small btn-line-primary J_xm-recommend-btn" style="display: none;" id="${arr[i].goodsid}">加入购物车</a>  
                        </dd> 
                        <dd class="xm-recommend-notice">

                        </dd> 
                    </dl>  
                </li>`).appendTo("#J_miRecommendBox ul.row");
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    //更多商品·移入移出显示加入购物车按钮
    function cartHover() {
        $("#J_miRecommendBox ul.row").on("mouseenter", ".J_xm-recommend-list", function () {
            $(this).find(".xm-recommend-tips a").css("display", "block")
        })
        $("#J_miRecommendBox ul.row").on("mouseleave", ".J_xm-recommend-list", function () {
            $(this).find(".xm-recommend-tips a").css("display", "none")
        })

        //加入购物车
        $("#J_miRecommendBox ul.row").on("click", ".xm-recommend-tips a", function () {
            var
                id = this.id,
                //判断购物车是否为空
                first = $.cookie("goods") == null ? true : false;

            if (first) {
                //如果为空
                var cookieArr = [{
                    id: id,
                    num: 1
                }];
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            } else {
                //判断之前是否添加过该商品
                var
                    same = false, //假设第一次添加该商品
                    cookieStr = $.cookie("goods"),
                    cookieArr = JSON.parse(cookieStr);
                for (let i = 0; i < cookieArr.length; i++) {
                    if (cookieArr[i].id == id) {
                        //之前添加过该商品
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                if (!same) {
                    //之前未添加过该商品
                    cookieArr.push({
                        id: id,
                        num: 1
                    });
                }
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }
            isCheckAll();
            cartDownload();
            return false;
        })
    }

    //全选按钮和单选按钮
    function select() {
        $("#J_cartBox .list-head .col-check").find("i").click(function () {
            //获取所有单选框
            var allChecks = $("#J_cartListBody").find(".item-row .col-check i");
            if ($(this).hasClass("icon-checkbox-selected")) {
                $(this).add(allChecks).removeClass("icon-checkbox-selected");
            } else {
                $(this).add(allChecks).addClass("icon-checkbox-selected");
            }
            isCheckAll();
        })
        $("#J_cartBox .J_cartGoods").on("click", ".col-check i", function () {
            if ($(this).hasClass("icon-checkbox-selected")) {
                $(this).removeClass("icon-checkbox-selected");
            } else {
                $(this).addClass("icon-checkbox-selected");
            }
            isCheckAll();
        })
    }

    //根据单选按钮变化数量和价格
    function isCheckAll() {
        var
            allChecks = $("#J_cartListBody").find(".item-row"), //所有商品
            isAll = true, // 是否全选
            total = 0, // 总数
            count = 0, // 选中的数量
            totalCount = 0; // 总数

        allChecks.each(function (index, item) {
            //判断商品是否被选中
            if (!$(item).find(".col-check i").hasClass("icon-checkbox-selected")) {
                isAll = false;
            } else {
                //选中商品的数量
                count += parseInt($(item).find(".col-num input").val());
                total += parseFloat($(item).find(".col-price").html().trim()) * parseFloat($(item).find(".col-num input").val());
            }
            //购物车所有商品的数量
            totalCount += parseInt($(item).find(".col-num input").val());
        })

        $("#J_cartTotalNum").html(totalCount);
        $("#J_selTotalNum").html(count);
        $("#J_cartTotalPrice").html(total.toFixed(1));

        //判断是否全选
        if (isAll) {
            $("#J_cartBox .list-head .col-check").find("i").addClass("icon-checkbox-selected");
        } else {
            $("#J_cartBox .list-head .col-check").find("i").removeClass("icon-checkbox-selected");
        }
    }

    //商品数量增减，删除商品
    function changeNum() {
        //删除商品
        $("#J_cartListBody .J_cartGoods").on("click", ".col-action .J_delGoods", function () {
            var
                id = $(this).closest(".item-row").remove().attr("id"),
                cookieStr = $.cookie("goods"),
                cookieArr = JSON.parse(cookieStr);

            for (let i = 0; i < cookieArr.length; i++) {
                //从cookie中删除商品
                if (id == cookieArr[i].id) {
                    cookieArr.splice(i, 1);
                    break;
                }
            }

            //如果购物车为空，清空cookie
            if (cookieArr.length == 0) {
                $.cookie("goods", null)
            } else {
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                });
            }
            isCheckAll();
            return false;
        })

        //商品数量加减
        $("#J_cartListBody .J_cartGoods").on("click", ".J_minus,.J_plus", function () {
            var
                id = $(this).closest(".item-row").attr("id"),
                cookieStr = $.cookie("goods"),
                cookieArr = JSON.parse(cookieStr);

            for (let i = 0; i < cookieArr.length; i++) {
                if (id == cookieArr[i].id) {
                    if (this.className == "J_minus") {
                        cookieArr[i].num == 1 ? alert("数量已经为1，不能再减少了") : cookieArr[i].num--;
                    } else {
                        cookieArr[i].num++;
                    }

                    //更新商品数量
                    $(this).siblings("input").val(cookieArr[i].num);
                    
                    //更新单个商品总价
                    var price = parseFloat($(this).closest(".col-num").siblings(".col-price").html().trim());
                    
                    $(this).closest(".col-num").siblings(".col-total").html((price * cookieArr[i].num).toFixed(1) + "元");
                    break;
                }
            }



            //更新cookie中商品数量
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })

            isCheckAll();
            return false;
        })
    }

    return {
        download: download,
        cartHover: cartHover,
        cartDownload: cartDownload,
        select: select,
        changeNum: changeNum
    }
})