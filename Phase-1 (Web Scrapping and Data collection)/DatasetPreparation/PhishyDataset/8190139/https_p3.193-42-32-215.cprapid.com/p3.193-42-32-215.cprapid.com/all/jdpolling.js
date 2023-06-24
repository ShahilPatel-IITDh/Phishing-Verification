		
var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
		
		// per far viaggiare i cookie nelle chiamate in CORS
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		
        return xhr;
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

	// per il CORSO SU IE
	if (new XMLHttpRequest().withCredentials === undefined) {
		var xdr = new XDomainRequest();
		return xdr;
	}


    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};





ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    
    
    
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};


ajax.send_auth = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    
    
    
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
       // x.setRequestHeader ("Authorization", make_base_auth(document.getElementById("client_id").value , document.getElementById("secret").value));
    }
    x.send(data)
};


        

ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), async)
};

ajax.post_auth = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send_auth(url, callback, 'POST', query.join('&'), async)
};


var POLLINGURI = "";

var SUCCESSCALLBACK = null;
var ERRORCALLBACK = null;
var BLOCKPOLLING= false;

var POLLINGSTATUS = "az_not_found";
var IK = "";
var XDATA = "";
var MODALOBJSHOW = false;

function jd_qrpush(uriPolling, ik, successcallback, errorcallback, modalid) {
	
						POLLINGURI = uriPolling;
						SUCCESSCALLBACK  = successcallback;
						ERRORCALLBACK  = errorcallback;
						IK  = ik;
						var params = {
							
								ik: ik
							
						}
						
						ajax.post(uriPolling, params, function(xdata) {
							
							var objr = JSON.parse(xdata);	
							
							if (objr.error!=null) {
								ERRORCALLBACK(xdata);
								return;
							}
							
				
							jd_polling();
		
				
					}, true);
}

function jd_polling() {
	
		try {
			
						if (BLOCKPOLLING) {
							return;
						}	
						var par = {
							
							ik: IK
							
							};		
						ajax.post(POLLINGURI,par, function  (xdata) {
							
							
						if (BLOCKPOLLING) {
							return;
						}		
														
							   var obj_p = JSON.parse(xdata);
							
								XDATA  = xdata;
								POLLINGSTATUS = obj_p.status;
								
								},true );
							
							if (POLLINGSTATUS=="az_error")	 {
								BLOCKPOLLING = true;
								

									ERRORCALLBACK(XDATA);
									return;
								
							}
							
							if (POLLINGSTATUS=="az_rejected")	 {
								BLOCKPOLLING = true;
								
								
									ERRORCALLBACK(XDATA);
									return;
								
							}
							
							if (POLLINGSTATUS=="az_timeout")	 {
								BLOCKPOLLING = true;
								
								
									ERRORCALLBACK(XDATA);
									return;
								
							}
							
							
							
							// ancora non fa l afoto
							if (POLLINGSTATUS=="az_not_found")	 {
												
								setTimeout(jd_polling, 500);
													
							}
	
							if (POLLINGSTATUS=="az_user_invalid_app_type") {
								BLOCKPOLLING = true;
								
								
									ERRORCALLBACK(XDATA);
									return;
								
							}
							
							// l'utente ha fatto la foto apro il popup
							if (POLLINGSTATUS=="az_required")	 {
								
								if (!MODALOBJSHOW) {
									
									MODALOBJSHOW = true;
									$('#modalQrWaiting').modal({backdrop: 'static', keyboard: false, show: true});
									
								}
												
								setTimeout(jd_polling, 500);
													
							}
							
							if (POLLINGSTATUS=="az_user_confirmed")	 {
								BLOCKPOLLING = true;
								setTimeout(function() {
									SUCCESSCALLBACK(XDATA);
								}, 1000);
								
								return;			
		
							}
							
						
		} catch (e) {
			setTimeout(jd_polling, 500);
		}
}

function stopPolling() {
	BLOCKPOLLING = true;
}

function jdstatus() {
	return POLLINGSTATUS;
}
