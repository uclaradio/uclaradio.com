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

$(function() {
  // Keep that button square!
  squarify($('#play-button')); 
});

$(function() {
  $("#play-button").click(function() {
    if (stream.paused == false) {
      stream.pause();
	  //TODO change image to pause
    } else {
      stream.play();
	  //TODO change image to play
    }
  });
});
