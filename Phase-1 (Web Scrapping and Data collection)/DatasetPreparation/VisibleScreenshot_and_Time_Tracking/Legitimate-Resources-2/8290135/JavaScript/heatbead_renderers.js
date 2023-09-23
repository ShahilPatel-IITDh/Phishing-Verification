////////////////////////////////////////////////////////////////////////////////
function HeatBeadRendererCircle(heatbead, opts) {
    this.heatbead = heatbead;
    this.opts = opts || {};
    this.opts.outlineWidth = this.opts.outlineWidth || 1;
    this.cache = {};
    this.scale = 1.0;
}

HeatBeadRendererCircle.prototype.create = function(opts) {
    var r = opts.radius;
    var fill = opts.fill;
    var fillID = opts.fillID;

    var key = r+"_"+fillID;
    var circle = this.cache[key];
    if (circle) return circle;
    var circle = document.createElement('canvas');
    circle.width = circle.height = r*2 + this.opts.outlineWidth*2;
    var ctx = circle.getContext('2d');
    ctx.fillStyle=fill;
    ctx.beginPath();
    ctx.lineWidth = this.opts.outlineWidth;
    ctx.arc(r+this.opts.outlineWidth, r+this.opts.outlineWidth, r, 0, DEG360, true); // x,y,r,angle-from,angle-to,counterclockwise
    ctx.closePath();
    ctx.fill();    
    if (this.opts.outline) {
	ctx.strokeStyle = this.opts.outlineStyle;
	ctx.stroke();
    }
    this.cache[key] = circle;
    return circle;
}

////////////////////////////////////////////////////////////////////////////////
function HeatBeadRendererStarburst(heatbead, opts) {
    this.heatbead = heatbead;
    this.opts = opts || {};
    this.opts.outlineWidth = this.opts.outlineWidth || 1;
    this.cache = {};
    this.scale = 1.0;
}

HeatBeadRendererStarburst.prototype.create = function(opts) {
    var r = opts.radius;
    var fill = opts.fill;
    var fillID = opts.fillID;

    var key = r+"_"+fillID;
    var starburst = this.cache[key];
    if (starburst) return starburst;
    var starburst = document.createElement('canvas');
    starburst.width = starburst.height = r*2 + this.opts.outlineWidth*2;
    var ctx = starburst.getContext('2d');
    ctx.fillStyle=fill;
    ctx.beginPath();
    
    var lines = 4;
    var angleStep = 2*Math.PI/lines;
    for(var i=0;i<lines;i++){
	ctx.moveTo(r, r);
	ctx.arc(r,r,r,angleStep*i-0.1,angleStep*(i+0.1),false);
    }

    ctx.closePath();
    ctx.fill();

    this.cache[key] = starburst;
    return starburst;
}

////////////////////////////////////////////////////////////////////////////////
function HeatBeadRendererWord(heatbead, opts) {
    this.heatbead = heatbead;
    this.opts = opts;
    this.cache = {};
    this.imageCache = {};
}

HeatBeadRendererWord.prototype.renderImage = function(img, r, fill, key, word, ctx) {
    ctx.beginPath();
    ctx.arc(r/2, r/2, r/2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img,0,0,r,r);
    this.cache[key] = word;
}

