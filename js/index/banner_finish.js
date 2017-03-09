/**
 * Created by 李越 on 2017/1/18.
 */
window.onload=function(){
    /*使用严格模式*/
    //"use strict";
    var jd = new Jd_components({
        banner:'.banner',
        imgBox:'ul:first-of-type',
        indicatorsParent:'ul:last-of-type'
    });

    jd.bannerRun();


    //ajax请求轮播图图片数据
    $.ajax({
        type:'get',
        url:'./js/index/banner.json',
        data:{},
        //dataType:'jsonp',
        success: function (result) {
            console.log(1);
            var bannerHtml = template('banner-tpl',{"items":result});
            document.querySelector('.banner>ul').innerHTML = bannerHtml;
        }
    });

};


