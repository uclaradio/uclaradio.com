 $(document).ready(function(){ 
      $.getJSON("http://localhost:3000/GiveawayCalendar/availableShows", function(response){
      	console.log(response);
      	var TicketsGivenAway = [];

      	var availableShows = [];
      	var CorrespondingWinners = [];
      	
	  		for(var i = 0; i < response.length; i++) {
	  			TicketsGivenAway.push(response[i]['summary']);
	  			// availableShows.push(response[i]['summary'].replace(/\s/g, '').replace('@','').toLowerCase());
	  			// CorrespondingWinners.push(response[i]['winner'].replace(/\s/g, '').replace('@','').toLowerCase());
	  		}
		
          $("#search").autocomplete({
            //hint: true,
            //highlight: true,
            source: TicketsGivenAway
          });
          
          console.log(CorrespondingWinners);

		$( "form" ).submit(function( event ) {
			// var name = $( this ).serializeArray()[0].value;
			// var email = $( this ).serializeArray()[1].value;
			// var info = $( this ).serializeArray()[3].value;

		 //  	var winnerKey = $( this ).serializeArray()[2].value.replace(/\s/g, '').replace('@', '').toLowerCase();
			// var requestedShow = info.replace(/\s/g, '').replace('@','').toLowerCase();

		 //  	var sendemail = 0;

		 //  	for(var i = 0; i < availableShows.length; i++) {
		 //  		if(availableShows[i].indexOf(requestedShow) > -1) {
		 //  			console.log("Matched show" + winnerKey + " " + CorrespondingWinners[i]);
		 //  			if(CorrespondingWinners[i].indexOf(winnerKey) > -1) {
		 //  				console.log("SEND EMAIL!");
		 //  				sendemail = 1;
		 //  				break;
		 //  			} else {
		 //  				//call out liars
		 //  				for(var j = 0; j < CorrespondingWinners.length; j++) {
		 //  					if(CorrespondingWinners[j].indexOf(winnerKey) > -1) {
		 //  						document.getElementById("submitButton").value = "You are not on the list";
		 //  						$('#submitButton').css('letter-spacing', '0px');
		 //  						console.log("You are not on the list.")
		 //  					}
		 //  				}
		 //  			}
		 //  		}
		 //  	}

		 //  	if(!sendemail) {
			// 	document.getElementById("submitButton").value = "Oops, check your work.";
		 //  		$('#submitButton').css('letter-spacing', '0px');
		 //  		return;
		 //  	} else {
		 //  		e.preventDefault();

		 //  		var data = {};
		 //  		data.name = name;
		 //  		data.email = email;
		 //  		data.winnerKey = info;
				$.ajax({
				  type: "POST",
				  url: "/GiveawayCalendar/stubform",
				  data: data,
				  // success: success,
				  // dataType: dataType
				});
		  		//console.log(data);
		//   	}



		//   	// event.preventDefault();
		});

 
      })

});


