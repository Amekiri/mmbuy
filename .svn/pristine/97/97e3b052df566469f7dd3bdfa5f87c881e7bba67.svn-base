/**
 * Created by 李越 on 2017/3/6.
 */
(function (){
    //点击广告栏关闭按钮 添加动画类名
    util.tap($('.timing-X-close')[0], function () {
        $('.products-banner').addClass('animated zoomOutDown');
        //增加了一个 监听动画结束 时 让其隐藏的效果，
        //$('.products-banner')[0].addEventListener('webkitAnimationEnd', function () {
        //    $('.products-banner').hide(500);
        //});
        //做了兼容处理
        util.addAnimationEnd($('.products-banner')[0], function () {
            $('.products-banner').hide(500);
        })
    });

    var productid = util.getQueryString('productid');
    $(document).on('ajaxStart', function () {
        $('.loading').show();
    }).on('ajaxStop', function () {
        $('.loading').hide();
    });
    $.ajax({
        type:'get',
        url:'http://mmb.ittun.com/api/getdiscountproduct?productid='+productid,
        success: function (data) {
            console.log(data.result[0]);
            var html = template('products-item-tpl',data.result[0]);
            $('.swipe-box').html(html);
            var goSwipe = new LySwipe({
                domParent:'.swipe-wrap',
                domchild:'.swipe-box',
                Bouncd:200
            });
            goSwipe._swipe();

            //填写用户评价
            $('.products-comment form').on('submit', function () {
                //文本域的内容
                var areaTxt = $('.reply textarea').val();
                var accountName = $('.reply .form input:eq(0)').val();
                var accountCellphoneName = $('.reply .form input:eq(1)').val();
                if(!areaTxt){
                    return false;
                };
                console.log('form submit');
                var li = document.createElement('li');
                li.className='create-parent-li';
                $(li).html('<img src="../../images/account.gif" alt=""/>'
                            +'<div class="create-right clearfix"><div class="right-first clearfix">'
                            +'<span>'+accountName+'</span>'
                            +'<span>'+util.fnTime()+'</span>'
                            +'</div>'
                            +'<p>'+areaTxt+'</p>'
                            +'<div class="cellphoneName">'+accountCellphoneName+'</div>'
                            +'</div>');
                //li.innerHTML = areaTxt;
                if($('.list > ul').children('li').length==0){
                    $('.list > ul').append(li);
                }else{
                    $('.list > ul').prepend(li);
                }

                return false;
            });
        }
    });
})();