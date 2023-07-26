
var myDate = new Date();
myDate.getYear();        //获取当前年份(2位)
myDate.getFullYear();    //获取完整的年份(4位,1970-????)
myDate.getMonth();       //获取当前月份(0-11,0代表1月)
myDate.getDate();        //获取当前日(1-31)
myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
myDate.getHours();       //获取当前小时数(0-23)
myDate.getMinutes();     //获取当前分钟数(0-59)
myDate.getSeconds();     //获取当前秒数(0-59)
myDate.getMilliseconds();    //获取当前毫秒数(0-999)
myDate.toLocaleDateString();     //获取当前日期
var mytime=myDate.toLocaleTimeString();     //获取当前时间
myDate.toLocaleString( );        //获取日期与时间

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate()+1;
    if(strDate>30){
       month = month+1; 
       strDate = 1;
    }
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    
    document.getElementById('sj').innerHTML = year+"/"+month+"/"+strDate;
    // var currentdate = year + seperator1 + month + seperator1 + strDate
    //         + " " + date.getHours() + seperator2 + date.getMinutes()
    //         + seperator2 + date.getSeconds();
}
getNowFormatDate();
    // date1 = document.getElementById('date1').innerHTML;
    // date2 = document.getElementById('date2').innerHTML;
    // date3 = document.getElementById('date3').innerHTML;
    // date4 = document.getElementById('date4').innerHTML;
    // date5 = document.getElementById('date5').innerHTML;
    // date6 = document.getElementById('date6').innerHTML;
    // date7 = document.getElementById('date7').innerHTML;
    // date8 = document.getElementById('date8').innerHTML;

    // // var today = new Date();
    // // today.setDate(today.getDate() - 1); // 获取前一天的日期

    // // var year = today.getFullYear().toString().slice(-2); // 提取年份的后两位
    // // var month = (today.getMonth() + 1).toString().padStart(2, '0'); // 月份需要加1，并且补零
    // // var day = today.getDate().toString().padStart(2, '0'); // 补零

    // // var formattedDate = year + month + day;
    // // // console.log(formattedDate); // 输出前一天的日期，格式为yyddmm

    // var today = new Date();
    // var day = today.getDate();
    // var dd = today.getDate().toString().padStart(2, '0');

    // if (day === 1) {
    //   today.setMonth(today.getMonth() - 1); // 将月份减1
    //   day = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // 获取上个月的最后一天
    //   day1 = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()-1; // 获取上个月的最后一天
    //   day2 = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()-2; // 获取上个月的最后一天
    //   day3 = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()-3; // 获取上个月的最后一天
    // }

    // if (day === 2) {
    //   today.setMonth(today.getMonth() - 1); // 将月份减1
    //   day1 = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // 获取上个月的最后一天
    //   day2 = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()-1; // 获取上个月的最后一天
    //   day3 = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()-2; // 获取上个月的最后一天
    // }

    // if (day === 3) {
    //   today.setMonth(today.getMonth() - 1); // 将月份减1
    //   day2 = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // 获取上个月的最后一天
    //   day3 = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()-1; // 获取上个月的最后一天
    // }

    // if (day === 4) {
    //   today.setMonth(today.getMonth() - 1); // 将月份减1
    //   day3 = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // 获取上个月的最后一天
    // }

    // if(day>4){
    //   day1 = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // 获取上个月的最后一天
    //   day2 = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()-1; // 获取上个月的最后一天
    //   day3 = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()-2; // 获取上个月的最后一天
    // }

    // today.setDate(day - 1); // 获取前一天的日期

    // var year = today.getFullYear().toString().slice(-2); // 提取年份的后两位
    // var month = (today.getMonth() + 1).toString().padStart(2, '0'); // 月份需要加1，并且补零
    // day = today.getDate().toString().padStart(2, '0'); // 补零

    // var formattedDate = year + month + day;
    // console.log(formattedDate); // 输出前一天的日期，格式为yyddmm

    // if(day>4){
    //   day1 = (day-1).toString().padStart(2, '0'); // 获取上个月的最后一天
    //   day2 = (day-2).toString().padStart(2, '0'); // 获取上个月的最后一天
    //   day3 = (day-3).toString().padStart(2, '0'); // 获取上个月的最后一天
    // }

    // if(month == 1){
    //     month = "محرّم"
    // }

    // if(month == 2){
    //     month = "صفر"
    // }

    // if(month == 3){
    //     month = "ربيع الأول"
    // }

    // if(month == 4){
    //     month = "ربيع الثاني"
    // }

    // if(month == 5){
    //     month = "جمادى الأولى"
    // }

    // if(month == 6){
    //     month = "جمادى الثانية"
    // }

    // if(month == 7){
    //     month = "رجب"
    // }

    // if(month == 8){
    //     month = "شعبان"
    // }

    // if(month == 9){
    //     month = "رمضان"
    // }

    // if(month == 10){
    //     month = "شوال"
    // }

    // if(month == 11){
    //     month = "ذو القعدة"
    // }

    // if(month == 12){
    //     month = "ذو الحجة"
    // }

    // document.getElementById('date1').innerHTML = " " + day+month+"  2023"+" 11:38:00  صباحاً " ;
    // document.getElementById('date2').innerHTML = " " + day+month+"  2023"+" 04:35:00 صباحاً";
    // document.getElementById('date3').innerHTML = " " + day1+month+"  2023"+" 01:03:00 صباحاً";
    // document.getElementById('date4').innerHTML = " " + day2+month+"  2023"+" 06:04:15 مساءاًً";
    // document.getElementById('date5').innerHTML = " " + day3+month+"  2023"+" 03:08:28 مساءاًً";
    // document.getElementById('date6').innerHTML = " " + day3+month+"  2023"+" 02:18:14 مساءاًً";
    // document.getElementById('date7').innerHTML = " " + day3+month+"  2023"+" 11:38:21 صباحاً";
    // document.getElementById('date8').innerHTML = "آخر تحديث: "+ dd + month +" 2023 في 12:07:51 م";

