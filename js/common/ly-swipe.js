/**
 *
 * options:object
 * params{domParent:下面弹簧的父盒子}
 * params{domchild：下拉弹簧的子盒子}
 * params{Bounce：下拉弹簧的上下拉伸距离}
 */



function LySwipe (options){
    this.domParent=document.querySelector(options.domParent);
    this.domchild=this.domParent.querySelector(options.domchild);
    //存储一些属性值；
    this.domHeight=this.domParent.offsetHeight;
    //弹簧状态下的拉伸距离值；
    this.Bounce=options.Bounce||100;
    /*2.获取滑动的菜单项*/
    this.childHeight=this.domchild.offsetHeight;
    this.maxY=0;//静止状态下的最大Y坐标值
    this.maxBounceY=this.maxY+this.Bounce;//弹簧状态下的最大Y坐标值
    this.minY=this.domHeight-this.childHeight; //静止状态下的最小Y坐标值
    this.minBounceY=this.minY-this.Bounce;//弹簧状态下的最小Y坐标值

    /*3.实现滑动*/
    this.startY=0;
    this.moveY=0;
    this.distanceY=0;
    /*创建变量来记录当前已经偏移的距离*/
    this.currentY=0;
};
LySwipe.prototype = {
    opentransiton:function(){
        this.domchild.style.transition="transform .2s";
        this.domchild.style.webkitTransition="transform .2s";
    },
    closetransiton:function(){
        this.domchild.style.transition="none";
        this.domchild.style.webkitTransition="none";
    },
    setTransform:function(distanceY){
        this.domchild.style.transform="translateY("+distanceY+"px)";
        this.domchild.style.webkitTransform="translateY("+distanceY+"px)";
    },
    _swipe: function () {
        var self = this;
        this.domchild.addEventListener("touchstart",function(e){
            self.startY= e.touches[0].clientY;
        });
        this.domchild.addEventListener("touchmove",function(e){
            self.moveY= e.touches[0].clientY;
            self.distanceY=self.moveY-self.startY;
            //console.log("currentY+distanceY:"+(currentY+distanceY));
            /*判断如果超出指定的最大的弹簧区间，则当前滑动操作不执行*/
            if(self.currentY+self.distanceY > self.maxBounceY || self.currentY+self.distanceY < self.minBounceY){
                //console.log('超出Y坐标值区间');
                console.log('到哪里了');
                return;
            }
            /*清除过渡*/
            self.closetransiton();
            /*设置偏移*/
            self.setTransform(self.currentY+self.distanceY);
        });
        this.domchild.addEventListener("touchend",function(e){
            //console.log("touchend");
            /*判断当前滑动的距离*/
            console.log('到上面了吗？');
            if(self.currentY+self.distanceY > self.maxY){
                /*重置位置到静止状态下最大的Y坐标值*/
                self.currentY=self.maxY;
                //最上面
                console.log('top');
                /*回到指定的位置*/
                self.opentransiton();
                self.setTransform(self.maxY);
            }
            else if(self.currentY+self.distanceY < self.minY){
                /*重置位置到静止状态下最小的Y坐标值*/
                self.currentY=self.minY;
                console.log(2);
                /*回到指定的位置*/
                self.opentransiton();
                self.setTransform(self.minY);
            }
            else{
                /*累计之前已经滑动的距离*/
                self.currentY+=self.distanceY;
            }
            //console.log("currentY:---:"+currentY);
        });
    },
    //新增功能：动图展示

};


