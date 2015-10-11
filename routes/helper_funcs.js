module.exports = {

		AppendValueSoSort: function(blurbs) {
			for(var i = 0; i < blurbs.length; i++ ){
				if(blurbs[i].timeslot.substr(blurbs[i].timeslot.length-2, blurbs[i].timeslot.length -1) == "am") {
					blurbs[i].order = blurbs[i].timeslot.substr(0, blurbs[i].timeslot.length-2) - "12";
				} else if(blurbs[i].timeslot == "12pm") {
					blurbs[i].order = blurbs[i].timeslot.substr(0, blurbs[i].timeslot.length-2) - "12";
				} else {
					blurbs[i].order = blurbs[i].timeslot.substr(0, blurbs[i].timeslot.length-2) - "0";
				}
			}
			return blurbs;
		},

		getUniqueBlurbs: function(blurbs) {
			var unique = [];

			for(var i = 0; i < blurbs.length; i++){
				var showName = blurbs[i].showName

				if(unique.indexOf(showName) > -1){
					//check if saved slot is after
					var saved_blurb = blurbs[unique.indexOf(showName)]
					if(saved_blurb.timeslot.length > blurbs[i].timeslot.length) {
						//12 
						console.log("saved_blurb: " + saved_blurb.timeslot);
						if(blurbs[i].timeslot == "1PM") {
							saved_blurb.timeslot = blurbs[i].timeslot;
						}
					} else if(saved_blurb.timeslot.length < blurbs[i].timeslot.length){
						if(blurbs[i].timeslot == "12PM") {
							saved_blurb.timeslot = blurbs[i].timeslot;
						}
					}
					else if(saved_blurb.timeslot[2] < blurbs[i].timeslot[2]) {
						saved_blurb.timeslot = blurbs[i].timeslot;
					};
					blurbs[unique.indexOf(showName)] = saved_blurb;
					blurbs.splice(i, 1);
					i = i -1;


				} else {
					//push the names into the array
					unique.push(showName);
				}
			}
			return blurbs;
		},

		truncateName: function(name, l) {
			return name.length > l ? name.substr(0,l-2) + "\u2026" : name;
		},

		sort_by: function(field, reverse, primer){

		   var key = primer ? 
		       function(x) {return primer(x[field])} : 
		       function(x) {return x[field]};

		   reverse = !reverse ? 1 : -1;

		   return function (a, b) {
		       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
		     } 
		},

		encode_safe_url: function (showName){
			var safe_url;
			safe_url = showName.split('?').join('(question_mark)');
			safe_url = safe_url.split('$').join('(dollar)');
			safe_url = safe_url.split('&').join('(amperstamp)');
			safe_url = safe_url.split('+').join('(plus)');
			safe_url = safe_url.split(',').join('(comma)');
			safe_url = safe_url.split('/').join('(forward_slash)');
			safe_url = safe_url.split(':').join('(colon)');
			safe_url = safe_url.split('=').join('(equals)');
			safe_url = safe_url.split('@').join('(at)');
			safe_url = safe_url.split('"').join('(quote)');
			safe_url = safe_url.split('<').join('(less_than)');
			safe_url = safe_url.split('>').join('(greater_than)');
			safe_url = safe_url.split('#').join('(hashtag)');
			safe_url = safe_url.split('%').join('(percent)');
			safe_url = safe_url.split('{').join('(open_brace)');	
			safe_url = safe_url.split('}').join('(close_brace)');
			safe_url = safe_url.split('|').join('(vertical_bar)');
			safe_url = safe_url.split('^').join('(carrot)');
			safe_url = safe_url.split('~').join('(tilde)');
			safe_url = safe_url.split('[').join('(open_bracket)');
			safe_url = safe_url.split(']').join('(close_bracket)');
			safe_url = safe_url.split('`').join('(grave_accent)');
			safe_url = safe_url.split(' ').join('_');

			return safe_url;
		},

		decode_safe_url: function (url){
			var showName;
			showName = url.split('(question_mark)').join('?');
			showName = showName.split('(dollar)').join('$');
			showName = showName.split('(amperstamp)').join('&');
			showName = showName.split('(plus)').join('+');
			showName = showName.split('(comma)').join(',');
			showName = showName.split('(forward_slash)').join('/');
			showName = showName.split('(colon)').join(':');
			showName = showName.split('(equals)').join('=');
			showName = showName.split('(at)').join('@');
			showName = showName.split('(quote)').join('"');
			showName = showName.split('(less_than)').join('<');
			showName = showName.split('(greater_than)').join('>');
			showName = showName.split('(hashtag)').join('<');
			showName = showName.split('(percent)').join('%');
			showName = showName.split('(open_brace)').join('{');	
			showName = showName.split('(close_brace)').join('}');
			showName = showName.split('(vertical_bar)').join('|');
			showName = showName.split('(carrot)').join('^');
			showName = showName.split('(tilde)').join('~');
			showName = showName.split('(open_bracket)').join('[');
			showName = showName.split('(close_bracket)').join(']');
			showName = showName.split('(grave_accent)').join('`');
			showName = showName.split('_').join(' ');

			return showName;
		}
}