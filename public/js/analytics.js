function getCount() {
	setInterval(function() {
		//http://107.170.149.67/reps/count
     $.getJSON("http://uclaradio.com/analytics/getCount", function(response) {
      console.log(response);
      $('#currentListeners').html(response);
     }).fail()
   }, 1000);

}

$(document).ready(function(){
	getCount();
	console.log('get');
})