/**
 * Created by king on 2017/3/6.
 */
//һ�������ҳ����Ⱦ
$.get('http://mmb.ittun.com/api/getbrandtitle', function (data) {
    if(data.result.length !=0) {
        $('#brandTitle').append(template('brandTitle1-tpl', {list: data.result}));


    // ί�и�Ԫ�ظ���̬���ɵ�li��ӵ���¼�
    $('#brandTitle').on('click','ul', function () {
        //��ҳ�����ݴ洢����
         localStorage.setItem('brandTitle',JSON.stringify(data.result));
    });
    }
});




