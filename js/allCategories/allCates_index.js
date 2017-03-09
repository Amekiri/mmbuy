/**
 * Created by king on 2017/3/6.
 */
//一级标题的页面渲染
$.get('http://mmb.ittun.com/api/getbrandtitle', function (data) {
    if(data.result.length !=0) {
        $('#brandTitle').append(template('brandTitle1-tpl', {list: data.result}));


    // 委托父元素给动态生成的li添加点击事件
    $('#brandTitle').on('click','ul', function () {
        //将页面数据存储传递
         localStorage.setItem('brandTitle',JSON.stringify(data.result));
    });
    }
});




