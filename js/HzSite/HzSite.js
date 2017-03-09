/**
 * Created by 杨子豪 on 2017/3/7.
 */

$(function () {
    //页面加载时触发
   $(window).on("load",function () {
       $.get("http://139.199.157.195:9090/api/getsitenav",function (res) {
           var html=template("HzSite-list",res);
           console.log(html);
           $("#list").html(html);
       })
   }) 
});
