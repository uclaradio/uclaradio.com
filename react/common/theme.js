var theme = {};

// var Trianglify = require('trianglify');
// var ColorBrewer = require('colorbrewer');

/**
  Calculate color scheme

  @param timeOfDay: 'night', 'morning', 'noon', or 'evening'
  @return array of color strings
*/
theme.randColorScheme = function(timeOfDay) {
  var colors, choice;
  switch(timeOfDay) {
  case 'night': // blacks, greys, pink
    colors = ['Greys', 'RdPu'];
    break;
  case 'morning': // oranges, yellows, reds, greens
    colors = ['Reds', 'Oranges', 'YlOrBr', 'YlOrRd', 'OrRd',
      'PuRd', 'RdPu'];
    break;
  case 'noon': // greens, purples, blues, yellows
    colors = ['Greens', 'BrBG', 'PuOr',
      'Spectral', 'YlGn'];
    break;
  case 'evening': // blues, cool colors
    colors = ['YlGnBu', 'GnBu', 'PuBuGn', 'PuBu', 'Purples', 'Blues',
      'RdPu', 'PuRd', 'Greens'];
    break;
  }

  choice = colors[Math.floor(Math.random()*colors.length)];
  return choice;
};

/**
  Calculate color scheme for current time

  @return array of color strings
*/
theme.timezoneColorScheme = function() {
  // UCLA is located 7 hours behind UTC. Use UTC time so our
  // background colors will be synchronized wherever you are in the world.
  var hour = new Date().getUTCHours();

  // Nighttime: 9pm - 6am == 21 - 6 PDT == 4 - 13 UTC
  if (hour >= 4 && hour < 13) {
    return theme.randColorScheme('night');
  }
  // Morning: 6am - 9am == 6-9 PDT == 13-16 UTC
  else if (hour >= 13 && hour < 16) {
    return theme.randColorScheme('morning');
  }
  // Noon: 9am - 5pm == 9-17 PDT == 16-00 UTC
  else if (hour >= 16) {
    return theme.randColorScheme('noon');
  }
  // Evening: 5pm-9pm == 17-21 PDT == 00-04 UTC
  else {
    return theme.randColorScheme('evening');
  }
}

// theme.setButtons = function(darkColor, mediumColor, lightColor, midnight) {

//   //change colors of left and right buttons
//   injectStyles('.slick-prev:before {color: ' + lightColor + ' !important;');
//   injectStyles('.slick-next:before {color: ' + lightColor + ' !important;');

//   //the show titles at the footer of /blurbs
//   $(".pop-button").css('background-color', lightColor);
//   $("#allShows a").css('color', lightColor);
//   $("#showOftheMonth").css('color', 'black');

//   var boxShadowCss = "1px 0px " + mediumColor +
//     ", 0px 1px " + darkColor +
//     ", 2px 1px " + mediumColor +
//     ", 1px 2px " + darkColor +
//     ", 3px 2px " + mediumColor +
//     ", 2px 3px " + darkColor +
//     ", 4px 3px " + mediumColor +
//     ", 3px 4px " + darkColor;
//   //console.log(boxShadowCss);

//   $(".pop-button").css('box-shadow', boxShadowCss);
//   $(".pop-button").mousedown(
//     function() {
//       $(this).css('box-shadow', '');
//       return false;
//     }
//   );

//   $(document).mouseup(
//     function() {
//       console.log("ran it")
//       $(".pop-button").css('box-shadow', boxShadowCss);
//     }
//   );
// }

// theme.setPageTheme = function(colorScheme) {
//   var midnight = false;
//   var dark = null;
//   var medium = null;
//   var light = null;

//   if (colorScheme === "Greys") { // midnight space theme
//     midnight = true;
//     var filename = '/img/nebula' + Math.floor(Math.random()*3) + '.jpg';
//     var backgroundAttribute = "background: url(" + filename +
//       ") no-repeat center center fixed";
//     document.body.setAttribute('style', backgroundAttribute);
//     dark = '#292e49';
//     medium = '#2d4b56';
//     light = '#30716d';
//   }
//   else {
//     console.log(colorScheme);
//     var colors = ColorBrewer[colorScheme][9];
//     var pattern = Trianglify({width: window.innerWidth,
//       height: window.innerHeight,
//       variance: 0.0,
//       cell_size: 175,
//       x_colors: colors})
//     document.body.setAttribute('style', 'background: ' +
//         pattern.dataUrl + ' no-repeat center center fixed');

//     dark = colors[8];
//     medium = colors[7];
//     light = colors[6];
//   }

//   // Now set the buttons based on color scheme

//   // check if it is "dark" theme or not
//   // need to change the drop shadow as well as button
//   // setButtons(dark, medium, light, midnight);
// }

// theme.style = function() {
//   theme.setPageTheme(theme.colorScheme())
// }

module.exports = theme;
