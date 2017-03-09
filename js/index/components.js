/**
 * Created by 李越 on 2017/2/21.
 */
function Jd_components(options){
    //this.top = document.body.scrollTop;
    this.banner = document.querySelector(options.banner);
    //this.bannerHeight = this.banner.offsetHeight;
    this.bannerWidth = this.banner.offsetWidth;
    this.header = document.querySelector(options.header);
    this.headerOpacity = 0;
    this.index=1;
    /*3.获取用于轮播的ul*/
    this.imgBox = this.banner.querySelector(options.imgBox);
    this.indicators=this.banner.querySelector(options.indicatorsParent).children;
    this.timerId=null;
    this.ismoved = true;/*假设true为关闭*/
    /*二.实现滑动-手动轮播*/
    this.startX=0;
    this.moveX=0;
    this.distanceX=0;//让其成为局部变量

};
Jd_components.prototype = {
    /*开启轮播*/
    bannerRun: function () {
        var self = this;
        /*开启定时器*/
        this.openTimer();
        /*设置标记样式*/
        /*index:当前需要添加样式的li标签索引*/
        /*7.为imgBox添加滑动事件*/
        this.imgBox.addEventListener("touchstart",function(e){
            /*清除时钟*/
            self.distanceX=0;//这个是为了阻止只是点击就松开distanceX=0的情况下,初始化这样的话distanceX=0才会触发 阻止图片切换的if判断；
            clearInterval(self.timerId);
            /*获取手指起始x坐标*/
            self.startX= e.touches[0].clientX;
        });
        this.imgBox.addEventListener("touchmove",function(e){
            /*进入move事件时,当ismoved为false*/
            if(self.ismoved ==false){
                return;
            }
            /*获取手指滑动过程中x坐标*/
            self.moveX= e.touches[0].clientX;
            /*计算本次滑动的x差异值*/
            self.distanceX=self.moveX-self.startX;
            /*如果发现索引越界，那么不执行当前的滑动操作*/
            if( !(self.index>=5) && !(self.index<=0)){
                //console.log(index);
                /*清除过渡*/
                self.closeTransition();
                //openTransition();
                /*设置偏移*/
                //console.log(-index*bannerWidth+distanceX);
                self.setTransform(-self.index*self.bannerWidth+self.distanceX);

            }

        });
        this.imgBox.addEventListener("touchend",function(e){
            /*touchend 开启节流阀*/
            //console.log(self.distanceX);
            if(self.distanceX == 0){
                //console.log('distancd==0');
                clearInterval(self.timerId);
                /*重新开启时钟*/
                self.openTimer();
                //ismoved = true;
                return;
            }
            self.ismoved = false;
            /*判断当前滑动的距离是否超出了1/6 ---翻页*/
            if(Math.abs(self.distanceX )> self.bannerWidth/6){
                /*上一页*/
                if(self.distanceX>0){
                    self.index--;
                }
                else if(self.distanceX <0){
                    self.index++;
                }
                self.openTransition();
                /*6.3偏移*/
                self.setTransform(-self.index*self.bannerWidth);
                setTimeout(function (){
                    self.ismoved = true;
                },200);
            }
            else if(Math.abs(self.distanceX ) > 0){
                self.openTransition();
                /*6.3偏移*/
                self.setTransform(-self.index*self.bannerWidth);
                setTimeout(function (){
                    self.ismoved = true;
                },200)
            }
            /*再次清除时钟，保障在任何一个时间点只有一个时钟*/
            clearInterval(self.timerId);
            /*重新开启时钟*/
            setTimeout(function(){
                clearInterval(self.timerId);
                self.openTimer();
                /*当移动结束后,关闭节流阀*/
                self.ismoved = true;
            },200);
        });
        /*监听过渡结束之后的操作*/
        //this.tend();
        /*添加过渡效果结束的监听*/
        this.imgBox.addEventListener("webkitTransitionEnd", function () {
            self.tend();
        });
        /*添加window的onresize事件:就是当屏幕大小改变的时候，需要重置bannerWidth值*/
        window.addEventListener("resize",function(){
            self.bannerWidth=self.bannerWidth;
        });
        window.addEventListener("blur",function(){
            clearInterval(self.timerId);
        });
        window.addEventListener("focus",function(){
            self.openTimer();
        });
    },
    /*开启过渡*/
    openTransition: function () {
        this.imgBox.style.transition="transform .2s";
        this.imgBox.style.webkitTransition="transform .2s";
    },
    /*关闭过渡*/
    closeTransition:function(){
        this.imgBox.style.transition="none";
        this.imgBox.style.webkitTransition="none";
    },
    /*设置偏移*/
    setTransform:function(distanceX){
        this.imgBox.style.transform="translateX("+distanceX+"px)";
        this.imgBox.style.webkitTransform="translateX("+distanceX+"px)";
    },
    /*开启定时器*/
    openTimer:function(){
        var self =this;
        //console.log(this.timerId);
        this.timerId=setInterval(function(){
            /*6.1索引自增*/
            self.index++;
            /*6.2设置过渡效果*/
            self.openTransition();
            /*6.3偏移*/
            self.setTransform(-self.index*self.bannerWidth);
            //console.log("setInterval"+self.index);
        },2000);
    },
    /*设置标记样式*/
    setIndicator:function(index){
        /*清除所有li标签的样式*/
        for(var i=0;i<this.indicators.length;i++){
            this.indicators[i].classList.remove('active');
        }
        /*为当前li标签添加样式*/
        this.indicators[index-1].classList.add('active');
    },
    /*监听过渡结束之后的操作*/
    tend:function(){
        /*作用：可能会越界，但是越界后又会重新回到正确的位置*/
        //console.log(this+'ABB');
        if(this.index>=5){
            //console.log("addTransitionEnd"+this.index);
            /*之前添加的过渡效果如果没有清除，那么在下次设置某个样式的时候还会拥有之前添加的过渡效果*/
            this.index=1;
            this.closeTransition();
            /*6.3偏移*/
            this.setTransform(-this.index*this.bannerWidth);
        }
        else if(this.index<=0){
            this.index=4;
            this.closeTransition();
            /*6.3偏移*/
            this.setTransform(-this.index*this.bannerWidth);
        }
        /*点标记*/
        this.setIndicator(this.index);
    }

};