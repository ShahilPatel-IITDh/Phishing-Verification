var iswidgetscriptdone = 0;
function isItMobilePhone() {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
                return true;
            }
      return false;
        }
		
		 function sendleadevent(){
	  
	  
	  if (typeof dataLayer != 'undefined' && dataLayer && typeof dataLayer.push == 'function') {
        dataLayer.push({
        'event' : 'Livesquare Lead Generated',
        'eventCategory' : 'Livesquare',
        'eventAction' : 'Livesquare Lead Generated',
        'eventLabel' : 'Livesquare Conversion',
        'event_value' : 1,
                                'value': 1
        });

      }
	  
	  }
		
		//document.getElementsByTagName("body")[0].style = 'overflow-x: hidden;';
		//document.getElementsByTagName("html")[0].style = 'overflow-x: hidden;';
		//document.getElementsByClassName("LandbotProactive")[0].style = '@media screen and (min-width: 300px) { .LandbotProactive { display: block; width: 298px !important; }; }';


		function dynamicallyLoadScript(url) {
    var script = document.createElement("script"); // Make a script DOM node
    script.src = url; // Set it's src to the provided URL

    document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

 
dynamicallyLoadScript("https://cdn.landbot.io/landbot-3/landbot-3.0.0.js");

dynamicallyLoadScript("https://livesquare.in/chatbot/monolog.js");
 
  var myLandbot ="";
 
 
 var intervalchatbot = setInterval(function() {
    // get elem
    if (typeof Landbot == 'undefined') return;
    if (typeof Landbot.Livechat == 'undefined') return;
    clearInterval(intervalchatbot);
	if(iswidgetscriptdone == 1){return;}

// var css = '@media (min-width: 768px){ .LandbotLivechat.is-open { /*width: 400px !important;height: calc(80vh - 12px) !important; */}.LandbotLivechat.is-open {/*width: 400px;*/}} @media (max-width: 768px){.LandbotLivechat.is-open, .LandbotPopup.is-open { /*top: unset !important; left: unset !important; width: 100% !important; height: 450px !important; bottom: 0px !important; right: 0px !important;*/}',
//     head = document.head || document.getElementsByTagName('head')[0],
//     style = document.createElement('style');

// head.appendChild(style);

// style.type = 'text/css';
// if (style.styleSheet){
//   // This is required for IE8 and below.
//   style.styleSheet.cssText = css;
// } else {
//   style.appendChild(document.createTextNode(css));
// }


  /*myLandbot =   new LandbotLivechat({
    index: 'https://landbot.io/u/H-499535-5O0V4UV5CBO2EMZN/index.html?3434',
	accent: '#FDB813',
    open: false,
    proactive: false,
    font: 'Montserrat',
    launcherOptions: {
        enable: true,
      type: 'image',
	   image: "https://storage.googleapis.com/media.helloumi.com/27773/channels/ARMWWOB6QCY3WWA0KXRE8DIV4D9QGT92.png" ,
	  
	  shape: 'round',
      scale: 0.65,
	  },
  });*/
 
  myLandbot = new Landbot.Livechat({
    configUrl: 'https://chats.landbot.io/v3/H-1040149-FKAXOFTPFHN705VT/index.json',
  });
  iswidgetscriptdone = 1;
  console.clear();
 
  setTimeout(function() {
   console.clear();
  }, 2000);

  
  if(isItMobilePhone() == false)
  {
      setTimeout(function() {
   myLandbot.open(); console.clear();
  }, 2000);
  

  console.clear();
  }
  
   if(isItMobilePhone() == true)
  {
  
      setTimeout(function() {
    myLandbot.open();console.clear();
  }, 5000);
  
  }


}, 1000);


 

 
 
////////////////////New Code

// Get HTML head element 
        var head = document.getElementsByTagName('HEAD')[0];  
  
        // Create new link Element 
        var link = document.createElement('link'); 
  
        // set the attributes for link element  
        link.rel = 'stylesheet';  
      
        link.type = 'text/css'; 
      
        link.href = 'https://livesquare.in/chatbot/monolog.css';  
  
        // Append link element to HTML head 
        head.appendChild(link); 
		
		
		
	var modalpopupdivlivesquare = document.createElement('div');
     modalpopupdivlivesquare.setAttribute("id", "modalpoplivesquarebot");
	 document.body.appendChild(modalpopupdivlivesquare);
	 
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent,function(e) {
    var key = e.message ? "message" : "data";
    var data = e[key];
    if( data && data.includes && (data.includes(".jpg") || data.includes(".jpeg") || data.includes(".png")) ){

	if(document.getElementsByClassName("monolog-close")[0])
	{
		document.getElementsByClassName("monolog-close")[0].click();
	}


	var monolog = new Monolog({
				loader  : true,
				content: "test",
				close: true,
				onOpening: function() {
					console.log('OPENING ...');
				},
				onOpened: function() {
					console.log('... OPENED !');
          if(data.includes('landbot'))
          {
this.setContent('<img style="width:100% !important;max-height:100vh;" src="'+data+'"</>');
          }
          else{
            this.setContent('<img style="width:100% !important;max-height:100vh;" src="https://livesquare.in/chatbot/puravankara/'+data+'"</>');
          }
					
				},
				onClosing: function() {
					console.log('CLOSING ...');
				},
				onClosed : function () {
					console.log('... CLOSED !');
				}
			});
			
			 if(document.getElementById("modalpoplivesquarebot")){
  	 document.getElementById("modalpoplivesquarebot").onclick = function() {
monolog.show();
}
document.getElementById("modalpoplivesquarebot").click();
}	
			
		}
    //run function//
},false);
