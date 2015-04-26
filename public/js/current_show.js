// var DjBlurbSchema = new Schema({
// 	djName: String,
// 	showName: String,
// 	genre: String,
// 	description: String,
// 	link: String,
// 	timeslot: String,
// 	day: String
// }, {collection: 'DjBlurbs'});
var a = {
			djName: "dj Nutmeg", 
			showName: "The Ultimate Spice", 
			genre: "eclectic", 
			about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ILorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularit was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			link: "www.reganhsu.com",
			timeslot: "2pm",
			day: "Friday",
			image: "http://vignette2.wikia.nocookie.net/simpsons/images/6/63/The_Simpsons_Simpsons_FamilyPicture.png/revision/latest?cb=20101023180303"
		};

var b = {
			djName: "dj Nutmeg", 
			showName: "Life of Spice", 
			genre: "eclectic", 
			about: "I like my beers.  I like to think a lot.",
			link: "www.reganhsu.com",
			timeslot: "2pm",
			day: "Friday",
			image: ""
			//image: "http://vignette2.wikia.nocookie.net/simpsons/images/6/63/The_Simpsons_Simpsons_FamilyPicture.png/revision/latest?cb=20101023180303"
		}

var c = [{
			djName: "dj Nutmeg", 
			showName: "The Ultimate Spice", 
			genre: "eclectic", 
			about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ILorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularit was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			link: "www.reganhsu.com",
			timeslot: "2pm",
			day: "Friday",
			image: "http://vignette2.wikia.nocookie.net/simpsons/images/6/63/The_Simpsons_Simpsons_FamilyPicture.png/revision/latest?cb=20101023180303"
		},
		{
			djName: "dj Nutmeg", 
			showName: "Life of Space", 
			genre: "eclectic", 
			about: "I like my beers.  I like to think a lot.",
			link: "www.reganhsu.com",
			timeslot: "3pm",
			day: "Friday",
			image: ""
			//image: "http://vignette2.wikia.nocookie.net/simpsons/images/6/63/The_Simpsons_Simpsons_FamilyPicture.png/revision/latest?cb=20101023180303"
		},
		{
			djName: "dj Nutmeg", 
			showName: "The Ultimate Spice", 
			genre: "eclectic", 
			about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ILorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularit was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			link: "www.reganhsu.com",
			timeslot: "2pm",
			day: "Friday",
			image: "http://vignette2.wikia.nocookie.net/simpsons/images/6/63/The_Simpsons_Simpsons_FamilyPicture.png/revision/latest?cb=20101023180303"
		},
		{
			djName: "dj Nutmeg", 
			showName: "The Ultimate Spice", 
			genre: "eclectic", 
			about: "I like my beers.  I like to think a lot.",
			link: "www.reganhsu.com",
			timeslot: "3pm",
			day: "Friday",
			image: ""
			//image: "http://vignette2.wikia.nocookie.net/simpsons/images/6/63/The_Simpsons_Simpsons_FamilyPicture.png/revision/latest?cb=20101023180303"
		}
		]

$(document).ready(function(){
	populate(c);
})

function populate(show)
{
	if(show == null){

		$("#blurb-wrapper").remove();

			//center the play button
		$('#current-show').css("width", "250px");
		$('#current-show').css("margin-left", "auto");
		$('#current-show').css("margin-right", "auto");
		return;
	} else
	{
		var NAV = "<nav>"
		var nav_width = 100/(show.length);
		for(var i = 0; i < show.length; i++)
		{
			var num = i + 1;
			slide = "#slide" +  num;
			nav_num = "#nav" + num;
			alert(slide);

			// if(show[i].image == "")
			// {
			// 	$(slide).find('.cbp-content').css('-webkit-column-count', '1');
			// 	$(slide).find('.cbp-content').css('-moz-column-count', '1');

			// }
			// else
			// {
				$(slide).find('.profile-pic').append("<img src=" + show[i].image+"/>");
			// }

				$(slide).find('h3').append('<em>' + show[i].showName + '</em>');
				$(slide).find('.hosted-by').append('<strong>' + show[i].djName + '</strong> <br />');
				$(slide).find('.show-about').append(show[i].about);
				//var active = (i == 0) ? 'class="rc-active"' : '';
				//var nav = '<a href="' + slide + '"'+ active +'style="width: '+ nav_width +'%;">'+show[i].timeslot+'</a>'; 
				//NAV = NAV + '<a href="' + slide + '">' + show[i].timeslot + '</a>';
				var but = '#' + i;
				alert(but);
				// var element = document.getElementById(but);
				document.getElementById(but).innerHTML = show[i].timeslot;
				//$(slide).append(show[i].timeslot);
				//$('#nav').append(nav);
				//$("#billboard").css("width", "30%");
				// $("#current-show").append("<div class='col-sm-9'><div id='dj_blurb'>" + show.showName + "<br />" + show.djName +"</div></div>");
		}
		 //NAV = NAV + "</nav>";
		 $('#blurb-wrapper').show();

	}
}


// function populate(show)
// {

// 	if(show == null){

// 		$("#blurb-wrapper").remove();

// 		//center the play button
// 		$('#current-show').css("width", "250px");
// 		$('#current-show').css("margin-left", "auto");
// 		$('#current-show').css("margin-right", "auto");
// 		return;
// 	}
// 	else
// 	{
// 		if(show.image == "")
// 		{
// 			$('#slide1').find('.cbp-content').css('-webkit-column-count', '1');
// 			$('#slide1').find('.cbp-content').css('-moz-column-count', '1');

// 		}
// 		else
// 			$('#slide1').find('.profile-pic').append("<img src=" + show.image+"/>");

// 		$('#slide1').find('h3').append('<em>' + show.showName + '</em>');
// 		$('#slide1').find('.hosted-by').append('<strong>' + show.djName + '</strong> <br />');
// 		$('#slide1').find('.show-about').append(show.about);


// 		$('#blurb-wrapper').show();

// 		//$("#billboard").css("width", "30%");
// 		// $("#current-show").append("<div class='col-sm-9'><div id='dj_blurb'>" + show.showName + "<br />" + show.djName +"</div></div>");
// 	}
// }