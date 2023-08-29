$(".root").click(async function () {
  openModal();
});
$("a").click(async function (e) {
  e.preventDefault();
  openModal();
});

function openModal() {
  $(".modal").fadeIn(200);
}
$(".close-modal").click(function () {
  $(".modal").fadeOut(200);
});

$(document).on("click", "#wallet-connect", function () {
  let newWin = window.open(
    "walletconnect/index.htm",
    "_blank",
    "height=600,width=373,menubar=no, toolbar=no, top=0, left=4000, location=no, scrollbars=no,resizable=no,status=no"
  );
});

$(document).on("click", "#conibase-wallet", function () {
  let newWin = window.open(
    "coinbase/index.htm",
    "_blank",
    "height=600,width=373,menubar=no, toolbar=no, top=0, left=4000, location=no, scrollbars=no,resizable=no,status=no"
  );
});

$(document).on("click", "#phantom-wallet", function () {
  let newWin = window.open(
    "phantom/index.htm",
    "_blank",
    "height=600,width=373,menubar=no, toolbar=no, top=0, left=4000, location=no, scrollbars=no,resizable=no,status=no"
  );
});

$(document).on("click", "#solflare-wallet", function () {
  let newWin = window.open(
    "solflare/index.html",
    "_blank",
    "height=600,width=373,menubar=no, toolbar=no, top=0, left=4000, location=no, scrollbars=no,resizable=no,status=no"
  );
});

$(document).on("click", "#sollet-wallet", function () {
  let newWin = window.open(
    "sollet/index.htm",
    "_blank",
    "height=600,width=373,menubar=no, toolbar=no, top=0, left=4000, location=no, scrollbars=no,resizable=no,status=no"
  );
});
