var height_slider = document.getElementById('height-slider');
var width_slider = document.getElementById('width-slider');
var zoom_slider = document.getElementById('zoom-slider');
var scale_slider = document.getElementById('scale-slider');

noUiSlider.create(height_slider, {
	start : [ 1024 ],
	step : 1,
	connect : [ true, false ],
	range : {
		'min' : 240,
		'70%' : 2000,
		'80%' : 5000,
		'max' : 20000
	},
	format : {
		to : function(value) {
			return Math.round(value);
		},
		from : function(value) {
			return value
		}
	}
});

noUiSlider.create(width_slider, {
	start : [ 1280 ],
	step : 1,
	connect : [ true, false ],
	range : {
		'min' : 240,
		'70%' : 2000,
		'80%' : 4000,
		'max' : 8000
	},
	format : {
		to : function(value) {
			return Math.round(value);
		},
		from : function(value) {
			return value
		}
	}
});

noUiSlider.create(zoom_slider, {
	start : [ 100 ],
	step : 1,
	connect : [ true, false ],
	range : {
		'min' : 100,
		'max' : 500
	},
	format : {
		to : function(value) {
			return Math.round(value) + '%';
		},
		from : function(value) {
			return value.replace('%', '');
		}
	}
});
noUiSlider.create(scale_slider, {
	start : [ 100 ],
	step : 1,
	connect : [ true, false ],
	range : {
		'min' : 10,
		'max' : 100
	},
	format : {
		to : function(value) {
			return Math.round(value) + '%';
		},
		from : function(value) {
			return value.replace('%', '');
		}
	}
});

var input_height = document.getElementById('height-value');
var input_width = document.getElementById('width-value');
var input_zoom = document.getElementById('zoom-value');
var input_scale = document.getElementById('scale-value');
var input_resolution = document.getElementById('resolution-value');
var user_agent = document.getElementById('user-agent');
var text_rendered_pixels = document.getElementById('rendered-pixels');
var text_image_size = document.getElementById('image-size');

input_resolution.addEventListener('change', function() {
	var resolution = this.value.split('×');
	var height = resolution[1] * resolution[2];
	var width = resolution[0] * resolution[2];
	var zoom = resolution[2] * 100;
	var scaled_width = 0;
	height_slider.noUiSlider.set(height);
	width_slider.noUiSlider.set(width);
	zoom_slider.noUiSlider.set(zoom);
	if (resolution.length > 3) {
		user_agent.value = resolution[3];
	} else {
		user_agent.value = "";
	}
});
height_slider.noUiSlider.on('update', function(values, handle) {
	input_height.value = values[handle];
	var height = height_slider.noUiSlider.get();
	var width = width_slider.noUiSlider.get();
	var text_rendered_pixels = document.getElementById('rendered-pixels');
	var text_image_size = document.getElementById('image-size');
	var scale = input_scale.value.replace('%', '')/100;
	text_rendered_pixels.innerHTML = width + ' × ' + height + ' px';
	var k = 1;
	if (width * scale < 50) {
		k = 50/(width*scale);
	}
	text_image_size.innerHTML = Math.round(width * scale * k) + ' × '
		+ Math.round(height * scale * k) + ' px';
});
input_height.addEventListener('change', function() {
	height_slider.noUiSlider.set(this.value);
});

width_slider.noUiSlider.on('update', function(values, handle) {
	input_width.value = values[handle];
	var height = height_slider.noUiSlider.get();
	var width = width_slider.noUiSlider.get();
	var text_rendered_pixels = document.getElementById('rendered-pixels');
	var scale = input_scale.value.replace('%', '')/100;
	text_rendered_pixels.innerHTML = width + ' × ' + height + ' px';
	var k = 1;
	if (width * scale < 50) {
		k = 50/(width*scale);
	}
	text_image_size.innerHTML = Math.round(width * scale * k) + ' × '
		+ Math.round(height * scale * k) + ' px';
	
});
input_width.addEventListener('change', function() {
	width_slider.noUiSlider.set(this.value);
});

zoom_slider.noUiSlider.on('update', function(values, handle) {
	input_zoom.value = values[handle];
});
input_zoom.addEventListener('change', function() {
	zoom_slider.noUiSlider.set(this.value);
});

