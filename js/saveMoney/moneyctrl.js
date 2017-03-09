/**
 * Created by xiaoluo on 2017/3/6.
 */
$(function () {
    //调用省钱控页面的接口,获取到数据
    $.ajax({
        url : "http://139.199.157.195:9090/api/getmoneyctrl",
        type : "get",
        data : { pageid : 1 }, //可以通过option的value值来传递pageid
        success : function (data) {
            if(data.result.length != 0){
                //这是渲染商品列表的内容
                $("#save-money-list").html(template("saveMoney", {list : data.result }));

                //封装了一个将获取到的数据转换为页数的函数
                function getPages(data){
                    var pagesize = data.pagesize;
                    var totalCount = data.totalCount;
                    var pageCount = Math.ceil( totalCount / pagesize);
                    var arr = [];
                    for (var i = 0; i < pageCount; i++){
                        arr.push({index : i + 1});
                    }
                    return arr;
                };
                //console.log(getCount(data));
                //这里是渲染选择页面的内容
                $("#pages").html(template("selectPage", {list : getPages(data)}));
            }
        }
    });

    //在option切换的时候,也就是监听change事件,重新获取数据,然后再发送ajax请求
    $("#pages").on("change", function () {
        $.ajax({
            url : "http://139.199.157.195:9090/api/getmoneyctrl",
            type : "get",
            data : $(this).serialize(), //可以通过option的value值来传递pageid
            success : function (data) {
                //这是渲染商品列表的内容
                $("#save-money-list").html(template("saveMoney", {list : data.result }));
            }
        })
    });

    //封装一个发送ajax请求渲染页面的函数
    function queryPages(param){
        $.ajax({
            url : "http://139.199.157.195:9090/api/getmoneyctrl",
            type : "get",
            data : param , //可以通过option的value值来传递pageid
            success : function (data) {
                //然后在根据新的页面渲染数据
                $("#save-money-list").html(template("saveMoney", {list : data.result }));
            }
        })
    }

    //封装一个将text值设置为对应项为选中项
    function selectedOpt(text){
        var count = $("#pages option").length;
        for(var i = 0; i < count; i++) {
            //$("#pages").get(0) 是用来获取select下面的所以option
            if($("#pages").get(0).options[i].value == text) {
                $("#pages").get(0).options[i].selected = true;
                break;
            }
        }
    }


    //点击下一页的按钮获取下一页
    $("#next-page").on("click", function () {
        var param = $("#pages").serialize().split("=");
        param[1]++;
        if( param[1] > $("#pages option").length){
            alert("已经是最后一页了!");
            param[1]--;
        }
        var data = param.join("=");
        queryPages(data);
        selectedOpt(param[1]);
        return false;
    });

    //点击上一页的按钮获取上一页的数据
    $("#piev-page").on("click", function () {
        var param = $("#pages").serialize().split("=");
        param[1]--;
        var data = param.join("=");
        queryPages(data);
        selectedOpt(param[1]);
        if( param[1] < 1){
            alert("已经是第一页了!");
        }
        return false;
    });


    //封装一个可以截取到指定字符串的函数,然后调用指定模板里面的辅助方法helper,在模板引擎里面调用方法,传入返回的数据
    template.helper("getCount", function (str) {
        var a = str.length !=0 ? /\d/.exec(str) : "0";
        return a[0];
    });
})