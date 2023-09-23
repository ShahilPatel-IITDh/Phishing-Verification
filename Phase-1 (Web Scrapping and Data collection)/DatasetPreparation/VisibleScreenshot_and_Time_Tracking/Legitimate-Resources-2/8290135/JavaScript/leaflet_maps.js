var leafletMapOffset = 0;
var cookieViewport = true;
var map;
var attribute = false;
var geoLocation = true;
var mapControlSidebar = false;
var forcedViewport = null;
var attributionPosition ="bottomleft";
var noWrap=false;
var showZoomControl = true;
var showLayerControl = true;
var mapDragging = true;
var isFullscreen=false;
var zoomDelta = 0.5;
var fixedMapSize = false;
var allowZoom = true;
function updateViewportCookie() {}; // Don't do anything by default


function mercatorLat(lat) {
  var latR = lat*Math.PI/180;
  var e = Math.sin(latR);
  if (e > 0.9999) e = 0.9999;
  return Math.log((1 + e)/(1 - e))/2;
}

function unmercatorLat(latM) {
    var latMR = latM*Math.PI/180;
    var lat = (2 * Math.atan(Math.exp(latMR))) - Math.PI/2;
    return lat;
}

function getBB(canvas_id, lat, lon, zoom) {
    var canvas = $("#"+canvas_id);
    var canvas_w=canvas.width();
    var canvas_h=canvas.height();

    var tile_size = 360.0/Math.pow(2,zoom);
    var canvas_lon_w = tile_size*canvas_w/256;
    var lon_left = lon-canvas_lon_w/2;
    var lon_right = lon+canvas_lon_w/2;

    var lat_m = mercatorLat(lat)*180/Math.PI;
    var lat_bottom_m = lat_m - tile_size*(canvas_h/2)/256;
    var lat_top_m = lat_m + tile_size*(canvas_h/2)/256;
    var lat_bottom = unmercatorLat(lat_bottom_m)*180/Math.PI;
    var lat_top = unmercatorLat(lat_top_m)*180/Math.PI;
    var bb = [lat_bottom,lon_left,lat_top,lon_right];
    return bb;
}



// Create a leaflet map with word overlay :
function leafletInit(canvasID, minZoom, maxZoom, minImage, maxImage, wordFilter, map_opts, tileURLTemplates, subDomains, onWordClick, maxWords, heatmapData, wordsNotActive) {
    var canvas = $("#"+canvasID);
    var credits = ''; // Imagery © <a href="http://trendsmap.com/">Trendsmap</a>';
    var lat;
    var lon;
    var zoom;
    var customViewport = null;

    L.Icon.Default.imagePath='/images/';  // Fix default image path

    if (forcedViewport) {
	customViewport = forcedViewport
    } else if (cookieViewport) {
	customViewport = setupViewport();
    }
    if (customViewport) {
	lat = customViewport[0];
	lon = customViewport[1];
	zoom = customViewport[2];
    } else if (map_opts) {
	lat = map_opts.latitude;
        lon = map_opts.longitude;
        zoom = map_opts.zoom;
    }

    if (jQuery.url.param("ll")) { // Always use this if present
      var d = getViewport(0, 0, 2, minZoom, maxZoom); // Get the view port from defaults or URL
      lat = d[0]; 
      lon = d[1]; 
      zoom = d[2];
    }

    if (!lat || !lon) { // Global default
	lat = 5;
	lon = 0;
    }
    if (!zoom) zoom = 0;

    if (jQuery.url.param("small")) smallWords = true;

    if (map_opts && map_opts.width && map_opts.height) {
      canvas.width(map_opts.width);
      canvas.height(map_opts.height);
    } else if (jQuery.url.param("w") || jQuery.url.param("h")) {
      setupMapSize(canvas, minImage, maxImage, leafletMapOffset)
    } else if (!map_opts || !map_opts.height) {
      setupMaxMapSize(canvas, leafletMapOffset); // XXX Need to get it to use the passed in canvasID
    }
    var bb = getBB(canvasID, lat, lon, zoom);
    
    // Create base map :
    var mapOpts = {
	maxZoom: maxZoom,
	minZoom: minZoom,
	zoom: zoom,
	center: new L.LatLng(lat, lon),
	zoomControl:showZoomControl,
	dragging:mapDragging,
	attributionControl:false,
	fadeAnimation:false,
	zoomDelta: zoomDelta,
	zoomSnap: zoomDelta,
	scrollWheelZoom: (!map_opts || typeof map_opts.scrollWheelZoom == "undefined") ? 'center' : map_opts.scrollWheelZoom,
        doubleClickZoom: allowZoom ? 'center' : '',
      touchZoom: allowZoom ? 'center' : '',
      scrollWheelZoom: allowZoom
    };
    var layerOpts = {maxZoom: maxZoom,attribution: credits, tms: false, subdomains: subDomains, noWrap:noWrap};
    //patchMapTileGapBug();

    map = L.map(canvasID, mapOpts); //.setView([lat, lon], zoom);  
    if (!wordsNotActive) {
      // Create word layer :
      var wl = new WordLayer("leaflet_overlay", bb, zoom, onWordClick, wordFilter, maxWords); // NB ID here is distinct to 'canvasID', this is the overlay div id, not the map area.
    } else {
      var wl = null;
    }

    // Convert to layers if we just got a URL :
    if (typeof(tileURLTemplates) == "string") tileURLTemplates = [["Base Map",tileURLTemplates]];
 
    // Add all the things :
    var baseLayers = {}
    var baseLayersArray = [];
    $(tileURLTemplates).each(function(index) {
      var layer = L.tileLayer(this[1], layerOpts);
      layer.id = this[2]; // Attach our own id if we have one.
      baseLayersArray[baseLayersArray.length] = layer;
      if (index == 0) layer.addTo(map); // Use first by default
      if (tileURLTemplates.length > 1) baseLayers[this[0]] = layer; // Only add options if we have more than one, use id (3rd element) if present.
    });
  
    var overlayMaps = {}
    if (wl) overlayMaps["Trends"] = wl;

    if (heatmapData) {
      var heatmapLayer = createHeatmapLayer(heatmapData);
      map.addLayer(heatmapLayer);
      overlayMaps["Heatmap"] = heatmapLayer;
    }
    if (tileURLTemplates.length > 1)
      if (showLayerControl) L.control.layers(baseLayers, overlayMaps, {position: 'topleft'}).addTo(map);

    addAttribution(map, attribute);                             // Attribution
    if (wl) {
      map.addLayer(wl);                                               // Setup Word Layer.
      wordOverlay = wl._overlay; // Hacky way to access...
    }

    if (mapControlSidebar) {
      $(".leaflet-top.leaflet-left").attr("id","map_control_container");

      // Disable layers that are 'coming soon'
      $(".disabled-layer").parent().prev().prop("disabled",true)

      // Move our controls into the leaflet container :    
      $("#map_controls").prepend($('#map_control_container').detach());
    }

    // Set timer for updating viewport details. This should be done nicererer.
    if (updateViewportCookie) {
	var viewportTimer = setInterval(updateViewportCookie, 2000);
    }
    map.on('zoomend', function() {(typeof aca != 'undefined') && aca && aca.addA("zoom", "map", 1, aGroup)});
    map.on('moveend', function() {(typeof aca != 'undefined') && aca && aca.addA("move", "map", 1, aGroup)});
  
    return baseLayersArray;
}

