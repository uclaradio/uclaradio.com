$(document).ready(function() {
	$('#c_data').slick({
		  dots: true,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 4,
		  slidesToScroll: 4,
		  responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 3,
		        infinite: true,
		        dots: true
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
		      }
		    },
		    {
		      breakpoint: 500,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        dots: false

		      }
		    }
		  ]
	});
	jQuery.getScript('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=reganhsu&api_key=d3e63e89b35e60885c944fe9b7341b76&limit=10&format=json&callback=lfmRecentTracks');
});
