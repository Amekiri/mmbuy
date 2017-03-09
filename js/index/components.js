/**
 * Created by ��Խ on 2017/2/21.
 */
function Jd_components(options){
    //this.top = document.body.scrollTop;
    this.banner = document.querySelector(options.banner);
    //this.bannerHeight = this.banner.offsetHeight;
    this.bannerWidth = this.banner.offsetWidth;
    this.header = document.querySelector(options.header);
    this.headerOpacity = 0;
    this.index=1;
    /*3.��ȡ�����ֲ���ul*/
    this.imgBox = this.banner.querySelector(options.imgBox);
    this.indicators=this.banner.querySelector(options.indicatorsParent).children;
    this.timerId=null;
    this.ismoved = true;/*����trueΪ�ر�*/
    /*��.ʵ�ֻ���-�ֶ��ֲ�*/
    this.startX=0;
    this.moveX=0;
    this.distanceX=0;//�����Ϊ�ֲ�����

};
Jd_components.prototype = {
    /*�����ֲ�*/
    bannerRun: function () {
        var self = this;
        /*������ʱ��*/
        this.openTimer();
        /*���ñ����ʽ*/
        /*index:��ǰ��Ҫ�����ʽ��li��ǩ����*/
        /*7.ΪimgBox��ӻ����¼�*/
        this.imgBox.addEventListener("touchstart",function(e){
            /*���ʱ��*/
            self.distanceX=0;//�����Ϊ����ֹֻ�ǵ�����ɿ�distanceX=0�������,��ʼ�������Ļ�distanceX=0�Żᴥ�� ��ֹͼƬ�л���if�жϣ�
            clearInterval(self.timerId);
            /*��ȡ��ָ��ʼx����*/
            self.startX= e.touches[0].clientX;
        });
        this.imgBox.addEventListener("touchmove",function(e){
            /*����move�¼�ʱ,��ismovedΪfalse*/
            if(self.ismoved ==false){
                return;
            }
            /*��ȡ��ָ����������x����*/
            self.moveX= e.touches[0].clientX;
            /*���㱾�λ�����x����ֵ*/
            self.distanceX=self.moveX-self.startX;
            /*�����������Խ�磬��ô��ִ�е�ǰ�Ļ�������*/
            if( !(self.index>=5) && !(self.index<=0)){
                //console.log(index);
                /*�������*/
                self.closeTransition();
                //openTransition();
                /*����ƫ��*/
                //console.log(-index*bannerWidth+distanceX);
                self.setTransform(-self.index*self.bannerWidth+self.distanceX);

            }

        });
        this.imgBox.addEventListener("touchend",function(e){
            /*touchend ����������*/
            //console.log(self.distanceX);
            if(self.distanceX == 0){
                //console.log('distancd==0');
                clearInterval(self.timerId);
                /*���¿���ʱ��*/
                self.openTimer();
                //ismoved = true;
                return;
            }
            self.ismoved = false;
            /*�жϵ�ǰ�����ľ����Ƿ񳬳���1/6 ---��ҳ*/
            if(Math.abs(self.distanceX )> self.bannerWidth/6){
                /*��һҳ*/
                if(self.distanceX>0){
                    self.index--;
                }
                else if(self.distanceX <0){
                    self.index++;
                }
                self.openTransition();
                /*6.3ƫ��*/
                self.setTransform(-self.index*self.bannerWidth);
                setTimeout(function (){
                    self.ismoved = true;
                },200);
            }
            else if(Math.abs(self.distanceX ) > 0){
                self.openTransition();
                /*6.3ƫ��*/
                self.setTransform(-self.index*self.bannerWidth);
                setTimeout(function (){
                    self.ismoved = true;
                },200)
            }
            /*�ٴ����ʱ�ӣ��������κ�һ��ʱ���ֻ��һ��ʱ��*/
            clearInterval(self.timerId);
            /*���¿���ʱ��*/
            setTimeout(function(){
                clearInterval(self.timerId);
                self.openTimer();
                /*���ƶ�������,�رս�����*/
                self.ismoved = true;
            },200);
        });
        /*�������ɽ���֮��Ĳ���*/
        //this.tend();
        /*��ӹ���Ч�������ļ���*/
        this.imgBox.addEventListener("webkitTransitionEnd", function () {
            self.tend();
        });
        /*���window��onresize�¼�:���ǵ���Ļ��С�ı��ʱ����Ҫ����bannerWidthֵ*/
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
    /*��������*/
    openTransition: function () {
        this.imgBox.style.transition="transform .2s";
        this.imgBox.style.webkitTransition="transform .2s";
    },
    /*�رչ���*/
    closeTransition:function(){
        this.imgBox.style.transition="none";
        this.imgBox.style.webkitTransition="none";
    },
    /*����ƫ��*/
    setTransform:function(distanceX){
        this.imgBox.style.transform="translateX("+distanceX+"px)";
        this.imgBox.style.webkitTransform="translateX("+distanceX+"px)";
    },
    /*������ʱ��*/
    openTimer:function(){
        var self =this;
        //console.log(this.timerId);
        this.timerId=setInterval(function(){
            /*6.1��������*/
            self.index++;
            /*6.2���ù���Ч��*/
            self.openTransition();
            /*6.3ƫ��*/
            self.setTransform(-self.index*self.bannerWidth);
            //console.log("setInterval"+self.index);
        },2000);
    },
    /*���ñ����ʽ*/
    setIndicator:function(index){
        /*�������li��ǩ����ʽ*/
        for(var i=0;i<this.indicators.length;i++){
            this.indicators[i].classList.remove('active');
        }
        /*Ϊ��ǰli��ǩ�����ʽ*/
        this.indicators[index-1].classList.add('active');
    },
    /*�������ɽ���֮��Ĳ���*/
    tend:function(){
        /*���ã����ܻ�Խ�磬����Խ����ֻ����»ص���ȷ��λ��*/
        //console.log(this+'ABB');
        if(this.index>=5){
            //console.log("addTransitionEnd"+this.index);
            /*֮ǰ��ӵĹ���Ч�����û���������ô���´�����ĳ����ʽ��ʱ�򻹻�ӵ��֮ǰ��ӵĹ���Ч��*/
            this.index=1;
            this.closeTransition();
            /*6.3ƫ��*/
            this.setTransform(-this.index*this.bannerWidth);
        }
        else if(this.index<=0){
            this.index=4;
            this.closeTransition();
            /*6.3ƫ��*/
            this.setTransform(-this.index*this.bannerWidth);
        }
        /*����*/
        this.setIndicator(this.index);
    }

};