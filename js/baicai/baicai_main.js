/**
 * Created by Administrator on 2017/3/7 0007.
 */

$.get("http://139.199.157.195:9090/api/getbaicaijiatitle", function (data) {
            $('.ui-navigator-list').append(template('baicai-tabs',{list:data.result}));
        tabsList();
    }

)