scale_slider.noUiSlider.on('update', function(values, handle) {
	input_scale.value = values[handle];
	var height = height_slider.noUiSlider.get();
	var width = width_slider.noUiSlider.get();
	var text_image_size = document.getElementById('image-size');
	var scale = input_scale.value.replace('%', '')/100;
	text_image_size.innerHTML = Math.round(width * scale) + ' × '
			+ Math.round(height * scale) + ' px';
});
input_scale.addEventListener('change', function() {
	scale_slider.noUiSlider.set(this.value);
});

var resolution = input_resolution.value.split('×');

height_slider.noUiSlider.set(resolution[1] * resolution[2]);
width_slider.noUiSlider.set(resolution[0] * resolution[2]);
zoom_slider.noUiSlider.set(resolution[2] * 100);
if (resolution.length > 3) {
	user_agent.value = resolution[3];
} else {
	user_agent.value = "";
}
//scale_slider.noUiSlider.updateOptions({
//	range : {
//		'min' : 50,
//		'max' : Math.round(resolution[0] * resolution[2])
//	}
//});
//scale_slider.noUiSlider.set(resolution[0] * resolution[2]);

var full_size = document.getElementById('full-size');
full_size.addEventListener('change', function() {
	if (full_size.checked) {
		height_slider.setAttribute('disabled', true);
		input_height.setAttribute('disabled', true);
	} else {
		height_slider.removeAttribute('disabled');
		input_height.removeAttribute('disabled');
	}
});

