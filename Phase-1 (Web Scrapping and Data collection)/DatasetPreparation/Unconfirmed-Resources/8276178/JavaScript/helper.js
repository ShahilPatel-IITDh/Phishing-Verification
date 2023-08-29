$(document).ready(function () {
//  var WEBSITE_URL = 'http://localhost/online/issitedownrightnow';
  var WEBSITE_URL = 'https://issitedownrightnow.com';
  var site = window.location.href;
  site = site.replace(WEBSITE_URL + "/status/", "");

  var url = $(".hreview-aggregate #url .searched-url").text();

  if (top.location.pathname.indexOf("/status/") >= 0) {
    $.ajax({
      url: WEBSITE_URL + '/check-status.php',
      type: 'POST',
      data: "site=" + site,
      success: function (data) {
        data = jQuery.parseJSON(data);
        var country_str = '';
        var language = data['language'];
        var status = '';
        if (data['country'] != 'Unknown') {
          country_str += '<span class="country-flag"><img width="16" src="' + WEBSITE_URL + '/resources/images/flags/' + data['country'] + '.png"> ' + data['country'] + '</span>';
        } else {
          country_str += 'Unknown';
        }
        if (data['response'] === '1.5') {
          $("div#site-status").css('color', 'green');
          $("div#site-status").css('background-color', '#e2ffe3');
          status = "UP";
        } else if (data['response'] === '0.5') {
          $("div#site-status").css('color', 'red');
          $("div#site-status").css('background-color', '#ffeeee');
          status = "DOWN";
        } else if (data['response'] === '1.0') {
          $("div#site-status").css('color', 'darkorange');
          $("div#site-status").css('background-color', '#ffeeee');
          status = "DISRUPTION";
        }
        var html = '';
        html += '<div class="css">';
        html += '  <div class="o o-server-status">Server Status<br><div class="i i-server-status ' + status + '">' + status + '</div></div>';
        html += '  <div class="o o-country">Country<br><div class="i i-country">' + country_str + '</div></div>';
        html += '  <div class="o o-response-time">Response Time<br><div class="i i-response-time">' + data['response_time'] + ' ms</div></div>';
        html += '  <div class="o o-http-code">Http Code<br><div class="i i-http-code">' + data['httpcode'] + '</div></div>';
        html += '</div>';
        $("div#site-status").hide().html(html).fadeIn('slow');
        generate_graphs(data);
      }
    });
  }

  function drawChart(values, data1) {
    var values = $.map(values, function (value, index) {
      return [value];
    });

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'HOUR');
    data.addColumn('number', 'STATUS');
    data.addColumn({type: 'string', role: 'style'});
    for (var i = 0; i < values.length; i++) {
      if (values[i] === 1.5) {
        data.addRows([[i + 1, values[i], 'green']]);
      } else if (values[i] === 1) {
        data.addRows([[i + 1, values[i], 'orange']]);
      } else if (values[i] === 0.5) {
        data.addRows([[i + 1, values[i], 'red']]);
      } else if (values[i] === 0) {
        data.addRows([[i + 1, values[i], 'white']]);
      }
    }

    new google.visualization.ColumnChart(document.getElementById('visualization1')).
            draw(data,
                    {
                      width: $("#container-map").width(),
                      height: $("#container-map").width() / (4),
                      fontSize: 9,
                      bar: {groupWidth: "95%"},
                      vAxis: {ticks: [{v: 0, f: "0"}, {v: 0.5, f: data1['down']}, {v: 1, f: data1['disruption']}, {v: 1.5, f: data1['up']}]},
                      legend: {position: 'none'},
                      tooltip: {trigger: 'none'},
                      hAxis: {ticks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], title: data1['hour_text'], titleTextStyle: {fontSize: "10", bold: 1, italic: 0}}
                    }
            );
  }

  function drawRegionsMap(values, current_hour) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'Status');
    data.addColumn({type: 'string', role: 'tooltip'});

    var tooltip_text;
    for (x in values) {
      tooltip_text = '';
      if (values[x][current_hour] == 1) {
        tooltip_text += 'Status: disruption';
      } else if (values[x][current_hour] == 0.5) {
        tooltip_text += 'Status: Down';
      }
      data.addRows([[x, values[x][current_hour], tooltip_text]]);

    }

    var options = {
      displayMode: 'markers',
      width: $("#container-map").width(),
      height: $("#container-map").width() / (2),
      datalessRegionColor: 'lightgreen',
      legend: 'none',
      colorAxis: {minValue: [0], maxValue: [1.5], colors: ['lightgreen', 'red', 'orange', 'lightgreen']}
    };
    var geochart = new google.visualization.GeoChart(
            document.getElementById('visualization2'));
    geochart.draw(data, options);
  }

  function generate_graphs(data) {
    drawChart(data['values_line_chart'], data);
    current_hour = parseInt(data['current_hour']);
    drawRegionsMap(data['values_geo_chart'], current_hour);
  }

  $(".containers input[type='text']").click(function () {
    this.select();
  });

  function validate_searched_url() {
    $('button.search').hide();
    $('span.loader').show();
    $("span.loader").css('display', 'inline-block');
    var raw_site = $("input#site").val();
    $.ajax({
      url: WEBSITE_URL + '/validate.php',
      type: 'POST',
      data: "raw_site=" + raw_site,
      success: function (data) {
        data = jQuery.parseJSON(data);
        if (data['response'] === 1) {
          $('span.loader').hide();
          $('button.search').show();
          window.location.href = WEBSITE_URL + "/status/" + data['url_host'];
        }
      }
    });
  }

  $('#container-search input[type="text"]').keyup(function (e) {
    if (e.keyCode === 13) {
      validate_searched_url();
    }
  });

  $("button.search").on("click", function () {
    validate_searched_url();
  });

  $("#btn-report").click(function () {
    $('html, body').animate({
      scrollTop: $("#comments").offset().top
    }, 500);
  });

  $(document).on('click', '#status_message_contact', function () {
    $('html, body').animate({
      scrollTop: $("#contact").offset().top
    }, 500);
  });

  $(document).on('click', '#goto-comments', function () {
    $('html, body').animate({
      scrollTop: $("#comments").offset().top
    }, 500);
  });

  $("#btn-alternatives, #alts1, #alts2").click(function () {
    $('html, body').animate({
      scrollTop: $("#alterantives").offset().top
    }, 500);
  });

  $("#ts").click(function () {
    $('html, body').animate({
      scrollTop: $("#troubleshooting-steps").offset().top
    }, 500);
  });

  $("#cntct").click(function () {
    $('html, body').animate({
      scrollTop: $("#contact").offset().top
    }, 500);
  });

  $("#suggest").click(function () {
    $('html, body').animate({
      scrollTop: $("#comments").offset().top
    }, 500);
  });

  $(document).on('click', '#go-to-comments', function () {
    $('html, body').animate({
      scrollTop: $("#comments").offset().top
    }, 500);
  });

  $('.star-rating :radio').change(function () {
    $("#rating .loading").show();
    $("#rating .loading").css('display', 'inline-block');
    var url = $(".hreview-aggregate #url .searched-url").text();
    var language = $(".hreview-aggregate #language").text();
    var rating = this.value;
    $.ajax({
      url: WEBSITE_URL + '/rate.php',
      type: 'POST',
      data: "url=" + url +
              "&language=" + language +
              "&rating=" + rating,
      success: function (data) {
        data = jQuery.parseJSON(data);
        $("#rating .loading").hide();
        if (data['response'] === 1) {
          $(".hreview-aggregate").html("<p>Thanks for voting!</p><p>New rating is " + Math.round(data['total_values'] / data['total_votes']) + " out of 5.</p><p>Please <a id='go-to-comments' class='link'>click here</a> to add a comment.</p>");
        } else if (data['response'] === 0) {
          $(".hreview-aggregate").html("<p>You have already voted.</p><p>Please <a id='go-to-comments' class='link'>click here</a> to add a comment.</p>");
        }
      }
    });
  });

  var SEARCHED_URL = url;

  $(".containers#alterantives a#try-alternatives").attr('href', 'https://www.google.com/search?q=alternatives+of+' + SEARCHED_URL);

  $(".containers#contact #copy-url .btns:nth-child(1) a").attr('href', 'https://www.google.com/search?q=facebook+page+of+' + SEARCHED_URL);
  $(".containers#contact #copy-url .btns:nth-child(2) a").attr('href', 'https://www.google.com/search?q=support+forum+of+' + SEARCHED_URL);
  $(".containers#contact #copy-url .btns:nth-child(3) a").attr('href', 'https://www.google.com/search?q=twitter+page+of+' + SEARCHED_URL);

  var C8_HEADING = "Troubleshooting Tips";
  var C8_CONTENT = "<p><a class='steps'>Step 1: </a>Refresh your browser by hitting CTRL + F5 at the same time.<br>";
  C8_CONTENT += "Problem resolved? No, Proceed to Step 2.<br>";
  C8_CONTENT += "<a class='steps'>Step 2: </a>Switch off your modem and after restarting your computer turn it on again. Clear internet cookies and browser cache.<br>";
  C8_CONTENT += "Still trapped, then move to Step 3.<br>";
  C8_CONTENT += "<a class='steps'>Step 3: </a>Your firewall may have blocked " + SEARCHED_URL + ". Temporarily disable your anti-virus or firewall running in background. Now, if you are able to access " + SEARCHED_URL + ", be informed your security software is causing trouble. Try adding " + SEARCHED_URL + " into trusted sites' set.<br>";
  C8_CONTENT += "<a class='steps'>Step 4: </a>If problem still persists, it could be DNS fault. DNS is a service that translates " + SEARCHED_URL + " into computer-readable address called IP address. In most cases this job is done by your ISP. If only specific sites aren't opening chances are, it got corrupt.</p>";

  if ($("#language").val() === 'en') {
    var html_troubleshooting_steps = '';
    html_troubleshooting_steps += '<div class="containers" id="troubleshooting-steps">';
    html_troubleshooting_steps += '<div class="containers-inner">';
    html_troubleshooting_steps += '<i class="icon"></i>';
    html_troubleshooting_steps += '<h2>' + C8_HEADING + '</h2>';
    html_troubleshooting_steps += C8_CONTENT;
    html_troubleshooting_steps += '</div>';
    html_troubleshooting_steps += '</div>';
    $(".container .left .containers#contact").after(html_troubleshooting_steps);
  }

  var html_bookmark_container = "<div id='sticky'><div class='containers' id='bookmark'><div class ='containers-inner'><img class='icon' src='" + WEBSITE_URL + "/resources/images/bookmark.png'><h4>Bookmark Our Site</h4><img src='" + WEBSITE_URL + "/resources/images/attention.gif' style='left: 11%; position: relative;'><p>Press<b> Ctrl + D </b> to add this site to your favorites!</p></div></div>";
  $(".container .right .containers:last-child").after(html_bookmark_container);

  var html_share_container = "<div class='containers' id='share'><div class='containers-inner'><img class='icon' src='" + WEBSITE_URL + "/resources/images/sharing.png'><h4>Share</h4><div class='container-sharing'>" + get_social_buttons() + "</div></div></div></div>";
  $(".container .right .containers:last-child").after(html_share_container);

  $(".containers#comments .opts .opt:nth-child(1)").before('<p style="color: lightseagreen; display: inline-block; font-size: 11px; margin-right: 10px;">Is this comment useful? </p>');
  $(".containers#comments .opts .opt:nth-child(2) a").attr('title', 'Thumbs Up');
  $(".containers#comments .opts .opt:nth-child(3) a").attr('title', 'Thumbs Down');
  $(".containers#comments .opts .opt:nth-child(4) a").attr('title', 'Report this comment');

  $(".opt a.tu").click(function () {
    var comment_id = $(this).parent().parent().attr('id');
    var action = 1;
    var child_number = 2;
    $('#' + comment_id + ' .opt:nth-child(' + child_number + ') i.l').show();
    $('#' + comment_id + ' .opt:nth-child(' + child_number + ') i.l').css('display', 'inline-block');
    comments_handler(comment_id, child_number, action);
  });

  $(".opt a.td").click(function () {
    var comment_id = $(this).parent().parent().attr('id');
    var action = 2;
    var child_number = 3;
    $('#' + comment_id + ' .opt:nth-child(' + child_number + ') i.l').show();
    $('#' + comment_id + ' .opt:nth-child(' + child_number + ') i.l').css('display', 'inline-block');
    comments_handler(comment_id, child_number, action);
  });

  $(".opt a.rp").click(function () {
    var comment_id = $(this).parent().parent().attr('id');
    var action = 3;
    var child_number = 4;
    $('#' + comment_id + ' .opt:nth-child(' + child_number + ') i.l').show();
    $('#' + comment_id + ' .opt:nth-child(' + child_number + ') i.l').css('display', 'inline-block');
    comments_handler(comment_id, child_number, action);
  });

  function get_social_buttons() {
    var html = "";
    var URL = window.location.href;
    html += "<a class='btns' href='http://www.facebook.com/sharer.php?u=" + URL + "' target='_blank'><img src='" + WEBSITE_URL + "/resources/images/facebook.png'></a>";
    html += "<a class='btns' href='http://twitter.com/share?url=" + URL + "' target='_blank'><img src='" + WEBSITE_URL + "/resources/images/twitter.png'></a>";
    html += "<a class='btns' href='https://plus.google.com/share?url=" + URL + "' target='_blank'><img src='" + WEBSITE_URL + "/resources/images/google-plus.png'></a>";
    return html;
  }

  function comments_handler(comment_id, child_number, action) {
    $.ajax({
      url: WEBSITE_URL + '/comments-handler.php',
      type: 'POST',
      data: "comment_id=" + comment_id +
              "&action=" + action,
      success: function (data) {
        data = jQuery.parseJSON(data);
        $('#' + comment_id + ' .opt:nth-child(' + child_number + ') i.l').hide();
        if (data['result']) {
          $('#' + comment_id + ' .opt:nth-child(' + child_number + ') a span').html(data['result']);
        }
        if (data['response'] === 1) {
          get_html_sharing_pop("Thank you for your valuable response.");
        } else if (data['response'] === 0) {
          get_html_sharing_pop("You have already performed this action.");
        }
      }
    });
  }

  $("#comment_add").click(function () {
    $("#comment_add").attr('disabled', 'disabled');
    $("#comments .loading").show();
    $("#comments .loading").css('display', 'inline-block');
    var name = $("#name").val();
    var comment_text = $("#comment_text").val();
    var status = $("input[name=status]:radio:checked").val();
    var captcha_text = $("#captcha_text").val();
    var language = '';
    if ($("#language").val()) {
      language = $("#language").val();
    }
    var site = window.location.href;
    site = site.replace(WEBSITE_URL + "/status/", "");
    if (name && comment_text && captcha_text) {
      $.ajax({
        url: WEBSITE_URL + '/comment-add.php',
        type: 'POST',
        data: "name=" + name +
                "&comment_text=" + comment_text +
                "&status=" + status +
                "&captcha_text=" + captcha_text +
                "&language=" + language +
                "&site=" + site,
        success: function (data) {
          data = jQuery.parseJSON(data);
          $('#comment_add').removeAttr('disabled');
          $("#comments .loading").hide();
          if (data['response'] === 1) {
            var html = '';
            html += '<div class="comment">';
            html += '<div class="l"><i class="user-1"></i><div class="header"><span class="name">' + name + '</span></div></div>';
            if (!status) {
              status = 'Up';
            }
            status = status.toLowerCase().replace(/\b[a-z]/g, function (letter) {
              return letter.toUpperCase();
            });
            html += '<div class="r"><div class="comment-title">' + status + '</div><div class="comment-info"><i></i><span>posted: just now</span></div><p class="comment-body">' + comment_text + '</p></div>';
            html += '</div>';
            $(".container-comments").prepend(html);
            $("#name").val('');
            $("#comment_text").val('');
            $("#captcha_text").val('');
            get_html_sharing_pop("Be the first to tell your friends if " + SEARCHED_URL + " is down! May be a friend could help you out with the solution otherwise...");
          } else {
            alert("Wrong captcha code.");
            $("#captcha_text").focus();
          }
        }
      });
    } else {
      $('#comment_add').removeAttr('disabled');
      $("#comments .loading").hide();
      alert("Please fill all required fields(comment, name & captcha text)");
    }
  });

  function get_html_sharing_pop(message) {
    var html_sharing_popup = '';
    html_sharing_popup += '<div id="light" class="white_content">';
    html_sharing_popup += '<div class="container-sharing popup" style="margin: 0;">';
    html_sharing_popup += '<h5 style="border-bottom: 0; margin: 10px; padding: 0;">' + message + '</h5>';
    html_sharing_popup += '<div>';
    html_sharing_popup += "<a class='btns' href='http://www.facebook.com/sharer.php?u=" + WEBSITE_URL + "/status/" + SEARCHED_URL + "' target='_blank' class='btn-facebook'><img src='" + WEBSITE_URL + "/resources/images/facebook.png'></a>";
    html_sharing_popup += "<a class='btns' href='http://twitter.com/share?url=" + WEBSITE_URL + "/status/" + SEARCHED_URL + "' target='_blank' class='btn-twitter'><img src='" + WEBSITE_URL + "/resources/images/twitter.png'></a>";
    html_sharing_popup += "<a class='btns' href='https://plus.google.com/share?url=" + WEBSITE_URL + "/status/" + SEARCHED_URL + "' target='_blank' class='btn-googleplus'><img src='" + WEBSITE_URL + "/resources/images/google-plus.png'></a>";
    html_sharing_popup += '</div>';
    html_sharing_popup += '<a id="close">X</a>';
    html_sharing_popup += '</div>';
    html_sharing_popup += '</div>';
    $('footer').before(html_sharing_popup);
    $("#light").show();
    fade_show();
    var popup_height = document.getElementById('light').offsetHeight;
    var popup_width = document.getElementById('light').offsetWidth;
    $("#light").css('top', (($(window).height() - popup_height) / 2) + $(document).scrollTop());
    $("#light").css('left', (($(window).width() - popup_width) / 2));
  }

  function fade_show() {
    $("footer").after('<div id="fade" class="black_overlay"></div>');
    $("#fade").css('height', $("body").height());
    $("#fade").show();
  }

  $(document).on('click', '#close', function () {
    $("#fade").hide();
    $("#light").hide();
  });

  /*__________SEARCH__________*/

  window.displayBoxIndex = -1;
  $("input#site").keyup(function (e) {
    var inp = String.fromCharCode(e.keyCode);
    if (/[a-zA-Z0-9-_ ]/.test(inp)) {
      $('button.search').hide();
      $('span.loader').show();
      $("span.loader").css('display', 'inline-block');
      $.ajax({
        url: WEBSITE_URL + '/ts.php',
        type: 'GET',
        data: "keyword=" + $("#site").val(),
        success: function (data) {
          data = jQuery.parseJSON(data);
          if (data['response'] === 1) {
            $("#display").html(data['html']).show();
          }
          $('span.loader').hide();
          $('button.search').show();
        }
      });
    }
    if (e.keyCode === 40) {
      Navigate(1);
    }
    if (e.keyCode === 38) {
      Navigate(-1);
    }
  });

  var Navigate = function (diff) {
    displayBoxIndex += diff;
    var oBoxCollection = $(".display_box");
    if (displayBoxIndex >= oBoxCollection.length)
      displayBoxIndex = 0;
    if (displayBoxIndex < 0)
      displayBoxIndex = oBoxCollection.length - 1;
    var cssClass = "display_box_hover";
    oBoxCollection.removeClass(cssClass).eq(displayBoxIndex).addClass(cssClass);
    if ($(".display_box_hover a").text() !== "No results found") {
      $("#site").val($(".display_box_hover a").text());
    }
  }

  function hide_search_results(e) {
    var container = $("#display");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      window.displayBoxIndex = -1;
      container.hide();
    }
  }

  $(document).mouseup(function (e) {
    hide_search_results(e);
  });

  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      hide_search_results(e);
    }
  });
  /*__________SEARCH__________*/

  $('#pagination-comments').twbsPagination({
    totalPages: Math.ceil($("#btn-report span").text() / 10),
    visiblePages: 5,
    onPageClick: function (event, page) {
      $(".container-comments .page").hide();
      $(".container-comments #page-" + page).show();
      $('html, body').animate({
        scrollTop: $(".container-comments").offset().top
      }, 500);
    }
  });
});