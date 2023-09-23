function MultiHeatMap(opts) {
    var This = this;
    this.opts = opts;
    this.opts.dataURL = this.opts.dataURL; // "/twitter/tweet/1234.json";
    this.opts.colourMap = this.opts.colourMap || ["#FF0000","#00FF00","#0000FF"];
    this.opts.minRadius = this.opts.minRadius || 10.0;
    this.opts.maxRadius = this.opts.maxRadius || 100.0;
    this.opts.radiusBlurScale = this.opts.radiusBlurScale || 1.0;
    this.opts.minOpacity = this.opts.minOpacity || 0.4;
    this.opts.maxOpacity = this.opts.maxOpacity || 0.6;
    this.opts.pointOffsetScale = this.opts.pointOffsetScale || 0;
    this.opts.timeout = this.opts.timeout || 180000,
    this.map = this.opts.map;
    this.opts.fillCount = this.opts.fillCount || this.opts.colourMap.length;
    this.opts.allLayers = [];
    for (var i=0;i<this.opts.fillCount;i++){this.opts.allLayers[i] = i}
    this.opts.showLayers = this.opts.showLayers || this.opts.allLayers;

    this.heatmap = null;
    this.mapData = null
    this.updateFills()
    this.loadMultiData();
    $(".multi-heatmap-checkbox").change(function(){This.updateShowLayers()});
}

MultiHeatMap.prototype.updateFills = function() {
    var opts = {
	radiusBlurScale : this.opts.radiusBlurScale,
	maxRadius:        this.opts.maxRadius
    }
    this.fills = [];
    for (var i=0;i<this.opts.fillCount;i++) {
	this.fills[i] = this.createFill(this.opts.colourMap[i], opts)
    }
}

MultiHeatMap.prototype.updateShowLayers = function() {
    this.opts.showLayers = [];
    for (var i=0;i < this.opts.fillCount;i++) {
	if ($("#multi_heatmap_type_"+i).prop("checked")) this.opts.showLayers[this.opts.showLayers.length] = i;
    }
    this.setupData();
}

MultiHeatMap.prototype.addSpinner = function() {
    var html = '<div id="mhm_spinner" class="css-spinner css-spinner-2" style="z-index:9999"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'
    $(map._container).append(html);
}

MultiHeatMap.prototype.removeSpinner = function() {
    $("#mhm_spinner").remove();
}

MultiHeatMap.prototype.loadMultiData = function() {
    this.addSpinner();
    var This=this;
    var url = this.opts.dataURL;
    if (!url) {
	this.removeSpinner();
	return; // Nothing to load
    }

    var xhr = $.ajax({
	url: url,
	type: 'GET',
	dataType: "json",
	timeout: this.opts.timeout,
	cache: false,
	error: function(request, status, details) {console.log(new Date(),"Error loading " + url + ":" + status + ", " + details)},
	success: function(data){This.setupData(data)}
    });
}

MultiHeatMap.prototype.setupData = function(d) {
    if (!this.mapData) this.mapData = d;

    if (!this.mapData.data) {
	this.removeSpinner();
	return;
    }

    var points;
    var maxValue = 0;
    var points = [];
    for (var i=0;i < this.mapData.data.length;i++) {
	if (this.mapData.data[i].static.max > maxValue) maxValue = this.mapData.data[i].static.max;
	if (this.opts.showLayers.indexOf(i) != -1) { // Optionally hide a layer
	    var layerPoints = this.mapData.data[i].static.points;
	    var newPoints = []
	    for (var j=0;j <layerPoints.length;j++) {
		var p = layerPoints[j];
		newPoints[j] = new L.LatLng(p[0], p[1], p[2]); // lat, lon, v
	    }
	    points[points.length] = newPoints;
	} else {
	    points[points.length] = [];
	}
    }

    var opts = {
	minOpacity: this.opts.minOpacity,
	maxOpacity: this.opts.maxOpacity,
	pointOffsetScale: this.opts.pointOffsetScale,
	minRadius: this.opts.minRadius,
	maxRadius: this.opts.maxRadius,
	maxValue: maxValue,
	fills: this.fills,
	maxRadiusZoom: 1,
	centerPoint: true
    };
    if (this.heatmap) this.map.removeLayer(this.heatmap);
    this.heatmap = L.heatBead(points, opts).addTo(this.map);
    this.removeSpinner();
}

MultiHeatMap.prototype.createFill = function(c, opts) {
    var fill  = c;
    var blur = 1.0 - opts.radiusBlurScale;
    if (blur < 1) {
	var rgb = hexToRgb(c);
	rgb = rgb || rgbToRgb(c);
	var rgbs = rgb ? (rgb.r+","+rgb.g+","+rgb.b) : "255,0,0";
	var scale = 1.0;
	var outerScale = scale;
	var a = (rgb && !isNaN(rgb.a)) ? rgb.a : 1; // Use alpha from the colour for max alpha if used.
	var ctx = document.createElement('canvas').getContext('2d');
	var r = opts.maxRadius;
	fill = ctx.createRadialGradient(r*scale,r*scale,blur*r*scale,r*scale,r*scale,r*outerScale); // (x0,y0,r0,x1,y1,r1);
	fill.addColorStop(0,"rgba("+rgbs+","+a+")");
	fill.addColorStop(1,"rgba("+rgbs+",0)");
    }
    return fill;
}
