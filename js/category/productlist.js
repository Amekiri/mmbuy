/**
 * Created by Administrator on 2017/3/7.
 */
$(function () {

    var categoryid = util.getQueryString("categoryid") || 1;
    $.get("http://139.199.157.195:9090/api/getcategorybyid",{
        categoryid:categoryid
    }, function (data) {
        console.log()
        $(".filterBox span:nth-of-type(2)").after(template("filterTemp", {list:data.result}))
    });
    //默认渲染页面
    $.get("http://139.199.157.195:9090/api/getproductlist",{
        categoryid:categoryid,
        pageid:1
    }, function (data) {

        var page = Math.ceil(data.totalCount / data.pagesize);
        var totalData = [];
        var totalData1 = [];
        for(var i = 1; i < page+1; i++) {
            (function(i) {
                $.get('http://139.199.157.195:9090/api/getproductlist', {
                    categoryid: categoryid,
                    pageid: i
                }, function(data) {

                    for(var j = 0 ; j < data.result.length; j++){
                        totalData.push(data.result[j]);
                        totalData1.push(data.result[j]);
                    };

                    if(i >= page){
                        setTimeout(function() {
                            totalData.sort(function (a, b) {
                                return a['productPrice'].slice(1) - b['productPrice'].slice(1);
                            });

                            totalData1.sort(function (a, b) {
                                return a['productPrice'].slice(1) - b['productPrice'].slice(1);
                            });

                            totalData1.reverse();
                            console.log(totalData1);


                            var dataArr = [];
                            var newPage = Math.ceil(totalData.length / 10);
                            for(var c = 0; c < newPage; c++){
                                if(c == newPage){
                                    dataArr.push(totalData);
                                }else{
                                    dataArr.push(totalData.splice(0, 10));
                                }
                            };

                            var dataArr1 = [];
                            var newPage1 = Math.ceil(totalData1.length / 10);
                            for(var e = 0; e < newPage1; e++){
                                if(e == newPage1){
                                    dataArr1.push(totalData1);
                                }else{
                                    dataArr1.push(totalData1.splice(0, 10));
                                }
                            };

                            var dataObj = {};
                            for(var d = 0; d < dataArr.length; d++) {
                                dataObj[d] = dataArr[d];
                            }
                            //console.log(dataObj);

                            var dataObj1 = {};
                            for(var f = 0; f < dataArr1.length; f++) {
                                dataObj1[f] = dataArr1[f];
                            }


                        },10);

                    };


                });

            })(i);

        }


        $(".productList ul").html(template("productlistTemp", {list:data.result}));
        var pagesize = data.pagesize;
        var totalCount = data.totalCount;
        var pagetotal = Math.ceil(totalCount/pagesize);
        var arr = [],a=1;
        for(var i=0;i<pagetotal;i++){
            arr.push({index:a});
            a++;
        };
        //渲染三级菜单
        $(".selectPage select").html(template("selectTemp", {list:arr}));

        //改变页数发送请求改变页面内容
        $("#pageNum").on("change", function () {
            ajaxproductlist();
        });
        //点击上下按钮翻页
        $("#prev").click(function(){
            var selectVal = $("#pageNum option:selected").val();
            selectVal--;
            $("header [href='#toTop']").trigger("click");
            if(selectVal>0){
                updateProductlist(selectVal);
            }
        });
        $("#next").click(function(){
            var selectVal = $("#pageNum option:selected").val();
            selectVal++;
            if(selectVal<=$("#pageNum option").length){
               updateProductlist(selectVal);
            }
        })
    });
    //封装换页的方法
    function updateProductlist(selectVal){
        $("#pageNum option:selected").removeAttr("selected");
        $("#pageNum option")[selectVal-1].selected = true;
        ajaxproductlist();
    };
    //封装请求的方法
    function ajaxproductlist(){
        $.ajax({
            type:"get",
            url:"http://139.199.157.195:9090/api/getproductlist",
            data:$(".form-data").serialize()+"&categoryid="+categoryid,
            success: function (data) {
                $(".productList ul").html(template("productlistTemp", {list:data.result}));
            }
        })
    }

    productFiltrate();
    function productFiltrate() {

        //点击遮罩层时让筛选框和遮罩层隐藏
        $('.bg-filtrate').on('click', function(){
            $('.filtrate').css({
                'transform': 'translateX(-100%)'
            });
            $('.bg-filtrate').hide();
        });

        //点击筛选按钮时显示筛选框和遮罩层
        $('.filtrate-btn').on('click', function(ev) {
            $('.bg-filtrate').show();
            $('.filtrate').css({
                'transform': 'translateX(0)'
        });

            //阻止冒泡事件 阻止点击筛选部分时也收起筛选框和遮罩层
            ev.stopPropagation();

            //关闭筛选框的按钮
            $('.close').on('click', function() {
                $('.filtrate').css({
                    'transform': 'translateX(-100%)'
                });
                $('.bg-filtrate').hide();
            });


            $.get('http://139.199.157.195:9090/api/getcategorytitle', function(data) {
                $('.filtrate').append(template('filtrate-tpl', {list:data.result}));

                //点击时让所有数据显示 再次点击只显示3个
                $('.pro-brief').on('touchend', function () {
                    $(this).next().find('li:nth-of-type(n+4)').nextAll().toggle();
                });


                //先遍历所有数据 根据每一个数据里面的titleId去发送请求 获取该id的数据 一次性渲染到页面中

                var objData = {};
                for (var i = 0; i < data.result.length; i++) {
                    (function (titleid) {
                        $.get('http://139.199.157.195:9090/api/getcategory', {titleid: titleid}, function (data) {
                            objData[titleid] = data.result;
                            $('.pro-particular')[titleid].innerHTML = template('filtrate-list-tpl', {list: objData[titleid]});
                        })
                    })(data.result[i].titleId);
                }

            })
        });
    }

})