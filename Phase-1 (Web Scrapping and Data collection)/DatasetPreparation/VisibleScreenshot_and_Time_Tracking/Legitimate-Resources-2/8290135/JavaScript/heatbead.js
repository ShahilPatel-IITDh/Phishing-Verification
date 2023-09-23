var DEG360=Math.PI*2;
function HeatBead(opts) {
    if (opts.canvas) {
	this.canvas = canvas = (typeof opts.canvas === 'string') ? document.getElementById(opts.canvas) : opts.canvas;
	this.ctx    = canvas.getContext('2d');
	this.width  = canvas.width;
	this.height = canvas.height;  
	this.svg = null;
    } else {
	this.canvas = null;
	this.ctx = null;
	this.svg = opt.svg;
	this.width  = this.svg.width;
	this.height = this.svg.height;  	
    }  
    this.defaultFill  = "#0000FF";  // Default to pure blue.

    this.rendererCodes = ["circle","word","profile"];
    this.defaultRendererCode = this.rendererCodes[0];
    this.renderers = { 
	"circle": HeatBeadRendererCircle,
	"word" : HeatBeadRendererWord,
	"profile" : HeatBeadRendererWord
    }
    this.createGradient();
    this.updateOpts(opts);
}

HeatBead.prototype.updateOpts = function(opts) {
    this.opts = opts;

    // Set defaults for options we may not get :
    this.opts.dataScales = this.opts.dataScales || [];
    this.opts.centerCircleRadius = this.opts.centerCircleRadius || 4;
    this.opts.centerCircleRadiusBlur = this.opts.centerCircleRadiusBlur || 0.0;
    this.opts.outlineStyle = this.opts.outlineStyle || "rgba(0,0,0,0.4)"; // Default to weak outline if enabled
    this.opts.outlineWidth = this.opts.outlineWidth || 1;
    this.opts.centerPointColour = this.opts.centerPointColour || "rgba(255,255,255,0.5)"; // Style used to join a dot back to where it is from.
    this.opts.centerLineColour = this.opts.centerLineColour || "rgba(255,255,255,0.5)";
    this.opts.minRadius = this.opts.minRadius || 1.0;
    this.opts.maxRadius = this.opts.maxRadius || 100.0;

    this.opts.fallbackBlendMode = "lighter" // Set as fallback for Internet Explorer, subsequent sets don't work if they aren't valid for IE it seems.
    this.opts.blendMode = this.opts.blendMode || 'screen';
    this.opts.rotate_text = this.opts.rotate_text || (urlParams && !!urlParams["rotate_text"]) || false; // XXX Hack!
    this.opts.rotation_divisor = this.opts.rotation_divisor || (urlParams && parseFloat(urlParams["rotation_divisor"])) || 1.0; //XXX Hack!
    this.opts.maxValueScale = this.opts.maxValueScale || 1.0;
    this.data = this.opts.data; // Convenience access to data

    this.opts.maxValue = this.opts.maxValue || 1; //  XXXXX
    this.dRadius = this.opts.maxRadius - this.opts.minRadius;   // Set 'diff options'
    this.opts.currentMaxRadius = this.opts.maxRadius;
    this.dOpacity = this.opts.maxOpacity - this.opts.minOpacity;
    
    this.setupRenderer();
    this.setupLayers(opts.layers);
    this.updateCenterCircle();
}

HeatBead.prototype.setupLayers = function(layers) {
    this.opts.layers    = layers || [];
    this.opts.numLayers = this.opts.layers.length;
    this.opts.visAngle = DEG360/this.opts.numLayers;
}

HeatBead.prototype.setupRenderer = function() {
    this.opts.rendererCode = (this.rendererCodes.indexOf(this.opts.rendererCode) != -1) && this.opts.rendererCode || this.defaultRendererCode;
    this.renderer = new this.renderers[this.opts.rendererCode]();
    this.centerRenderer = new this.renderers["circle"](this);
}

HeatBead.prototype.updateCenterCircle = function() {
    var ctx = document.createElement('canvas').getContext('2d');
    var ccr = this.opts.centerCircleRadius;
    var blur = this.opts.centerCircleRadiusBlur;
    var rgb = hexToRgb(this.opts.centerPointColour);
    rgb = rgb || rgbToRgb(this.opts.centerPointColour);
    var rgbs = rgb.r+","+rgb.g+","+rgb.b;

    this.opts.centerCircleRadius2 = ccr/2; // minor performance
    this.opts.fillCenter = ctx.createRadialGradient(ccr,ccr,blur*ccr,ccr,ccr,ccr);
    this.opts.fillCenter.addColorStop(0,"rgba("+rgbs+",0.5)");
    this.opts.fillCenter.addColorStop(1,this.opts.centerPointColour);
    this.opts.centerCircleStyle=this.opts.fillCenter;
    this.opts.centerCircle = this.centerRenderer.create({"radius":this.opts.centerCircleRadius, "fill":this.opts.centerCircleStyle, "fillID":-1})
}

HeatBead.prototype.draw = function () {
    if (this.ctx) {
	var ctx = this.ctx;    
	ctx.clearRect(0, 0, this.width, this.height);
	ctx.globalCompositeOperation = this.opts.fallbackBlendMode;
	ctx.globalCompositeOperation = this.opts.blendMode;  // Dark backgrounds, good for Chrome/FF/Safari "multiples the pixel values on each layer and then takes the inverse so that the resulting image will always be lighter than the original"
    } else {
	var ctx = null;
    }
    for (var i=0,l1 = this.data.length;i<l1;i++) { 
	this.renderData(ctx, this.data[i]);
    }
    if (this.opts.colourise) this.colourise(ctx);
}