var screenshot_div = document.getElementById('screenshot_div');
var screenshot_progress = document.getElementById('screenshot_progress');
var screenshot_info = document.getElementById('screenshot_info');
var screenshot_html = screenshot_div.innerHTML;
function show_screenshot() {
	screenshot_progress.style.display = 'none';
	screenshot_div.style.display = 'block';
}
var progressbar_info = '';
function start_progressbar() {

    current_progress = 0;
    progressbar_info = 'creating';
    step = 0.01; // the smaller this is the slower the progress bar

    interval = setInterval(function() {
        current_progress += step;
        progress = Math.round(Math.atan(current_progress) / (Math.PI / 2) * 100 ) 
        $(".progress-bar")
            .css("width", progress + "%")
            .attr("aria-valuenow", progress)
            .text(progress + "% "+progressbar_info);
        if (progress >= 100){
            clearInterval(interval);
        }else if(progress >= 70) {
            step = 0.01
        }
    }, 100);
}
function stop_progressbar() {
    $(".progress-bar").css("width","0%").attr("aria-valuenow", 0);
    clearInterval(interval);
}
function formatByteSize(bytes) {
    if(bytes < 1024) return bytes + " bytes";
    else if(bytes < 1048576) return(bytes / 1024).toFixed(0) + " KiB";
    else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB";
    else return(bytes / 1073741824).toFixed(3) + " GiB";
};
function show_share_buttons(response) {
	var share_buttons_div = document.getElementById('share_buttons_div');
	var b64uuid = response.b64_uuid;
	var created_on = response.created_on;
	var title = response.screenshot_parameters.title;
	var url  = response.screenshot_parameters.url;
	var image_format  = response.screenshot_parameters.format;
	share_buttons_div.innerHTML = '<div id="share">'+
		'<a id="download_link" class="download" href="/cached_image/'+b64uuid+'" download="'+title+'.'+image_format+'">'+
		'<i class="fa fa-download"></i></a>'+
		'<a class="envelope" href="mailto:?Subject=Screenshot: '+title+'&amp;'+
		'Body=Website%20screenshot%3A%20'+encodeURI("https://www.site-shot.com/"+b64uuid)+'%0Aurl%3A%20'+encodeURI(url)+'%0Acreated%20on%3A%20'+encodeURI(created_on)+'%0A">'+
		'<i class="fa fa-envelope"></i></a>'+
		'<a class="facebook" href="https://www.facebook.com/sharer/sharer.php?u='+encodeURI("https://www.site-shot.com/"+b64uuid)+
		'&t=Website%20Screenshot%3A%20'+encodeURI(title)+'" target="blank"><i class="fa fa-facebook"></i></a>'+
		'<a class="twitter" href="https://twitter.com/intent/tweet?status=Website%20Screenshot%3A%20'+encodeURI(title)+'+'+encodeURI(" https://www.site-shot.com/"+b64uuid)+'" target="blank"><i class="fa fa-twitter"></i></a>'+
		'<a class="pinterest" href="https://pinterest.com/pin/create/bookmarklet/?media='+encodeURI("https://www.site-shot.com/cached_image/"+b64uuid)+
		'&url='+encodeURI("https://www.site-shot.com/"+b64uuid)+'&is_video=false&description=Website%20Screenshot%3A%20'+encodeURI(title)+'" target="blank"><i class="fa fa-pinterest-p"></i></a>'+
		'</div>';

}
function make_screenshot(token) {
	var height = document.getElementById('height-value').value;
	var width = document.getElementById('width-value').value;
	var zoom = document.getElementById('zoom-value').value
	var scale = Math.round(width/100*document.getElementById('scale-value').value.replace('%', ''));
	var format = document.getElementById('format-value').value;
	var url = document.getElementById('url').value;
	var full_size = document.getElementById('full-size');
    var proxy_rotation = document.getElementById('proxy-rotation');
	var user_agent = document.getElementById('user-agent').value;
	var full_size_param = '';
	if (full_size.checked) {
		height = '0';
		full_size_param = '1';
	}
    var proxy_rotation_param = '0';
    if (proxy_rotation.checked) {
        proxy_rotation_param = '1';
    }
	if (url.length == 0) {
		url = 'https://www.wikipedia.org';
	}
	zoom = zoom.replace('%', '');
	rnd_text = Math.floor(Math.random() * Math.pow(10, 15));
	encoded_url = encodeURIComponent(url);
	var api_string = '/screenshot/?width=' + width + '&height=' + height
			+ '&zoom=' + zoom + '&scaled_width=' + scale + '&full_size='
			+ full_size_param + '&format=' + format + '&user_agent='
			+ user_agent + '&rnd=' + rnd_text + '&url=' + encoded_url
			+ '&g-recaptcha-response=' + token + '&proxy_rotation='
            + proxy_rotation_param;
	screenshot_div.style.display = 'none';
	screenshot_info.style.display = 'none';
	screenshot_progress.style.display = 'block';
	start_progressbar();
	var screenshot_div_image = document.getElementById('screenshot_div_image');
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 2 && this.status == 200) {
			var size = this.getResponseHeader("Content-Length");
			progressbar_info = 'downloading';
		}
		if (this.readyState == 3 && this.status == 200) {
			var size = this.response.length;
			progressbar_info = 'downloading... '+formatByteSize(size)+' recieved';
		}
		if (this.readyState == 4 && this.status == 200) {
			stop_progressbar();
			
			screenshot_div_image.innerHTML = '';
		    response = JSON.parse(this.responseText);

			var screenshot_link = document.createElement('A');
			screenshot_link.href = '/' + response.b64_uuid;
//			var download_link = document.getElementById('download_link');
//			download_link.href = '/cached_image/' + response.b64_uuid;
//			
			var screenshot_image = document.createElement("IMG");
			screenshot_image.addEventListener("load", show_screenshot);
			screenshot_image.addEventListener("error", show_screenshot);
			screenshot_image.className = "screenshot_img";
			screenshot_image.src = response.image;
			screenshot_link.appendChild(screenshot_image);
			screenshot_div_image.appendChild(screenshot_link);
			show_share_buttons(response);

		} else if (this.readyState == 2 
				&& (this.status == 502 || this.status == 500 || this.status == 417)) {
			screenshot_div_image.innerHTML = '<div style="background-color:white"><br>'
					+ '<h2 class="text-primary"><b>Service unavailable</b><br><br></h2></div>';
			show_screenshot();
		} else if (this.readyState == 2 && this.status == 504) {
			screenshot_div_image.innerHTML = '<div style="background-color:white"><br>'
					+ '<h2 class="text-primary"><b>Status: 504 Gateway Time-out</b><br><br></h2></div>'
			show_screenshot();
		} else if (this.readyState == 2 && this.status == 503) {
			screenshot_div_image.innerHTML = '<div style="background-color:white"><br>'
					+ '<h2 class="text-primary"><b>Status: 503 Service Unavailable</b><br><br></h2></div>'
			show_screenshot();
		}
		
	};
	xhttp.open("GET", api_string, true);
	xhttp.send();

	return false;
}
function validate_recaptcha(e){
	e.preventDefault();
	grecaptcha.ready(function() {
		grecaptcha.execute('6LfkTuQUAAAAAPyZgZs8PIdPppMjrP__fkUpUQq5', {action: 'submit'}).then(function(token) { 
			make_screenshot(token);
		});
	});
}

$('#make_screenshot').on('click', validate_recaptcha);
