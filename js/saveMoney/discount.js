/**
 * Created by xiaoluo on 2017/3/6.
 */
$(function () {
    //先要获取到传递过来的商品id
    var productid = util.getQueryString("productid");
    //传入参数,发送ajax请求
    $.ajax({
        url : "http://139.199.157.195:9090/api/getmoneyctrlproduct",
        type : "get",
        data : { productid : productid },
        success : function (data) {
            console.log(data);
            //渲染整个商品的信息
            $("#product-info").html(template("productInfo", {list : data.result }));
            //渲染导航条
            $(".money-nav").html(template("moneyNav", { list : data.result }));
            //渲染title
            $("title").html(template("title", { list : data.result }));
            //如果有地区和有货的显示那么就让其缓慢的显示,需要将鼠标
            window.onscroll = function () {
                console.log($(".area").offset().top);
            };

            if(data.result[0].productComment){
                $("ul").hide().slideDown(1000);
            }
        }
    });
});

//给评论注册点击事件
$("#form-comment").on("submit", "ctl00_ContentBody_Button1", function () {
    alert("请登陆后再进行评论!!!");
    location.href = "http://m.manmanbuy.com/login.aspx?tourl=http%3a%2f%2fm.manmanbuy.com%2fd.aspx%3fid%3d129181%26f%3dweixinlist";
    return false;
});

template.helper("getString", function (str) {
    return str.slice(0, 10)+"...";
});