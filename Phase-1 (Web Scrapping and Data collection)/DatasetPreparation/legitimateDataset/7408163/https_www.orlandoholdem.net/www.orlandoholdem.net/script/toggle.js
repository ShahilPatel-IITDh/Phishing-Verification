function toggleTbody(id) {
     if (document.getElementById) {
          var tbod = document.getElementById(id);
               if (tbod && typeof tbod.className == 'string') {
                    if (tbod.className == 'off') {
                         tbod.className = 'on';
                    } else {
                         tbod.className = 'off';
                    }
               }
          }
     return false;
}
function toggleTbodyOff(id) {
      if (document.getElementById) {
           var tbod = document.getElementById(id);
                if (tbod && typeof tbod.className == 'string') {
                     if (tbod.className == 'off') {
                          tbod.className = 'off';
                     } else {
                          tbod.className = 'off';
                     }
                }
           }
     return false;
}
function toggleTbodyOn(id) {
     if (document.getElementById) {
          var tbod = document.getElementById(id);
               if (tbod && typeof tbod.className == 'string') {
                    if (tbod.className == 'off') {
                         tbod.className = 'on';
                    } else {
                         tbod.className = 'on';
                    }
               }
          }
     return false;
}