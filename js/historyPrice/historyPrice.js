/**
 * Created by ��Խ on 2017/3/9.
 */
$(function () {

    $('.btn-check').on('click', function (e) {
        $('.bg-cover').fadeIn(300);
        $('.bg-child').addClass('ulShowHide');
        e.stopPropagation();
    });
    $(document).on('click', function () {
        $('.bg-cover').fadeOut(300);
    });
    $('.bg-child').on('click', function (e) {
        //console.log(1);
        e.stopPropagation();
        //console.log(2);
    });
    //���������ð�ť����һ��
    $('.bg-btn-twoRest').on('click', function () {
        //console.log(143);
        $('.li-text span').html('');
    });
});