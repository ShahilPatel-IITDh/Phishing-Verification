cookieViewport = true;
zoomDelta =1.0;
var mapAreaID = "#map_area";
var mapCanvasID = "#map_canvas";
var thm;
fixedMapSize = true;

function setupMapAccess() {
    if ($("#map_area").length == 0) {
	console.log("Warning: No Map");
	return false;
    }
    setupMap("/twitter/tweet/"+tweetID+".json"); 
}

function setupMap(dataURL) {
    var mapOpts = {latitude: 0, longitude: 0, zoom: 2, scrollWheelZoom: false};
    forcedViewport = [0,0,1];
    var minZoomLevel = 1;
    var maxZoomLevel = 18;
    var tileURLSubDomains = 'ab';
    var tileURLTemplates = [["base", mapTileURL]]
    leafletInit("map_canvas", minZoomLevel, maxZoomLevel, 256, 2560, [], mapOpts, tileURLTemplates, tileURLSubDomains, null, -1, null, true);
    var opts = {
	map: map,
	dataURL: dataURL
    }
    thm = new MultiHeatMap(opts);
};
