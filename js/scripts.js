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
	$(this).children().toggleClass("glyphicon glyphicon-play-circle center-block glyphicon glyphicon-pause center-block");
    if (stream.paused == false) {
      stream.pause();
    } else {
      stream.play();
    }
  });
});
