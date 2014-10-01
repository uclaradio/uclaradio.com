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
  var hour = new Date().getUTCHours();

  // UCLA is located 7 hours behind UTC. Use UTC time so our 
  // background colors will be synchronized wherever you are in the world.
  var timeOfDay = null;

  // Nighttime: 9pm - 6am == 21 - 6 PDT == 4 - 13 UTC
  if (hour >= 4 && hour < 13) {
    return getRandColorScheme('night');
  } 
  // Morning: 6am - 9am == 6-9 PDT == 13-16 UTC
  else if (hour >= 13 && hour < 16) {
    return getRandColorScheme('morning');
  }
  // Noon: 9am - 5pm == 9-17 PDT == 16-00 UTC
  else if (hour >= 16) {
    return getRandColorScheme('noon');
  }
  // Evening: 5pm-9pm == 17-21 PDT == 00-04 UTC
  else {
    return getRandColorScheme('evening');
  }
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
  console.log(boxShadowHoverCss);

  var boxShadowActiveCss = "1px 0px " + mediumColor + 
    ", 0px 1px " + darkColor +
    ", 2px 1px " + mediumColor +
    ", 1px 2px " + darkColor;
  console.log(boxShadowActiveCss);


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

$(function() {

  // activate the play button
  $("#play-button").click(function() {
    $("#play-icon").toggleClass("fa fa-play fa fa-pause");
    if (stream.paused === false) {
      stream.pause();
      // need to hard reset to stop the download
      stream.src = '';
    } else {
      stream.src = "http://stream.uclaradio.com:8000/listen";
      stream.play();
    }
  });

  // Generate that background image!
  var colorScheme = getColorSchemeFromTime();
  //debug
  console.log(colorScheme);
  setPageTheme(colorScheme); 
});


