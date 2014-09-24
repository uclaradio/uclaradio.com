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

  // activate the play button
  $("#play-button").click(function() {
    $(this).children().toggleClass("fa fa-playfa fa-pause");
    if (stream.paused === false) {
      stream.pause();
    } else {
      stream.play();
    }
  });
});
