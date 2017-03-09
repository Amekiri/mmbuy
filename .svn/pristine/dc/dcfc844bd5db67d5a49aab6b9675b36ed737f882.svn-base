/**
 * Created by Administrator on 2017/1/13.
 */
/*添加dom的过渡结束监听*/
/*function addTransitionEnd(dom,callback){
    dom.addEventListener("webkitTransitionEnd",function(){
        callback && callback();
    });
    dom.addEventListener("transitionEnd",function(){
        callback && callback();
    });
    dom.addEventListener("oTransitionEnd",function(){
        callback && callback();
    });
    dom.addEventListener("msTransitionEnd",function(){
        callback && callback();
    });
    dom.addEventListener("mozTransitionEnd",function(){
        callback && callback();
    });
}*/

/*更好的封装方式*/
var itcast={
    addTransitionEnd:function(dom,callback) {
        /*判断有没有传入dom对象*/
        if(!dom || typeof dom !="object"){
            return;
        }
        dom.addEventListener("webkitTransitionEnd", function () {
            callback && callback();
        });
        dom.addEventListener("transitionEnd", function () {
            callback && callback();
        });
        dom.addEventListener("oTransitionEnd", function () {
            callback && callback();
        });
        dom.addEventListener("msTransitionEnd", function () {
            callback && callback();
        });
        dom.addEventListener("mozTransitionEnd", function () {
            callback && callback();
        });
    },
    addAnimationEnd:function(){},
    /*单击事件*/
    tap:function(dom,callback){
        /*判断有没有传入dom对象*/
        if(!dom || typeof dom !="object"){
            return;
        }
        /*移动端的单击事件一般使用touch来模拟，它一般需要满足两个条件
         * 1.不能滑动过
         * 2.end和Start的时间差异一般应该在150ms以内，如果差异太大，就应该是longpress长按事件*/
        /*标记是否曾经滑动过*/
        var isMove=false;
        /*记录手指按下的时间*/
        var st=0;
        dom.addEventListener("touchstart",function(e){
            /*Date.now()：它获取的是毫秒数*/
            st=Date.now();
        })
        dom.addEventListener("touchmove",function(e){
            isMove=true;
        })
        dom.addEventListener("touchend",function(e){
            var et=Date.now();
            /*判断本次操作是否是单击事件*/
            if(isMove==false && et-st<150){
                callback && callback(e);
            }
            /*重置*/
            isMove=false;
        })
    }
};