function injectStyles(rule) {
  var div = $('<div />', {
    html: '&shy;<style>' + rule + '</style>',
  }).appendTo('body');
}

// given the time of day, returns a random color scheme
// matching it.
function getRandColorScheme(timeOfDay) {
  var possColors, choice;
  switch (timeOfDay) {
    case 'night': {
      // blacks, greys
      possColors = ['Greys'];
      break;
    }
    case 'morning': {
      // oranges, yellows, reds, greens
      possColors = [
        'Reds',
        'Oranges',
        'YlOrBr',
        'YlOrRd',
        'OrRd',
        'PuRd',
        'RdPu',
      ];
      break;
    }
    case 'noon': {
      // greens, purples, blues, yellows
      possColors = ['Greens', 'BrBG', 'PuOr', 'Spectral', 'YlGn'];
      break;
    }
    case 'evening': {
      // blues, cool colors
      possColors = [
        'YlGnBu',
        'GnBu',
        'PuBuGn',
        'PuBu',
        'Purples',
        'Blues',
        'RdPu',
        'PuRd',
        'Greens',
      ];
      break;
    }
  }
  choice = possColors[Math.floor(Math.random() * possColors.length)];
  return choice;
}

function getColorSchemeFromTime() {
  var hour = new Date().getUTCHours();

  // UCLA is located 7 hours behind UTC. Use UTC time so our
  // background colors will be synchronized wherever you are in the world.
  var timeOfDay = null;

  // Nighttime: 9pm - 6am == 21 - 6 PDT == 4 - 13 UTC
  if (hour >= 4 && hour < 13) {
    return getRandColorScheme('morning');
  } else if (hour >= 13 && hour < 16) {
    // Morning: 6am - 9am == 6-9 PDT == 13-16 UTC
    return getRandColorScheme('morning');
  } else if (hour >= 16) {
    // Noon: 9am - 5pm == 9-17 PDT == 16-00 UTC
    return getRandColorScheme('noon');
  } else {
    // Evening: 5pm-9pm == 17-21 PDT == 00-04 UTC
    return getRandColorScheme('evening');
  }
}

function setButtons(darkColor, mediumColor, lightColor, midnight) {
  injectStyles('.rc-active {background-color:' + lightColor + ';}');
  injectStyles(
    '.cbp-contentslider nav a:last-child {box-shadow: 1px 0 ' +
      lightColor +
      ';}'
  );

  $('.cbp-contentslider nav a').hover(
    function() {
      $(this).css('background-color', lightColor);
      $(this).css('color', 'white');
    },
    function() {
      $(this).css('background-color', '');
      $(this).css('color', 'black');
    }
  );
  $('.cbp-contentslider').css('border', '4px solid' + lightColor);
  $('.cbp-contentslider nav a').css('border-right', '4px solid' + lightColor);
  $('.cbp-contentslider h3').css('border-bottom', '4px solid' + lightColor);
  $('nav').css('border-top', '4px solid' + lightColor);
  injectStyles('.slick-prev:before {color: ' + lightColor + ' !important;');
  injectStyles('.slick-next:before {color: ' + lightColor + ' !important;');

  var boxShadowHoverCss =
    '1px 0px ' +
    mediumColor +
    ', 0px 1px ' +
    darkColor +
    ', 2px 1px ' +
    mediumColor +
    ', 1px 2px ' +
    darkColor +
    ', 3px 2px ' +
    mediumColor +
    ', 2px 3px ' +
    darkColor +
    ', 4px 3px ' +
    mediumColor +
    ', 3px 4px ' +
    darkColor;
  //console.log(boxShadowHoverCss);

  var boxShadowActiveCss =
    '1px 0px ' +
    mediumColor +
    ', 0px 1px ' +
    darkColor +
    ', 2px 1px ' +
    mediumColor +
    ', 1px 2px ' +
    darkColor;
  //console.log(boxShadowActiveCss);

  injectStyles('.pop-button { background-color: ' + lightColor + '}');
  injectStyles('.pop-button.selected { background-color: ' + darkColor + '}');
  injectStyles('.pop-button:hover { box-shadow: ' + boxShadowHoverCss + '}');
  injectStyles('.pop-button:hover.selected { box-shadow: none}');
  injectStyles('.pop-button:focus { box-shadow: ' + boxShadowActiveCss + '}');

  // injectStyles('.pop-button:hover.selected { box-shadow: ' + boxShadowHoverCss + '}');
  // injectStyles('.pop-button:focus.selected { box-shadow: ' + boxShadowActiveCss + '}');

  // activated by mousedown
  $('.pop-button').mousedown(function() {
    $(this).css('box-shadow', boxShadowActiveCss);
  });

  // on mouse up, want to transition to the "hover" state
  $('.pop-button').mouseup(function() {
    $(this).css('box-shadow', boxShadowHoverCss);
  });
}

function setPageTheme(colorScheme) {
  var midnight = false;
  var dark = null;
  var medium = null;
  var light = null;

  if (colorScheme === 'Greys') {
    // midnight space theme
    midnight = true;
    var filename = 'img/nebula' + Math.floor(Math.random() * 3) + '.jpg';
    var backgroundAttribute =
      'background: url(' + filename + ') no-repeat center center fixed';
    document.body.setAttribute('style', backgroundAttribute);
    dark = '#292e49';
    medium = '#2d4b56';
    light = '#30716d';
  } else {
    var colors = Trianglify.colorbrewer[colorScheme][9];
    var t = new Trianglify({
      noiseIntensity: 0.0,
      cellsize: 175,
      x_gradient: colors,
    });
    var pattern = t.generate(4000, 3000);
    document.body.setAttribute(
      'style',
      'background: ' + pattern.dataUrl + ' no-repeat center center fixed'
    );

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
  // Generate that background image!
  var colorScheme = getColorSchemeFromTime();

  //debug
  setPageTheme(colorScheme);
});
