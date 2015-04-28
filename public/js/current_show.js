function populate(show)
{
	if(show == null || !show.length ){

		//remove the djblurb module
		$("#blurb-wrapper").remove();

		//center the play button
		$('#current-show').css("width", "250px");
		$('#current-show').css("margin-left", "auto");
		$('#current-show').css("margin-right", "auto");
		return;
	} else
	{
		for(var i = 0; i < show.length; i++)
		{
			//most of this stuff can be done in jade, 
			//but for now we'll fill content using JS
			var num = i + 1;
			slide = "#slide" +  num;
			$(slide).find('.profile-pic').append("<img src=" + show[i].image+"/>");
			$(slide).find('h3').append('<em>' + show[i].showName + '</em>');
			$(slide).find('.hosted-by').append('<strong>' + show[i].djName + '</strong> <br />');
			$(slide).find('.hosted-by').append('<em>' + show[i].genre + '</em> <br />');
			$(slide).find('.show-about').append(show[i].about);
			
			//if dj doesn't want an image
			if(show[i].image == "")
			{
				$(slide + 'p').remove();
			}
			if(i == 0) {
				document.getElementById('#' + i).innerHTML = 'On Air';
				document.getElementById('#' + i).style.textAlign = "center";
				document.getElementById('#' + i).style.lineHeight = "2.5";
			}
			else
				document.getElementById('#' + i).innerHTML = show[i].day + " " + show[i].timeslot + ": <br /> <em>" + show[i].djName + "</em>";
				
		}
		 $('#blurb-wrapper').show();

	}
}