HeatBeadRendererWord.prototype.create= function(opts) {
    var r = opts.radius;
    var fillID = opts.fillID;
    var text = opts.text;
    var key = r+"_"+fillID;
    var word = this.cache[key];
    if (word) return word;

    var fill = opts.fill;
    this.scale = 0.5;
    var word = document.createElement('canvas');
    if (opts.rendererCode == "profile") {
	this.scale = 0.5*Math.sqrt(2);
	word.width  = word.height = r;
	var ctx = word.getContext('2d');
	var username = text.replace("@","").split(" ")[0];
	var imgURL = '/tdata/c/users/profile_image/'+username+'?size=original';
	var img = this.imageCache[imgURL];
	if (!img) {
	    var img = new Image;
	    var This=this;
	    img.crossOrigin = "Anonymous";
	    img.src = imgURL;
	    img.onload = function() {
		This.renderImage(img, r, fill, key, word, ctx);
	    };
	    this.imageCache[imgURL] = img;
	    word=null; // Don't use until we have the image loaded above, so return null.
	} else {
	    this.renderImage(img, r, fill, key, word, ctx);
	}
    } else if (text.slice(0,1) == "!") { // font awesome...XXX
	this.scale = 0.5*Math.sqrt(2);
	word.width  = word.height = r;
	var ctx = word.getContext('2d');
	ctx.globalCompositeOperation='destination-atop';
	var path = text.slice(1,text.length);
	var imgURL = '/images/svgs/'+path;
	var img = this.imageCache[imgURL];
	if (!img) {
	    var img = new Image;
	    var This=this;
	    img.crossOrigin = "Anonymous";
	    img.src = imgURL;
	    img.onload = function() {
		ctx.fillStyle= fill;
		ctx.rect(0,0,r,r);
		ctx.fill();    
		ctx.drawImage(img,0,0,r,r);
		This.cache[key] = word;
	    };
	    this.imageCache[imgURL] = img;
	    word=null; // Don't use until we have the image loaded above, so return null.
	} else {
	    ctx.fillStyle= fill;
	    ctx.rect(0,0,r,r);
	    ctx.fill();    
	    ctx.drawImage(img,0,0,r,r);
	    this.cache[key] = word;
	}
    } else if (text.slice(0,1) == "*") {
	var overScaleAmount = 1.3; // Seems some of the font awesome such as *f1b3 doesn't fit sideways if we don't do his.s
	word.width  = r*overScaleAmount;
	word.height = r*overScaleAmount;
	var ctx = word.getContext('2d');
	ctx.textBaseline = 'middle';
	ctx.textAlign    = 'center'
	ctx.fillStyle    = fill;
	ctx.font         = r + "px FontAwesome";
	code = "0x" + text.replace(" ","").replace("*","")
	ctx.fillText(String.fromCharCode(code),r*overScaleAmount/2,r*overScaleAmount/2);
	//this.cache[key] = word; // Can't cache these ATM as the font may not have loaded here, and we otherwise end up with invalid cached image. Need to check load and refresh.
    } else {
	word.width=r*text.length;
	word.height = r*1.5;
	var ctx = word.getContext('2d');
	ctx.fillStyle=fill;
	ctx.textBaseline='top';

	ctx.font=r+"px sans-serif";
	ctx.fillText(text,word.width/4,r*0.25);
	this.cache[key] = word;
    }
    return word;
}

////////////////////////////////////////////////////////////////////////////////
function HeatBeadRendererSVGCircle(heatbead, opts) {
    this.heatbead = heatbead;
    this.opts = opts || {};
    this.opts.outlineWidth = this.opts.outlineWidth || 1;
    this.cache = {};
    this.scale = 1.0;
}

HeatBeadRendererSVGCircle.prototype.create = function(opts) {
    var r = opts.radius;
    var fill = opts.fill;
    var fillID = opts.fillID;

    var key = r+"_"+fillID;
    var circle = this.cache[key];
    if (circle) return circle;
    var circle = document.createElement('canvas');
    circle.width = circle.height = r*2 + this.opts.outlineWidth*2;
    var ctx = circle.getContext('2d');
    ctx.fillStyle=fill;
    ctx.beginPath();
    ctx.lineWidth = this.opts.outlineWidth;
    ctx.arc(r+this.opts.outlineWidth, r+this.opts.outlineWidth, r, 0, DEG360, true); // x,y,r,angle-from,angle-to,counterclockwise
    ctx.closePath();
    ctx.fill();
    if (this.opts.outline) {
       ctx.strokeStyle = this.opts.outlineStyle;
       ctx.stroke();
    }
    this.cache[key] = circle;
    return circle;
}

////////////////////////////////////////////////////////////////////////////////
