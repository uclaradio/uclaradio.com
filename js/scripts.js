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
});
