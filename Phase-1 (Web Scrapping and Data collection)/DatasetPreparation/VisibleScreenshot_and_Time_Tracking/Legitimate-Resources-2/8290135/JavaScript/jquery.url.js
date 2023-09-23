/* JQuery URL Parser 1.0 Author: Mark Perkins mark@allmarkedup.com */
jQuery.url = function()
{
	var segments = {};
	var parsed = {};
  	var options = {
	
		url : window.location, // default URI is the page in which the script is running
		
		strictMode: false, // 'loose' parsing by default
	
		key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"], // keys available to query 
		
		q: {
			name: "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
		},
		
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
			loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
		}
		
	};
	var parseUri = function()
	{
		str = decodeURI( options.url );
		
		var m = options.parser[ options.strictMode ? "strict" : "loose" ].exec( str );
		var uri = {};
		var i = 14;

		while ( i-- ) {
			uri[ options.key[i] ] = m[i] || "";
		}

		uri[ options.q.name ] = {};
		uri[ options.key[12] ].replace( options.q.parser, function ( $0, $1, $2 ) {
			if ($1) {
				uri[options.q.name][$1] = $2;
			}
		});

		return uri;
	};
	var key = function( key )
	{
		if ( ! parsed.length )
		{
			setUp(); // if the URI has not been parsed yet then do this first...	
		} 
		if ( key == "base" )
		{
			if ( parsed.port !== null && parsed.port !== "" )
			{
				return parsed.protocol+"://"+parsed.host+":"+parsed.port+"/";	
			}
			else
			{
				return parsed.protocol+"://"+parsed.host+"/";
			}
		}
	
		return ( parsed[key] === "" ) ? null : parsed[key];
	};
	var param = function( item )
	{
		if ( ! parsed.length )
		{
			setUp(); // if the URI has not been parsed yet then do this first...	
		}
		return ( parsed.queryKey[item] === null ) ? null : parsed.queryKey[item];
	};
	var setUp = function()
	{
		parsed = parseUri();
		
		getSegments();	
	};
	var getSegments = function()
	{
		var p = parsed.path;
		segments = []; // clear out segments array
		segments = parsed.path.length == 1 ? {} : ( p.charAt( p.length - 1 ) == "/" ? p.substring( 1, p.length - 1 ) : path = p.substring( 1 ) ).split("/");
	};
	
	return {
		setMode : function( mode )
		{
			strictMode = mode == "strict" ? true : false;
			return this;
		},
		setUrl : function( newUri )
		{
			options.url = newUri === undefined ? window.location : newUri;
			setUp();
			return this;
		},		
		segment : function( pos )
		{
			if ( ! parsed.length )
			{
				setUp(); // if the URI has not been parsed yet then do this first...	
			} 
			if ( pos === undefined )
			{
				return segments.length;
			}
			return ( segments[pos] === "" || segments[pos] === undefined ) ? null : segments[pos];
		},
		
		attr : key, // provides public access to private 'key' function - see above
		
		param : param // provides public access to private 'param' function - see above
		
	};
	
}();
