$(function () {

    $(document).ajaxStart(function() {
        $('.overlay').show();
    }).ajaxStop(function() {
        $('.overlay').hide();
    });

    $.get("http://139.199.157.195:9090/api/getindexmenu", function (data) {
        //将第7个的链接地址换掉
        //console.log(data.result[6].titlehref);
        data.result[6].titlehref = 'historyPrice.html';
        //console.log(data.result[6]);
        template.helper("getUrlname",function (str){
            var str = str;
            var arr = str.split(".");
            return arr[0];
        });
        $(".main .nav-li-list").html(template("navListtemp",data));
        $(".main .nav-li-list li:nth-last-child(-n+4)").hide();
        $(".main .nav-li-list li:nth-last-child(5)").click(function () {
            $(".main .nav-li-list li:nth-last-child(-n+4)").slideToggle();
            return false;
        })
    });
    $.get("http://139.199.157.195:9090/api/getmoneyctrl", function (data) {
        template.helper("getNumber1",function (str){
            var a = /\d/.exec(str);
            return a[0];
        });

        $(".dcProduct ul").html(template("dcproductemp",data));
    });



});
