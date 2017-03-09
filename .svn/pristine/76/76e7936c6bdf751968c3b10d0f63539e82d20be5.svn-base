/**
 * Created by sanda on 2017/3/6.
 */
$(function(){
    //获取ID
    var couponid =decodeURI(util.getQueryString('couponid'));
    //更改头部名称还有底部
        $('.top h1').html(decodeURI(util.getQueryString('title'))+'优惠券');
        $('.nav a:nth-last-of-type(1)').html($('.top h1').html());
    //根据页面的url进行不同的处理
    switch (couponid){
        case '0':
            setAjax('aa',couponid);
        break;
        case '1':
            setAjax('bb',couponid);
        break;
        case '2':
            setAjax('cc',couponid);
        break;
        case '3':
            setAjax('dd',couponid);
            break;
        default :
            location.href = 'coupon.html';
    }
    clk($('.both')[0],function(e){
        $('.both').parent().fadeOut(500);
    });
    //左右按钮的事件
    $('.bBoth i').on('click',function(e){
        var i =$('.bBoth').attr('index');
        if(e.target.innerHTML == '&lt;'){
            i--;
            if(i <=-1){
                i =$('.bBoth').attr('lastNum');
            }
        }else{
            i++;
            if(i > $('.bBoth').attr('lastNum')){
                i = 0;
            }
        }
        $('.bBoth').attr('index',i);
        $('.bBoth').find('img').attr('src',$('.rate-shop1-a').eq(i).find('img').attr('src'));
    })
});
//封装一个点击事件传dom对象，还有回调；
function clk(obj,fn,aa){
    //事件，阈值
    var tTime=0;
    var onOff=true;
    obj.addEventListener('touchstart',function(){
        tTime = new Date();
    },false);
    obj.addEventListener('touchmove',function(){
        onOff=false;
    },false);
    obj.addEventListener('touchend',function(e){
        //记录触发对象，方便使用
        var tT =new Date();
        if(onOff && (tT-tTime<150)){
                fn(aa);
        }else{
                return false;
        }
    },false);
}
//这是ajax的流程为了本地存储拿出来
function setAjax(num,couponid){
    if(sessionStorage.getItem(num) ){
        $('#rate-shop1').html(template("rate-shop1-list",JSON.parse(sessionStorage.getItem(num))));
     }else{
        $.get('http://mmb.ittun.com/api/getcouponproduct?couponid='+couponid,function(data){
     //本地存储的json变化
        sessionStorage.setItem(num,JSON.stringify(data));
     $('#rate-shop1').html(template("rate-shop1-list",JSON.parse(sessionStorage.getItem(num))));
            setAjaxA();
        });
     }
            setAjaxA();

}
//setAjax公共的用来遍历添加点击事件
function setAjaxA(){
    $('.rate-shop1-a').each(function(i,index){
        clk(index,function(i){
            $('.bBoth').attr('index',i);
            $('.bBoth').find('img').attr('src',$('.rate-shop1-a').eq(i).find('img').attr('src'));
            $('.bBoth').fadeIn(500);
        },i);
        $('.bBoth').attr('lastNum',i);
    })
}