HeatBead.prototype.createGradient = function() {
    var offset1=0.01;
    var delta = (1.0-2*offset1)/4;
    var offset2 = offset1+delta;
    var offset3 = offset1+delta*2;
    var offset4 = offset1+delta*3;
    var gradientConfig =  { 0: 'rgba(0,0,0,0)'};
    gradientConfig[offset1] = "rgb(0,0,255)"; // black-blue-red-white
    gradientConfig[offset2] = "rgb(0,255,255)";
    gradientConfig[offset3] = "rgb(0,255,0)";
    gradientConfig[offset4] = "yellow";
    gradientConfig[1.0] = "rgb(255,0,0)";
    var gradient = [];
    var canvas = document.createElement("canvas");
    canvas.width = "1";
    canvas.height = "256";
    var ctx = canvas.getContext("2d");
    var grad = ctx.createLinearGradient(0,0,1,256);
    for(var key in gradientConfig){
        if (gradientConfig.hasOwnProperty(key)) {
            grad.addColorStop(key, gradientConfig[key]);
        }
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,1,256);
    this.gradientData = ctx.getImageData(0,0,1,256).data;
}

HeatBead.prototype.colourise = function(ctx) {
    if (this.width == 0) return;
    var img = ctx.getImageData(0,0,this.width,this.height);
    var data = img.data;
    var l = data.length;
    var gd = this.gradientData;
    for(var i=0; i < l; i+=4) {
        var a = data[i+3];
        offset = a*4;
        data[i  ] = gd[offset];
        data[i+1] = gd[offset+1];
        data[i+2] = gd[offset+2];
        data[i+3] = gd[offset+3];
    }
    img.data = data;
    ctx.putImageData(img, 0, 0);
}

HeatBead.prototype.calculateOffset = function(i, r) { // Get the x,y offset for this layer with this radius.
    var a = this.opts.visAngle*i;
    var ro = r*(this.opts.pointOffsetScale || 0)/2; // Only need to move half a radius away.
    return [ro*Math.cos(a), ro*Math.sin(a)]
}

HeatBead.prototype.renderData = function(ctx, d) {
    var x = d[0];
    var y = d[1];
    var values = d[2];

    for (var j=0,l2 = values.length;j<l2;j++) {
	var d = values[j];
	var layerID = d[0]; // The number of this layer
	var text = this.opts.topicTitles && this.opts.topicTitles[layerID];
	if (!text || text == "") text = this.opts.topicQueries && this.opts.topicQueries[layerID] || "";
	var canvas = this.renderer.create({
	    radius: this.opts.currentMaxRadius,
	    text: text,
	    fill: this.opts.fills && this.opts.fills[layerID] || this.defaultFill,
	    fillID: layerID,
	    rendererCode: this.opts.rendererCode
	});
	if (!canvas) continue; // Must be waiting for something to load
	var s = this.opts.dataScales[layerID] || 1.0;                             // Used to scale individual layers differently, not currently used externally.
	var v = Math.min(this.opts.maxValueScale*s*d[1]/this.opts.maxValue, 1.0); // Make a simple 0 to 1.0 value for scaling the radius and opacity and ensure we don't go over 1.0.
	if (this.opts.maxValue == 0) v = 0.5; // Special case if we have lowest possible, make dots midway size in config.

	var ry = this.opts.minRadius + v*this.dRadius;  // translate the value 0->1 to a base radius value.
	var rx = ry*canvas.width/canvas.height;         // Scale rx by how much bigger than ry it is.

	var offset = this.calculateOffset(layerID, rx); // If we are offsetting points/words to fit around a center, then calculate offset
	var x0 = x+offset[0] - rx/2;
	var y0 = y+offset[1] - ry/2;

	if (ctx) {
	    ctx.globalAlpha = this.opts.minOpacity + v*this.dOpacity;
	    if (this.opts.rotate_text) {
		var rotation = (rx/this.opts.currentMaxRadius)*2*Math.PI/this.opts.rotation_divisor;
		ctx.save(); 
		ctx.translate(x0, y0);
		ctx.translate(rx/2, ry/2);
		ctx.rotate(rotation);
		ctx.drawImage(canvas, -rx/2, -ry/2, rx, ry)
		ctx.restore();
	    } else {
		ctx.drawImage(canvas, x0, y0, rx, ry)
	    }
	} else {
	    this.svg.appendChild(canvas);
	}

	// Draw lines from the center of this new canvas back to the actual center point if asked :
	if (ctx && this.opts.centerLines) {
	    var bm = ctx.globalCompositeOperation;
	    ctx.globalCompositeOperation = "normal";
	    ctx.lineWidth=1;
	    ctx.strokeStyle=this.opts.centerLineColour;
	    ctx.beginPath();
	    ctx.moveTo(x, y);
	    ctx.lineTo(x0+rx/2,y0+ry/2);
	    ctx.stroke();
	    ctx.globalCompositeOperation = bm; // Restore existing operator
	}
    }

    // Highlight the center of the point if required :
    if (ctx && this.opts.centerPoint) {
	var bm = ctx.globalCompositeOperation;
	ctx.globalCompositeOperation = "normal";
	ctx.drawImage(this.opts.centerCircle, x-this.opts.centerCircleRadius2, y-this.opts.centerCircleRadius2, this.opts.centerCircleRadius, this.opts.centerCircleRadius);
	ctx.globalCompositeOperation = bm; // Restore existing operator
    }
}
