/**
 * Created by sanda on 2017/3/6.
 */
//´ò¿ªäÖÈ¾¡£
$(function(){
    $.get('http://mmb.ittun.com/api/getcoupon',function(data){
        var html = template("rate-shop-li",data);
        $('#rate-shop').html(html);
        $("img.lazy").lazyload({
            effect : "fadeIn"
        });
    });
//  äÖÈ¾Á´½Ó
})