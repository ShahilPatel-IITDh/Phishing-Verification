console.log(
  "%cNGUYỄN DUY TÂN ĐÃ LÀM CÁI NÀY, FAKE CÁI ĐỊT CON MẸ MÀY Ý À THẰNG NGU LỒN? MÀY TIN TAO GẶP MÀY TAO SÚT TUNG MỒM MÀY LÊN KHÔNG ÓC CHÓ ? ",
  " color: red; font-size:28px;"
);
const Tpmangxa = 1;
const Tpthanhnu = 2;
const Vmhoangkim = 3;
const Thevocuc = 4;

var hieu_ung = {
  el: "#img_quay",
  stop_point: null,
  interval_id: null,
  rotate_count: 4,
  old_point: {
    check: false,
    value_old: null,
    value_new: null,
  },

  play: function () {
    if (!this.stop_point) return;
    if (this.old_point.value_old == null) {
      this.old_point.value_old = this.old_point.value_new;
    }

    $(this).css(
      "-webkit-transform",
      "rotate(" + this.old_point.value_old + "deg)"
    );
    $(this).css(
      "-moz-transform",
      "rotate(" + this.old_point.value_old + "deg)"
    );
    $(this).css("transform", "rotate(" + this.old_point.value_old + "deg)");

    var v_old = this.old_point.value_old;
    var v_stop = this.stop_point;
    var element = this.el;
    var v_this = this;

    $(this.el).animate(
      {
        transform: v_stop,
      },
      {
        step: function (now, fx) {
          fx.start = v_old;
          if (now >= v_old) {
            $(this).css("-webkit-transform", "rotate(" + now + "deg)");
            $(this).css("-moz-transform", "rotate(" + now + "deg)");
            $(this).css("transform", "rotate(" + now + "deg)");
          }
        },
        duration: 5000,
      },
      "ease-out"
    );
    //},0)
  },
  stop: function () {
    $(this.el).stop();
  },
  setStopPoint: function (point) {
    if (this.stop_point != null) {
      this.old_point.check = true;
    }
    // var arr_point = point;
    var valueArrPoint = point + 0;
    this.stop_point = this.rotate_count * 360 + valueArrPoint;
    if (this.old_point.check) {
      //if(this.old_point.value_old == null)
      this.old_point.value_old = this.old_point.value_new;
      this.old_point.value_new = valueArrPoint;
    } else {
      this.old_point.value_old = 0;
      this.old_point.value_new = valueArrPoint;
    }
  },
};

var isBusying = false;
var domain = $("#domain").val();
function asdncasmklca213421() {
  if (!isBusying) {
    isBusying = true;
    $(".my-2").addClass("d-none");
    $.ajax({
      url: domain + "spin",
      // type: 'GET',
      type: "POST",
      data: {
        spin_code: $("input[name=spin_code]").val(),
      },
      dataType: "json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "X-CSRF-TOKEN",
          $('meta[name="csrf-token"]').attr("content")
        );
      },
      success: function (response) {
        var luotquayhientai = document.getElementById("luotquay").textContent;
        if (luotquayhientai > 0) {
          document.getElementById("luotquay").innerText = luotquayhientai - 1;
        }
        setTimeout(function () {
          // response.code = 1;
          // response.sfadsaweqweqw = -60;
          if (response.code == -10) {
            $("#spinForm").modal("show");
            $(".my-2").removeClass("d-none");
          }
          if (response.sfadsaweqweqw == 0) {
            $("#spinForm").modal("show");
            $(".my-2").removeClass("d-none");
            $(".my-2 .text-error").html(
              "Có lỗi hệ thống, bạn vui lòng thử lại sau."
            );
            isBusying = false;
            return;
          }
          if (response.code == 1) {
            hieu_ung.setStopPoint(response.sfadsaweqweqw);
            $("#ketqua").html(".");
            hieu_ung.play();
            setTimeout(function () {
              isBusying = false;
              // $("#messageSpin .style-message").html(response.msg);
              // $("#messageSpin").modal();
              switch (response.type) {
                case Tpmangxa:
                  $("#Tpmangxa").modal();
                  break;
                case Tpthanhnu:
                  $("#Tpthanhnu").modal();
                  break;
                case Vmhoangkim:
                  $("#Vmhoangkim").modal();
                  break;
                case Thevocuc:
                  $("#Thevocuc").modal();
                  break;
                default:
                  break;
              }
              $("input[name=spin_code]").val("");

              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({ event: "redeemtion" });

              // if (response.dds && response.dds < 5) {
              //     $('.btnSubmitSpinModal').unbind('click').click(function () {
              //         $("#updateProfile").modal();
              //     })
              // } else {
              //     $('.btnSubmitSpinModal').unbind('click');
              // }
            }, 5000);
          } else {
            $("#spinForm").modal("show");
            // $("#messageSpin .style-message").html(response.msg);
            // $("#messageSpin").modal();
            $(".my-2").removeClass("d-none");
            $(".my-2 .text-error").html(response.msg);
            isBusying = false;
          }
        }, 0);
      },
      fail: function () {
        isBusying = false;
      },
      complete: function () {
        isBusying = false;
      },
    });
  }
}
$("#show-login-fb").click(function () {
  $("#signin").hide();
  $(".login-facebook").show();
});
$(document).ready(function () {
  $("#KenSine_Quay").click(function () {
    asdncasmklca213421();
  });
});
