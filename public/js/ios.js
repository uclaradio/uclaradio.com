// given the time of day, returns a random color scheme
// matching it.
function getRandColorScheme(timeOfDay) {
  var possColors, choice;
  switch(timeOfDay) {
    case 'night': // blacks, greys
      {
        possColors = ['Greys'];
        break;
      }
    case 'morning': // oranges, yellows, reds, greens
      {
        possColors = ['Reds', 'Oranges', 'YlOrBr', 'YlOrRd', 'OrRd',
                   'PuRd', 'RdPu'];
        break;
      }
    case 'noon': // greens, purples, blues, yellows
      {
        possColors = ['Greens', 'BrBG', 'PuOr',
                   'Spectral', 'YlGn'];
        break;
      }
    case 'evening': // blues, cool colors
      {
        possColors = ['YlGnBu', 'GnBu', 'PuBuGn', 'PuBu', 'Purples', 'Blues',
                   'RdPu', 'PuRd', 'Greens'];
        break;
      }
  }
  choice = possColors[Math.floor(Math.random()*possColors.length)];
  return choice;
}

function getColorSchemeFromTime() {
  return getRandColorScheme('night');
}

function setButtons(darkColor, mediumColor, lightColor, midnight) {
  $(".pop-button").css('background-color', lightColor);

  var boxShadowHoverCss = "1px 0px " + mediumColor +
    ", 0px 1px " + darkColor +
    ", 2px 1px " + mediumColor +
    ", 1px 2px " + darkColor +
    ", 3px 2px " + mediumColor +
    ", 2px 3px " + darkColor +
    ", 4px 3px " + mediumColor +
    ", 3px 4px " + darkColor;
  //console.log(boxShadowHoverCss);

  var boxShadowActiveCss = "1px 0px " + mediumColor +
    ", 0px 1px " + darkColor +
    ", 2px 1px " + mediumColor +
    ", 1px 2px " + darkColor;
  //console.log(boxShadowActiveCss);


  $(".pop-button").hover(
      function() {
        $(this).css('box-shadow', boxShadowHoverCss);
      },
      function() {
        $(this).css('box-shadow', '');
      }
      );
  $(".pop-button").focus(
      function() {
        $(this).css('box-shadow', boxShadowHoverCss);
      },
      function() {
        $(this).css('box-shadow', '');
      }
      );

  // activated by mousedown
  $(".pop-button").mousedown(
      function() {
        $(this).css('box-shadow', boxShadowActiveCss);
      }
      );

  // on mouse up, want to transition to the "hover" state
  $(".pop-button").mouseup(
      function() {
        $(this).css('box-shadow', boxShadowHoverCss);
      }
      );
}

function setPageTheme(colorScheme) {
  var midnight = false;
  var dark = null;
  var medium = null;
  var light = null;

  if (colorScheme === "Greys") { // midnight space theme
    midnight = true;
    var filename = 'img/nebula' + Math.floor(Math.random()*3) + '.jpg';
    var backgroundAttribute = "background: url(" + filename +
      ") no-repeat center center fixed";
    document.body.setAttribute('style', backgroundAttribute);
    dark = '#292e49';
    medium = '#2d4b56';
    light = '#30716d';
  }
  else {
    var colors = Trianglify.colorbrewer[colorScheme][9];
    var t = new Trianglify({noiseIntensity: 0.0, cellsize: 175, x_gradient: colors});
    var pattern = t.generate(4000, 3000);
    document.body.setAttribute('style', 'background: ' +
        pattern.dataUrl + ' no-repeat center center fixed');

    dark = colors[8];
    medium = colors[7];
    light = colors[6];
  }

  // Now set the buttons based on color scheme

  // check if it is "dark" theme or not
  // need to change the drop shadow as well as button
  setButtons(dark, medium, light, midnight);
}

$(document).ready(function() {

  var stream = document.getElementById('stream');
  var playing = false;

  //Calls mobileBrowserCheck function from mobileBrowserCheck.js.
  //function in that file is taken from detectmobilebrowsers.com
  var mobile = mobileBrowserCheck();


  //add preloading to non-mobile browsers
  if (!mobile)
    stream.setAttribute('preload', 'auto');

  // activate the play button
  $("#play-button").click(function() {

    if (!playing) {

	  //add the source again if we're on a mobile device since it was removed to stop download.
	  if (mobile)
		stream.src="http://stream.uclaradio.com:8000/listen";

      stream.play();
      playing = true;
    } else {
      stream.pause();
      playing = false;

	  //remove the source if the user is on a mobile device to stop data transfer. If we don't do this on mobile,
	  //data stream will continue until the tab is closed, even if browser is minimized.
	  if (mobile)
	    stream.src = '';
    }

    $("#play-icon").toggleClass("fa fa-play fa fa-pause");
  });

  // Generate that background image!
  var colorScheme = getColorSchemeFromTime();
  //debug
  setPageTheme(colorScheme);

  checkCarouselData();
});

function checkCarouselData() {
  setTimeout(function() {
    jQuery.getScript('http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=uclaradio&api_key=d3e63e89b35e60885c944fe9b7341b76&limit=1&format=json&callback=updateRecentTracks');
    checkCarouselData();
  }, 30000);
}


