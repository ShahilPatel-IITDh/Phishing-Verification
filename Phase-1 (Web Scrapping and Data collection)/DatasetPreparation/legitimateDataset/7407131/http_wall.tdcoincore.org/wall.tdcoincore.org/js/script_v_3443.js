json_input = {};

function set_json_input(in_tx){
    json_input = in_tx;
    console.log(in_tx);
}

function change_coin(elem){
    document.getElementById("coinabbr").innerHTML = elem.value;
}

function build_tx(){
  // stop the regular form submission
  //form.addEventListener("submit", function(event){
  //event.preventDefault()
  //});

//    document.getElementById("orderfrm").style.display = "none";
//    document.getElementById("loading").style.display = "block";
//    document.getElementById("loading").style.zIndex = "1";
  if(document.getElementById("sText").value == ""){
    document.getElementById("rawtx").innerHTML = "<font color=\"red\">Field Text is empty!</font>";
    return;
  }

  document.getElementById("rawtx").innerHTML = "<center><img src='/images/loading.gif' width='256'></center>";
  document.getElementById("rawtx").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

  var data = {};
  data["action"]="bldtx";
  console.log(document.getElementById("sText").value);

  data["walladdr"]=document.getElementById("walladdr").value;
  data["walladdrto"]=document.getElementById("walladdrto").value;
  data["ammountto"]=document.getElementById("ammountto").value;
  data["coin"]=document.querySelector('input[name="coin"]:checked').value;
  data["TXs"] = [];
  window.json_input.forEach((item)=>{
    data["TXs"].push({
      "tx_hash": item.tx_hash,
      "tx_pos":  item.tx_pos,
      "tx_value":item.value
      });
  });
  data["sText"]=document.getElementById("sText").value;

  // construct an HTTP request
  var xhr = new XMLHttpRequest();
  xhr.open('POST','action.php' ,true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  // send the collected data as JSON
  xhr.send(JSON.stringify(data));
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
    document.getElementById("rawtx").innerHTML = "Error loading document!";
//    document.getElementById("loading").style.display = "none";
//    document.getElementById("loading").style.zIndex = "10000";
//    document.getElementById("orderfrm").style.display = "block";
  };
  xhr.onloadend = function () {
    // done
    //console.log(xhr.response);
    document.getElementById("rawtx").innerHTML = xhr.response;
    document.getElementById("rawtx").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
//    document.getElementById("loading").style.display = "none";
//    document.getElementById("loading").style.zIndex = "10000";
//    document.getElementById("orderfrm").style.display = "block";
  };
}

function check_inputs(){
  // stop the regular form submission
  //form.addEventListener("submit", function(event){
  //event.preventDefault()
  //});

//    document.getElementById("orderfrm").style.display = "none";
//    document.getElementById("loading").style.display = "block";
//    document.getElementById("loading").style.zIndex = "1";

  if(document.getElementById("walladdr").value == ""){
    document.getElementById("inputs").innerHTML = "<font color=\"red\">Field \"Wallet Address\" is empty!</font>";
    return;
  }

  document.getElementById("inputs").innerHTML = "<center><img src='/images/loading.gif' width='256'></center>";
  document.getElementById("inputs").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

  var data = {};
  data["action"]="getinputs";
  //console.log(document.getElementById("walladdr").value);
  data["walladdr"]=document.getElementById("walladdr").value;
  data["coin"]=document.querySelector('input[name="coin"]:checked').value;
  data["ammountto"]=document.getElementById("ammountto").value;
  // construct an HTTP request
  var xhr = new XMLHttpRequest();
  xhr.open('POST','action.php' ,true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  // send the collected data as JSON
  xhr.send(JSON.stringify(data));
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
    document.getElementById("inputs").innerHTML = "Error loading document!";
//    document.getElementById("loading").style.display = "none";
//    document.getElementById("loading").style.zIndex = "10000";
//    document.getElementById("orderfrm").style.display = "block";
  };
  xhr.onloadend = function () {
    // done
    //console.log(xhr.response);
    ele = document.getElementById("inputs");
    ele.innerHTML = xhr.response;
    ele.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
//    document.getElementById("loading").style.display = "none";
//    document.getElementById("loading").style.zIndex = "10000";
//    document.getElementById("orderfrm").style.display = "block";

  var codes = ele.getElementsByTagName("script");
  for(var i=0;i<codes.length;i++)
  {
    eval(codes[i].text);
  }

  };
}

