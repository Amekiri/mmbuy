/**
 * Created by Administrator on 2017/3/6 0006.
 */
if(!window.itcast){
    window.itcast = {};
}
itcast.iScroll = function (args) {
    /*调用的时候没有初始化的话就初始化一次*/
    if(!(this instanceof  arguments.callee)) return new arguments.callee(args);
    this.init(args);
};
itcast.iScroll.prototype = {
    constructor:itcast.iScroll,
    init: function (args) {
        /*把当前的this存下来*/
        var self = this;
        /*如果传入的对象是一个Dom对象就把他看作我们的大容器盒子*/
        if(args.swipeDom && typeof args.swipeDom == 'object'){
              self.parentDom = args.swipeDom;
        }
        //如果不存在父容器就停止初始化
        if(!self.parentDom) return false;
        //找到子容器
        self.childDom = self.parentDom.children && self.parentDom.children[0]?self.parentDom.children[0]:'';
        /*如果不存在子容器就停止初始化*/
        if(!self.childDom) return false;
        //初始化传入的参数
        self.settings = {};
        //默认类型 默认的y轴滑动 如果不是y的话就以x轴开始滑动
        self.settings.swipeType = args.swipeType?args.swipeType:'y';
        //默认的缓冲滑动距离
        self.settings.swipeDistance = args.swipeDistance>=0?args.swipeDistance:150;
        //初始化滑动
        self._scroll();
    },
    //对外开放的设置定位的方法
    setTranslate: function (translate) {
        this.currPostion = translate;
        this._addTransition();
        this._changeTranslate(this.currPostion);
    },
    _addTransition: function () {
        this.childDom.style.transition = 'all .2s ease';
    },
    _removeTransition: function () {
        this.childDom.style.transition = 'none';
    },
    _changeTranslate: function (translate) {
        if(this.settings.swipeType == 'y'){
            this.childDom.style.transform = "translateY("+translate+"px)";
        }else{
            this.childDom.style.transform = "translateX("+translate+"px)";
        }
    },
    _scroll:function(){
        //保存当前this
        var self = this;
        //滑动的类型
        var type = self.settings.swipeType == 'y'?true:false;
        //父容器的高度或宽度
        var parentHeight = type?self.parentDom.offsetHeight:self.parentDom.offsetWidth;
        //子容器的高度或宽度
        var childHeight = type?self.childDom.offsetHeight:that.childDom.offsetWidth;

        //子容器没有父容器大的时候
        if(childHeight < parentHeight){
            if(type){
                self.childDom.style.height = parentHeight + 'px';
                childHeight = parentHeight;
            }else{
                self.childDom.style.width = parentHeight + 'px';
                childHeight = parentHeight;
            }
        }

        /*缓冲距离*/
        var distance = self.settings.swipeDistance;
        /*区间*/
        /*左侧盒子定位的区间*/
        self.maxPostion = 0;
        self.minPostion = -(childHeight-parentHeight);
        /*设置滑动的当前位置*/
        self.currPostion = 0;
        self.startPostion = 0;
        self.endPostion = 0;
        self.movePostion = 0;
        /*1.滑动*/
        self.childDom.addEventListener('touchstart',function(e){
            /*初始的Y的坐标*/
            self.startPostion = type?e.touches[0].clientY: e.touches[0].clientX;
        },false);
        self.childDom.addEventListener('touchmove',function(e){
            e.preventDefault();
            /*不停的做滑动的时候记录的endY的值*/
            self.endPostion = type?e.touches[0].clientY: e.touches[0].clientX;
            self.movePostion = self.startPostion - self.endPostion;/*计算了移动的距离*/

            /*2.滑动区间*/
            /*就是滑动区间*/
            if((self.currPostion-self.movePostion)<(self.maxPostion+distance)
                &&
                (self.currPostion-self.movePostion)>(self.minPostion -distance)){
                self._removeTransition();
                self._changeTranslate(self.currPostion-self.movePostion);
            }
        },false);
        window.addEventListener('touchend',function(e){
            /*在限制滑动区间之后 重新计算当前定位*/
            /*判断是否在我们的合理定位区间内*/
            /*先向下滑动 */
            if((self.currPostion-self.movePostion) > self.maxPostion){
                self.currPostion = self.maxPostion;
                self._addTransition();
                self._changeTranslate(self.currPostion);
            }
            /*想上滑动的时候*/
            else if((self.currPostion-self.movePostion) < self.minPostion){
                self.currPostion = self.minPostion;
                self._addTransition();
                self._changeTranslate(self.currPostion);
            }
            /*正常的情况*/
            else{
                self.currPostion = self.currPostion-self.movePostion;
            }
            self._reset();
        },false);
    }
}