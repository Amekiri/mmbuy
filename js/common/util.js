/**
 * Created by king on 2017/3/7.
 */
 var util= {
    // 閼惧嘲褰囬幐鍥х暰閻ㄥ嫭鐓＄拠銏犵摟缁楋缚瑕咥AA
    getQueryString: function (key) {

        // 閸樼粯甯�鐎涙顑佹稉鏌ヮ浕鐎涙鐦�?閸�?
        var search = location.search.slice(1);

        // 娴ｈ法鏁�&缁楋箑褰垮妤�鍩屽В蹇庣娑撶尛ey=val
        var searchArr = search.split('&');
        var tempArr = null;
        var searchObj = {};

        // 闁秴宸婚弫鎵矋娑擃厾娈戝В蹇庣娑撶尛ey=val鐎涙顑佹稉璇х礉娴ｈ法鏁�=閸欏嘲濡跺?閿�?
        // 閻掕泛鎮楁禒顧眅y娑撳搫鎮曢敍瀵乤l娑撳搫?鍏煎潑閸旂姴鍩宻earchObj鐎电钖勬稉顓�??
        for (var i = 0, len = searchArr.length; i < len; i++) {
            tempArr = searchArr[i].split('=');
            searchObj[tempArr[0]] = tempArr[1];
        }

        // 閺堝寮弫鎷岀箲閸ョ偞瀵氱�规艾?纭风礉濞屸剝婀侀崣鍌涙殶鏉╂柨娲栭崗銊╁劥閸�?
        return arguments.length ? searchObj[key] : searchObj;
        //return searchObj;
    },

    extend: function () {

    },
    tap: function (dom, callback) {
        /*閸掋倖鏌囬張澶嬬梾閺堝绱堕崗顧猳m鐎电钖�*/
        if (!dom || typeof dom != "object") {
            return;
        }
        /*缁夎濮╃粩顖滄畱閸楁洖鍤禍瀣╂娑�?閼割兛濞囬悽鈺皁uch閺夈儲膩閹风噦绱濈�瑰啩绔撮懜顒勬付鐟曚焦寮х搾鍏呰⒈娑擃亝娼禒?
         * 1.娑撳秷鍏樺鎴濆З鏉�?
         * 2.end閸滃tart閻ㄥ嫭妞傞梻鏉戞▕瀵倷绔撮懜顒�绨茬拠銉ユ躬150ms娴犮儱鍞撮敍灞筋洤閺嬫粌妯婂鍌氥亰婢堆嶇礉鐏忓崬绨茬拠銉︽Цlongpress闂�鎸庡瘻娴滃娆�*/
        /*閺嶅洩顔囬弰顖氭儊閺囧墽绮″鎴濆З鏉�?*/
        var isMove = false;
        /*鐠佹澘缍嶉幍瀣瘹閹稿绗呴惃鍕闂�?*/
        var st = 0;
        dom.addEventListener("touchstart", function (e) {
            /*Date.now()閿涙艾鐣犻懢宄板絿閻ㄥ嫭妲稿В顐ゎ潡閺�?*/
            st = Date.now();
        })
        dom.addEventListener("touchmove", function (e) {
            isMove = true;
        })
        dom.addEventListener("touchend", function (e) {
            var et = Date.now();
            /*閸掋倖鏌囬張顒侇偧閹垮秳缍旈弰顖氭儊閺勵垰宕熼崙璁崇皑娴�?*/
            if (isMove == false && et - st < 150) {
                callback && callback(e);
            }
            /*闁插秶鐤�*/
            isMove = false;
        });
    },
    addAnimationEnd: function (dom, callback) {
        dom.addEventListener("webkitAnimationEnd", function () {
            callback && callback();
        });
        dom.addEventListener("animationEnd", function () {
            callback && callback();
        });
        dom.addEventListener("oAnimationEnd", function () {
            callback && callback();
        });
        dom.addEventListener("msAnimationEnd", function () {
            callback && callback();
        });
        dom.addEventListener("mozAnimationEnd", function () {
            callback && callback();
        });
    },
    //澧炲姞浜嗕竴涓椂闂存埑  鏍煎紡 锛�  2017/03/09 14:30:55
    fnTime:function () {
        var myTime = new Date(); //绫诲瀷 => object;
        var iYear = myTime.getFullYear();
        var iMonth = myTime.getMonth() + 1;
        //鎸夋暟缁勬潵鐨勶紝鎵�浠ヨ鍔犱竴锛�
        var iDate = myTime.getDate(); //杩欎釜鏈堝ぉ鏁�
        var iWeek = myTime.getDay();
        //閮芥槸鏁板瓧绫诲瀷,0 澶�;
        var iHours = myTime.getHours();
        var iMinutes = myTime.getMinutes();
        var iSeconds = myTime.getSeconds();
        var str = '';
        if (iWeek == 0)iWeek = '鏄熸湡鏃�';
        if (iWeek == 1)iWeek = '鏄熸湡涓�';
        if (iWeek == 2)iWeek = '鏄熸湡浜�';
        if (iWeek == 3)iWeek = '鏄熸湡涓�';
        if (iWeek == 4)iWeek = '鏄熸湡鍥�';
        if (iWeek == 5)iWeek = '鏄熸湡浜�';
        if (iWeek == 6)iWeek = '鏄熸湡鍏�';
        str = iYear + '/' + toTwo(iMonth) + '/' + toTwo(iDate) + ' ' + toTwo(iHours) + ':' + toTwo(iMinutes) + ':' + toTwo(iSeconds);
        function toTwo(n){
            return n<10?'0'+n:''+n;
        };
        return str;
    }
}

