/**
 * Created by zhangrui on 2017/3/8.
 */

$(function () {
    /*==========方法的调用============*/
    init();
    /*==========方法的定义============*/
    /*初始化*/
    function  init() {
        /*点击doument影藏所以下拉显示的选择框*/
        $(document).on('click',function (){
            $('.selectBox div').slideUp();
            $('.search').find('i').removeClass('close');
            $('.searchBox').slideUp();
            $('.filter a').find('i').removeClass('arrow');
            //return false;
        });
        /*顶部导航栏固定*/
        $(window).on('scroll',function (){
            if($(document).scrollTop()>$('header').height()){
                $('nav').addClass('fixed');
                $('.swipe-wrap').css('padding-top',$('nav').height());
            }else{
                $('nav').removeClass('fixed');
                $('.swipe-wrap').css('paddingTop',0);
            }
        });

        /*渲染页面*/
        templateRender();

    }
    /*获取产品列表*/
    function getProductData(){
        var shopID = $('#shopSelects li.current').attr('data-id');
        var areaID = $('#areaSelects li.current').attr('data-id');
        var cacheData;
        /*当存在对应的页面的缓存时,使用缓存*/
        try{
            cacheData = JSON.parse(sessionStorage.getItem(shopID+'&'+areaID));
        }catch(e){}
        if(cacheData){
            var html = template('product-list-tpl', {list:cacheData.result});
            $('.products-list').html(html);
            setImgSize();
            $(".loading").removeClass("show");
            var Swipe = new LySwipe({
                domParent:'.swipe-wrap',
                domchild:'.products-list',
                Bouncd:150
            });
            Swipe._swipe();
        }
        /*若不存在缓存,则用ajax向后台请求数据*/
        else{
            $(".loading").addClass("show");
            $.get('http://139.199.157.195:9090/api/getgsproduct',
                {
                    shopid:$('#shopSelects li.current').attr('data-id'),
                    areaid:$('#areaSelects li.current').attr('data-id')
                },
                function (data){
                    /*根据当前的店铺和地区缓存对应的数据*/
                    sessionStorage.setItem(shopID+'&'+areaID,JSON.stringify(data));
                    var len = data.result.length;
                    var page = 0;
                    var result = data.result.slice(page*10,(page+1)*10);
                    $('.products-list').html(template('product-list-tpl', {list:result}));
                    setImgSize();
                    /*下拉弹簧功能*/
                    var Swipe = new LySwipe({
                        domParent:'.swipe-wrap',
                        domchild:'.products-list',
                        Bouncd:150
                    });
                    Swipe._swipe();
                    /*当页面发生滚动时,进行懒加载*/
                    $(window).on('scroll',function (){
                        //当滚动距离满足以下条件时,进行数据的获取,每次获取10条
                        if(( $(window).height()+$(document).scrollTop() >= $(document).height() )  && $(".loading").hasClass("show")){
                            if(page !=-1){
                                $(".loading").removeClass("show");
                                ++page;
                                result = data.result.slice(page*10,(page+1)*10)
                                $('.products-list').append(template('product-list-tpl', {list:result}));
                                $(".loading").addClass("show");
                                if((page+1)*10 > len){
                                    page = -1;
                                    $(".loading").removeClass("show");
                                }
                            }
                        }
                    })
                });
        }
    }
    /*模板渲染*/
    function templateRender(){
        //请求店铺名
        $.get('http://139.199.157.195:9090/api/getgsshop',function (data){
            $('#shopSelects').html(template('shopName-tpl',data));
            $('.filter a').eq(0).text($('#shopSelects .current a').text());
            //请求区域名
            $.get('http://139.199.157.195:9090/api/getgsshoparea',function (data){
                $('#areaSelects').html(template('areaName-tpl',data));
                $('.filter a').eq(1).text($('#areaSelects .current a').text().slice(0,2));
                $('.filter a').eq(2).text('全部价格');
                $('.filter a').append('<i></i>');
                //获取商品列表
                //显示或影藏下拉框
                $('.filter').on('click','a',function (){
                    var Target=this.dataset['target'];
                    $("#"+Target).stop().slideToggle().siblings().slideUp();
                    $('.search').find('i').removeClass('close');
                    //搜索框收起
                    $('.searchBox').slideUp();
                    $(this).parent().siblings().find('i').removeClass('arrow');
                    $(this).find('i').toggleClass('arrow');
                    return false;
                });
                //获取商品列表
                getProductData();
                /*下拉选择框,点击获取对应的页面信息,并改变自身样式*/
                $('.selectBox').on('click','li',function (){
                    $(document).scrollTop(0);
                    $(this).addClass('current').siblings().removeClass('current');
                    $('.filter a').eq($(this).parents('div').index()).text($(this).find('a').text().slice(0,2)).append('<i></i>');
                    //获取商品列表
                    getProductData();
                });
                /*选择框显示或隐藏,及改变自身样式*/
                $('.search').on('click',function (){
                    $(this).find('i').toggleClass('close');
                    $('.searchBox').slideToggle();
                    $('.selectBox div').slideUp();
                    $('.filter a').find('i').removeClass('arrow');
                    $('.chooseList dd').on('click',function (){
                        $(this).find('a').addClass('choose').parent().siblings().find('a').removeClass('choose');
                        return false;
                    });
                    //输入框聚焦
                    $('.txt').on('click',function (){
                        $(this).find('input').focus();
                        return false;
                    })
                    return false;
                })
                /*改变排序方式*/
                $('.changeStyle').on('click',function (){
                    if($(this).hasClass('planB')){
                        $(this).html('<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-pailiefangshi02"></use></svg>').removeClass('planB');
                        $('.products-list').removeClass('planB').addClass('planA');
                    }else{
                        $(this).html('<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-pailiefangshi01"></use></svg>').addClass('planB')
                        $('.products-list').removeClass('planA').addClass('planB');
                    }
                })
            });
        });

    }
    /*代码公共部分提取*/
        //图片宽高设置
    function setImgSize(){
        $('.products-list .pic img').width($(".products-list .pic").width());
        $('.products-list .pic img').height($(".products-list .pic").width());
    }


})