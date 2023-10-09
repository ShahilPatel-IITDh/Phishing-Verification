$('.info-detail').each(function(i){
	   var before=$(this).prev().height();
	   if(before > $(this).height()){
	   	$(this).css('min-height',before+'px');
	   }
	});
	$('.info-detail>input,.info-detail>textarea').focus(function(){
		$(this).select();
	});
	$(".info-detail>p").click(function() { 
	    var sel, range;
	    var el = $(this)[0];
	    if (window.getSelection && document.createRange) { //Browser compatibility
	      sel = window.getSelection();
	      if(sel.toString() == ''){ //no text selection
	         window.setTimeout(function(){
	            range = document.createRange(); //range object
	            range.selectNodeContents(el); //sets Range
	            sel.removeAllRanges(); //remove all ranges from selection
	            sel.addRange(range);//add Range to a Selection.
	        },1);
	      }
	    }else if (document.selection) { //older ie
	        sel = document.selection.createRange();
	        if(sel.text == ''){ //no text selection
	            range = document.body.createTextRange();//Creates TextRange object
	            range.moveToElementText(el);//sets Range
	            range.select(); //make selection.
	        }
	    }
	});
	$('.menu-hide').click(function(){
		var left=$(".left-side");
		if(left.hasClass('hidden-xs')){
			left.removeClass('hidden-xs');
		}else{
			left.addClass('hidden-xs');
		}
	});
	$("a").bind("focus", function(){
      if(this.blur){
        this.blur();
      }
    });
    var mailDo=new Array('@temporary-mail.net');
    var mailStr=Math.random().toString(36).substr(2);
    var mailIndex = Math.floor((Math.random()*mailDo.length)); 
    $('#fake-email').text(mailStr+mailDo[mailIndex]);
	$('#generate').click(function(){
	    	$(this).val('waiting...').addClass('disabled');
	    });
	$(".tele li b").click(function() { 
	    var sel, range;
	    var el = $(this)[0];
	    if (window.getSelection && document.createRange) { //Browser compatibility
	      sel = window.getSelection();
	      if(sel.toString() == ''){ //no text selection
	         window.setTimeout(function(){
	            range = document.createRange(); //range object
	            range.selectNodeContents(el); //sets Range
	            sel.removeAllRanges(); //remove all ranges from selection
	            sel.addRange(range);//add Range to a Selection.
	        },1);
	      }
	    }else if (document.selection) { //older ie
	        sel = document.selection.createRange();
	        if(sel.text == ''){ //no text selection
	            range = document.body.createTextRange();//Creates TextRange object
	            range.moveToElementText(el);//sets Range
	            range.select(); //make selection.
	        }
	    }
	});