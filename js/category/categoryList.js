/**
 * Created by Administrator on 2017/3/7.
 */
$(function() {

    getProduct();
    getProductComment();

    //var productid = Number(util.getQueryString('productId'));
    //console.log(productid);

    //根据产品列表页面传过来的id 获取当前产品的数据 渲染到页面中
    //三级标题处 截取的是产品名称第一个空格前的字符串
    function getProduct() {
        $.get('http://139.199.157.195:9090/api/getproduct', { productid: util.getQueryString('productId') }, function(data) {
            $('.pro-content').html(template('pro-tpl', data));
            //console.log(data.result[0].productName);
            var str = data.result[0].productName;
            str = str.substr(0, str.indexOf(' '));
            console.log(str);
            $('.title').html(str);
            console.log(data);
        });

    };

    //获取当前产品评论的数据
    function getProductComment() {
        $.get('http://139.199.157.195:9090/api/getproductcom?', { productid: util.getQueryString('productId') }, function(data) {
            $('.pro-comment').html(template('pro-comment-tpl', data));
        });
    };

});