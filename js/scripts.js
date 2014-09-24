// Script to guarantee a div is square. Useful for the play button.
function squarify(element) {
  squareItUp();
  window.onresize = function(element) {
    squareItUp();
  };
  function squareItUp() {
    $(element).height($(element).width());
  }
}
// given the time of day, returns a random color scheme 
// matching it.
function getRandColorScheme(timeOfDay) {
  var possColors, choice;
  switch(timeOfDay) {
    case 'night': // blacks, greys
      {
        possColors = ['Greys', 'PuRd'];
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
        possColors = ['Greens', 'BrBG', 'PuOr', 'PiYG', 
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

$(function() {

  // activate the play button
  $("#play-button").click(function() {
    $(this).children().toggleClass("fa fa-play fa fa-pause");
    if (stream.paused === false) {
      stream.pause();
    } else {
      stream.play();
    }
  });
  // Keep that button square!
  squarify($('#play-button')); 

  // Generate that background image!
  var colorScheme = getColorSchemeFromTime();
  var colors = Trianglify.colorbrewer[colorScheme][9];
  var t = new Trianglify({noiseIntensity: 0.0, cellsize: 175, x_gradient: colors});
  var pattern = t.generate(4000, 3000);
  document.body.setAttribute('style', 'background: ' + 
    pattern.dataUrl + ' no-repeat center center fixed');
});
