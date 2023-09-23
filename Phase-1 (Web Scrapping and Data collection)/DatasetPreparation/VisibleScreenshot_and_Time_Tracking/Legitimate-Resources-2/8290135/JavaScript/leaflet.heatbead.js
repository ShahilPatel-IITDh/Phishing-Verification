// Migrate from 0.7 as was removed in 1.0 :
L.DomUtil.getTranslateString = function(t) {
    var e=L.Browser.webkit3d;
    var i="translate"+(e?"3d":"")+"(",n=(e?",0":"")+")";
    return i+t.x+"px,"+t.y+"px"+n;
}

L.HeatBead = L.Layer.extend({

    initialize: function (points, opts) {
        this.points = points;
	this.opts = opts;
	this.lastRenderTime = new Date().getTime();
	this.frameCount = 0;
	this.updateStatsInterval = 10;
        L.setOptions(this, this.opts);
    },

    setOptions: function(opts) {
	this.opts = opts;
        L.setOptions(this, this.opts);
	this.heatbead.updateOpts(this.opts);
        return this.redraw();
    },
    
    setPoints: function (points) {
        this.points = points;
        return this.redraw();
    },

    onAdd: function (map) {
        this.map = map;
        if (!this.canvas) this.initCanvas();
        map._panes.overlayPane.appendChild(this.canvas);
        if (map.options.zoomAnimation && L.Browser.any3d) map.on('zoomanim', this.animateZoom, this);
        map.on('moveend', this.reset, this);
	map.on('zoom',    this.zoom, this);
        this.reset(); 
   },
    
    onRemove: function (map) {
        map.getPanes().overlayPane.removeChild(this.canvas);
        map.off('moveend', this.reset, this);
        if (map.options.zoomAnimation) map.off('zoomanim', this.animateZoom, this);
    },
    
    addTo: function (map) {
        map.addLayer(this);
        return this;
    },
    
    initCanvas: function () {
        var canvas = this.opts.canvas = this.canvas = L.DomUtil.create('canvas', 'leaflet-heatmap-layer leaflet-layer');	
        var size = this.map.getSize();
        canvas.width  = size.x;
        canvas.height = size.y;
	
        var animated = this.map.options.zoomAnimation && L.Browser.any3d;
        L.DomUtil.addClass(canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));
        //L.DomUtil.addClass(canvas, 'leaflet-zoom-' + 'hide');
        this.heatbead = new HeatBead(this.opts)
    },

    initSVG: function () {
        var svg = this.opts.svg = this.svg = L.DomUtil.create('svg', 'leaflet-heatmap-layer leaflet-layer');	
        var size = this.map.getSize();
        svg.width  = size.x;
        svg.height = size.y;
	
        var animated = this.map.options.zoomAnimation && L.Browser.any3d;
        L.DomUtil.addClass(svg, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));
        this.heatbead = new HeatBead(this.opts)
    },

    reset: function () {
	$(this.canvas).hide();

        var topLeft = this.map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this.canvas, topLeft);

        var size = this.map.getSize();

        if (this.heatbead.width !== size.x) {
            this.canvas.width = this.heatbead.width  = size.x;
        }
        if (this.heatbead.height !== size.y) {
            this.canvas.height = this.heatbead.height = size.y;
        }
	this.updateTransform(this.map.getCenter(), this.map.getZoom());
        this.redraw();
    },

    redraw: function () {
        if (this.heatbead && !this.frame && !this.map._animatingZoom) {
            this.frame = L.Util.requestAnimFrame(this._redraw, this);
        }
        return this;
    },
    
    _redraw: function () {
	$(this.canvas).show();
        var data = [];
        var r = this.opts.currentMaxRadius || this.opts.maxRadius;
        var size = this.map.getSize();
        var bounds = new L.LatLngBounds(this.map.containerPointToLatLng(L.point([-r, -r])),this.map.containerPointToLatLng(size.add([r, r])));
        var maxZoom = 1; //this.opts.maxZoom === undefined ? this.map.getMaxZoom() : this.opts.maxZoom;
        var v = 1 / Math.pow(2, Math.max(0, Math.min(maxZoom - this.map.getZoom(), 12)));
        var grid = {};
        var panePos = this.map._getMapPanePos();
        var offsetX = panePos.x;
        var offsetY = panePos.y;
        var i, j, k, p, x, y;
	//var maxValue = 0;
	var layers = [];
        for (var m = 0, l1 = this.points.length; m < l1; m++) {
	    layers[m] = [m,0]; // Layer id, max
	    var ll = this.points[m]; // Each topic
            for (i = 0, l2 = ll.length; i < l2; i++) {
		if (bounds.contains(this.points[m][i])) {
                    p = this.map.latLngToContainerPoint(this.points[m][i]);
                    x = p.x;y = p.y;
                    k = (this.points[m][i].alt || 1) * v;
		    var a = grid[y] = grid[y] || {}
                    var b = a[x] = a[x] || {};
                    if (!b[m]) {
			b[m] = k; //[x, y, k];
                    } else {
			//cell[0] = (cell[0] * cell[2] + p.x * k) / (cell[2] + k); // x Centering based upon the weight of each point in the cell, though makes no difference with the '1' size cell we have.
			//cell[1] = (cell[1] * cell[2] + p.y * k) / (cell[2] + k); // y
			b[m] += k; // cumulated intensity value
		    }
		}
            }
	}

	// Gather up arrays of layer data for each point
	var n;
	for (var y in grid) {
	    if (grid.hasOwnProperty(y)) {
		var xx = grid[y]
		for (var x in xx) {
		    if (xx.hasOwnProperty(x)) {
			var p = xx[x];
			data[data.length] = n = [parseInt(x), parseInt(y),[]]
			for (var m in p) {
			    if (p.hasOwnProperty(m)) {
				//var v = Math.min(1.0, p[m]); // Don't use over 1.0
				var v = p[m]; //Math.min(1.0, p[m]); // Don't use over 1.0
				n[2][n[2].length] = [parseInt(m),v]
				//maxValue     = Math.max(maxValue, v)
				layers[m][1] = Math.max(layers[m][1], v) // Record max for this layer
			    }
			}
		    }
		}
	    }
	}
	data.sort(function(a,b){return a[2][0][1]-b[2][0][1]});
	this.heatbead.setupLayers(layers);
	this.heatbead.data = data;
        this.heatbead.draw();
        this.frame = null;
	this.frameCount += 1
	if (this.frameCount%this.updateStatsInterval == 0) this.updateStats();
    },
    updateStats: function() {
	var t = new Date().getTime(); 
	var dt = (t-this.lastRenderTime)/this.updateStatsInterval;
	var fps = 1000/dt;
	//$("#debug_info").html("Took " + sprintf('%0.0f',dt) + "ms, at " + sprintf("%0.1f",fps) + "fps");
	//$("#debug_info").html(sprintf("%0.1f",fps) + "fps");
	this.lastRenderTime = t;
    },

    zoom: function () {
	this.updateTransform(this.map.getCenter(), this.map.getZoom());
    },


    animateZoom: function (e) {
	this.updateTransform(e.center, e.zoom)
    },

    updateTransform: function(center, zoom) {
	    var scale = this.map.getZoomScale(zoom, map.getZoom()),
	    position = L.DomUtil.getPosition(this.canvas),
	    //viewHalf = this.map.getSize().multiplyBy(0.5 + this.options.padding),
	    viewHalf = this.map.getSize().multiplyBy(0.5),
	    currentCenterPoint = this.map.project(map.getCenter(), zoom),
	    destCenterPoint = this.map.project(center, zoom),
	    centerOffset = destCenterPoint.subtract(currentCenterPoint),
	    
	    topLeftOffset = viewHalf.multiplyBy(-scale).add(position).add(viewHalf).subtract(centerOffset);
	    
	    if (L.Browser.any3d) {
		L.DomUtil.setTransform(this.canvas, topLeftOffset, scale);
	    } else {
		L.DomUtil.setPosition(this.canvas, topLeftOffset);
	    }
	}


});

L.heatBead = function (points, opts) {
    return new L.HeatBead(points, opts);
};