function resizeMapArea(e) {
  if (fixedMapSize) return;
  if (typeof mapAreaID == "undefined" || !mapAreaID) return;

  var e;
  var offsetHeader = 64;
  var offsetFooter = 0;
  var h = $(window).height()
  if ((e = $('nav')) && e && e.css && e.css("display") != "none") offsetHeader = e.outerHeight() || 0;
  if ((e = $('.nav-bar-container')) && e && e.css && e.css("display") != "none") offsetHeader += e.outerHeight() || 0;
  if ((e = $('.page-footer')) && e && e.css && e.css("display") != "none") offsetFooter = e.outerHeight() || 0;
  if ((e = $('#vis_ui')) && e && e.css && e.css("display") != "none") offsetFooter = e.outerHeight() || 0;
  $("#map_canvas").height(h-offsetHeader-offsetFooter);
  $(mapAreaID).height(h-offsetHeader-offsetFooter);
  var e = $("#map_sidebar");
  var padding = parseInt(e.css("padding-top"))+parseInt(e.css("padding-bottom"));
  e.css("top",offsetHeader);
  e.height(h-offsetHeader-padding);
}


function setupMaxMapSize(canvas, offset) {
    jQuery.event.add(window, "resize", resizeMapArea);
    resizeMapArea();
}

function resizeLeafletMap(canvas, offset) {
  if (!offset && offset != 0) offset=170;
  var h = $(window).height()-offset;
  canvas.height(h);
  $("#content").height(h);
}

function addAttribution(map, attribute) {
    var text = "&copy; <a class='map-credit-link' target='_blank' href='/'>Trendsmap.com</a>, <a rel='nofollow' href='http://osm.org/copyright'>OSM.org</a>"
    var attribution = new L.Control.Attribution({prefix: false, position: attributionPosition});
    attribution.addAttribution(text);
    attribution.addTo(map);
}

function createHeatmapLayer(data) {
    var heatmapOpts = {
        maxZoom:  1,
        radius:   7,
        blur:     10,
	zIndex: 500
    }
    var convertedData = [];
    for (var i=0;i<data.length;i++){
	var d = data[i];
	convertedData[i] = new L.LatLng(d.lat, d.lon, d.value);
    }
    var heatmapLayer = L.heatLayer(convertedData, heatmapOpts);
    return heatmapLayer;
}

function setupViewport() {
  var vn = jQuery.url.param("vn"); // Override default viewport
  if (!vn && $.cookie("v")) {
    var x = $.cookie("v").split(",");
    lat = parseFloat(x[0]);
    lon = parseFloat(x[1]);
    zoom = parseInt(x[2]);
  } else {
    var viewport = getDefaultViewport(vn);
    lat = viewport[0];
    lon = viewport[1];
    zoom = viewport[2];
    storeViewport(lat, lon, zoom);
  }
  return [lat, lon, zoom];
}