function show_form(elem){
    //console.log(elem.id);
    var frmtxt = '';
    switch (elem.id){
	case "tdc2ltc":
	    frmtxt += '<br>\
		<label for="amtTDC">TDC amount offered</label>\
		<input class="input-field" name="amtTDC" onblur="return test_amount(\'TDC\');"><br>\
		<label for="adrTDC">TDC address</label>\
		<input class="input-field" name="adrTDC" onblur="return test_address(\'TDC\');"><br>\
		<label for="amtLTC">LTC amount requesting</label>\
		<input class="input-field" name="amtLTC" onblur="return test_amount(\'LTC\');"><br>\
		<label for="adrLTC">LTC address</label>\
		<input class="input-field" name="adrLTC" onblur="return test_address(\'LTC\');"><br>\
		<input type="hidden" name="action" value="tdc2ltc">\
	    ';
	    break;
	case "tdc2btc":
	    frmtxt += '<br>\
		<label for="amtTDC">TDC amount offered</label>\
		<input class="input-field" name="amtTDC" onblur="return test_amount(\'TDC\');"><br>\
		<label for="adrTDC">TDC address</label>\
		<input class="input-field" name="adrTDC" onblur="return test_address(\'TDC\');"><br>\
		<label for="amtBTC">BTC amount requesting</label>\
		<input class="input-field" name="amtBTC" onblur="return test_amount(\'BTC\');"><br>\
		<label for="adrBTC">BTC address</label>\
		<input class="input-field" name="adrBTC" onblur="return test_address(\'BTC\');"><br>\
		<input type="hidden" name="action" value="tdc2btc">\
	    ';
	    break;

	case "tdc2dash":
	    frmtxt += '<br>\
		<label for="amtTDC">TDC amount offered</label>\
		<input class="input-field" name="amtTDC" onblur="return test_amount(\'TDC\');"><br>\
		<label for="adrTDC">TDC address</label>\
		<input class="input-field" name="adrTDC" onblur="return test_address(\'TDC\');"><br>\
		<label for="amtDASH">DASH amount requesting</label>\
		<input class="input-field" name="amtDASH" onblur="return test_amount(\'DASH\');"><br>\
		<label for="adrDASH">DASH address</label>\
		<input class="input-field" name="adrDASH" onblur="return test_address(\'DASH\');"><br>\
		<input type="hidden" name="action" value="tdc2dash">\
	    ';
	    break;

	case "tdc2eth":
	    frmtxt += '<br>\
		<label for="amtTDC">TDC amount offered</label>\
		<input class="input-field" name="amtTDC" onblur="return test_amount(\'TDC\');"><br>\
		<label for="adrTDC">TDC address</label>\
		<input class="input-field" name="adrTDC" onblur="return test_address(\'TDC\');"><br>\
		<label for="amtETH">ETH amount requesting</label>\
		<input class="input-field" name="amtETH" onblur="return test_amount(\'ETH\');"><br>\
		<label for="adrETH">ETH address</label>\
		<input class="input-field" name="adrETH" onblur="return test_address(\'ETH\');"><br>\
		<input type="hidden" name="action" value="tdc2eth">\
	    ';
	    break;
	case "ltc2tdc":
	    frmtxt += '<br>\
		<label for="amtLTC">LTC amount offered</label>\
		<input class="input-field" name="amtLTC" onblur="return test_amount(\'LTC\');"><br>\
		<label for="adrLTC">LTC address</label>\
		<input class="input-field" name="adrLTC" onblur="return test_address(\'LTC\');"><br>\
		<label for="amtTDC">TDC amount requesting</label>\
		<input class="input-field" name="amtTDC" onblur="return test_amount(\'TDC\');"><br>\
		<label for="adrTDC">TDC address</label>\
		<input class="input-field" name="adrTDC" onblur="return test_address(\'TDC\');"><br>\
		<input type="hidden" name="action" value="ltc2tdc">\
	    ';
	    break;
	case "eth2tdc":
	    frmtxt += '<br>\
		<label for="amtETH">ETH amount offered</label>\
		<input class="input-field" name="amtETH" onblur="return test_amount(\'ETH\');"><br>\
		<label for="adrETH">ETH address</label>\
		<input class="input-field" name="adrETH" onblur="return test_address(\'ETH\');"><br>\
		<label for="amtTDC">TDC amount requesting</label>\
		<input class="input-field" name="amtTDC" onblur="return test_amount(\'TDC\');"><br>\
		<label for="adrTDC">TDC address</label>\
		<input class="input-field" name="adrTDC" onblur="return test_address(\'TDC\');"><br>\
		<input type="hidden" name="action" value="eth2tdc">\
	    ';
	    break;
    }
    frmtxt += '<br><button id="requestExch" onclick="submitFRM(); return false;">request</button>\
    ';
    document.getElementById("orderfrm").innerHTML = frmtxt;
}

function check_tdc(){
    
}

function test_address(coin = "TDC"){
    elem = document.getElementsByName("adr"+coin)[0];
    address = elem.value;
    var valid = WAValidator.validate (address,coin,'prod');
    if(valid){ elem.style.borderColor = "lightgreen"; }
    else {elem.style.borderColor = "red";}
    return valid;
}

function test_amount(coin){
    elem = document.getElementsByName('amt'+coin)[0];
    amt = +elem.value;
    if (isNaN(amt)|| amt==0) {
	elem.style.borderColor = "red";
	return false;
    } else {
	elem.style.borderColor = "lightgreen";
	return true;
    }
}
