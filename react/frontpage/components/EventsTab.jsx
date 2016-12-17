// EventsTab.jsx
import React from 'react';

// Common Elements
import RectImage from '../../common/RectImage.jsx';

// styling
require('./EventsTab.scss');

var eventsData = JSON.parse('[\
    {"month":"October",\
              "arr":[\
              {"image":"https://yt3.ggpht.com/-EYEkqI4sC60/AAAAAAAAAAI/AAAAAAAAAAA/Bei-cowPJvs/s900-c-k-no-mo-rj-c0xffffff/photo.jpg","type": "Giveaway","start":"2016-10-27T07:00:00.000Z","end":"2016-10-28T07:00:00.000Z","status":"CONFIRMED","summary":"Good Charlotte @ The Novo","description":"","location":"","id":"52ghriau6f6u2h6e8tu38rtlfc@google.com"},\
              {"image":"http://images2.mtv.com/uri/mgid:uma:artist:mtv.com:1694056?width=1200&height=900","type": "Campus Event","start":"2016-10-28T07:00:00.000Z","end":"2016-10-29T07:00:00.000Z","status":"CONFIRMED","summary":"M83 @ The Greek Theater","description":"","location":"","id":"i8eqp5uhrbenehl4qrirm6fcqk@google.com"},\
              {"image":"http://www.meetfactory.cz/media/images/giraffage-940x660.jpg","type": "UCLA Radio Presents","start":"2016-10-28T07:00:00.000Z","end":"2016-10-29T07:00:00.000Z","status":"CONFIRMED","summary":"Giraffage @ The Novo","description":"","location":"","id":"1rr546mob8ak34179o8jgcpfbg@google.com"},\
              {"image":"http://www.windishagency.com/assets/19873/SweaterBeats_2.jpg","type": "Giveaway","start":"2016-10-28T07:00:00.000Z","end":"2016-10-29T07:00:00.000Z","status":"CONFIRMED","summary":"Sweater Beats @ El Rey","description":"","location":"","id":"84loghf68ca49otkefg81b9rk0@google.com"},\
              {"image":"https://pbs.twimg.com/profile_images/753224710805000192/Fywv-qRJ.jpg","type": "Local Event","start":"2016-10-28T07:00:00.000Z","end":"2016-10-29T07:00:00.000Z","status":"CONFIRMED","summary":"Preoccupations @ The Roxy","description":"","location":"","id":"aou5sshkdndcohmt1j9kp6ue54@google.com"},\
              {"image":"http://festivalsupreme.com/wp-content/uploads/2016/08/festivalsupreme16INSTAGRAM-e1470736721555.jpg","type": "UCLA Radio Presents","start":"2016-10-29T07:00:00.000Z","end":"2016-10-30T07:00:00.000Z","status":"CONFIRMED","summary":"Festival Supreme @ Shrine Expo Hall & Grounds","description":"","location":"","id":"mho6d3paff5kp9e9vmn8lamb48@google.com"}\
    ]},{"month":"November",\
              "arr":[\
              {"image":"http://cdn.shopify.com/s/files/1/0336/8929/products/KingKhanBBQreissue_mini300_large.jpg?v=1389935099","type": "Giveaway","start":"2016-11-01T07:00:00.000Z","end":"2016-11-02T07:00:00.000Z","status":"CONFIRMED","summary":"The King Khan + BBQ Show @ El Rey","description":"","location":"","id":"4s9gmna6aptgnm1uj4n5obugcc@google.com"},\
              {"image":"http://lpr.com/wp-content/uploads/2013/06/Goldroom.jpg","type": "Local Event","start":"2016-11-03T07:00:00.000Z","end":"2016-11-04T07:00:00.000Z","status":"CONFIRMED","summary":"Goldroom & Autograf @ The Novo","description":"","location":"","id":"i1glinrsnp2kaekf5ulvnnsf24@google.com"},\
              {"image":"http://a3.files.fashionista.com/image/upload/c_fit,cs_srgb,dpr_1.0,q_80,w_620/MTI5NjUyMjE2NDE5MDk1ODI2.jpg","type": "Campus Event","start":"2016-11-05T07:00:00.000Z","end":"2016-11-06T07:00:00.000Z","status":"CONFIRMED","summary":"Wet @ Fonda","description":"","location":"","id":"3it0juu1t1dc7hqn3qbd3g43rg@google.com"},\
              {"image":"http://goindeepmusic.com/wp-content/uploads/2014/03/STRFKR_by_Rachel_Hubbard.jpg","type": "UCLA Radio Presents","start":"2016-11-11T08:00:00.000Z","end":"2016-11-12T08:00:00.000Z","status":"CONFIRMED","summary":"STRFKR @ El Rey","description":"","location":"","id":"pcjg77als3orr1p4t6rbgtsc10@google.com"},\
              {"image":"http://goindeepmusic.com/wp-content/uploads/2014/03/STRFKR_by_Rachel_Hubbard.jpg","type": "Giveaway","start":"2016-11-12T08:00:00.000Z","end":"2016-11-13T08:00:00.000Z","status":"CONFIRMED","summary":"STRFKR @ El Rey","description":"","location":"","id":"un8mllsuaj355fppkcsm1if7tk@google.com"},\
              {"image":"http://images.sxsw.com/lTdwxTBmlaSCHEsfnfn-Rx9Q90U=/414x293:3968x2832/700x/images.sxsw.com/3/c66bb059-b4f8-4139-8914-431fe20bc26e/artist-9669","type": "UCLA Radio Presents","start":"2016-11-14T08:00:00.000Z","end":"2016-11-15T08:00:00.000Z","status":"CONFIRMED","summary":"Rae Sremmurd @ Novo","description":"","location":"","id":"rdhn7nuj1bdnjntrd186h6nr6o@google.com"},\
              {"image":"https://i.scdn.co/image/0ca2a157ab546237f19ea092372ea30514246004","type": "Giveaway","start":"2016-11-14T08:00:00.000Z","end":"2016-11-15T08:00:00.000Z","status":"CONFIRMED","summary":"The Naked and Famous @ Fox Theater Pomona","description":"","location":"","id":"l545b4bu3e0q4o8kpr11c4120k@google.com"},\
              {"image":"https://cbsradionews.files.wordpress.com/2016/03/lapsley.jpg?w=640&h=360&crop=1","type": "Local Event","start":"2016-11-16T08:00:00.000Z","end":"2016-11-17T08:00:00.000Z","status":"CONFIRMED","summary":"Lapsley @ Mayan","description":"","location":"","id":"24k1fnktohds9f054fhh3ot414@google.com"},\
              {"image":"http://cdn-images.deezer.com/images/artist/3254f22e186654c3f4b32f3760b64e89/200x200-000000-80-0-0.jpg","type": "Giveaway","start":"2016-11-16T08:00:00.000Z","end":"2016-11-17T08:00:00.000Z","status":"CONFIRMED","summary":"Clean Bandit @ El Rey","description":"","location":"","id":"07lrbf9mhp1cl82ek1ivnde928@google.com"},\
              {"image":"https://pbs.twimg.com/profile_images/722521973436260352/s1OrZ5yI.jpg","type": "Campus Event","start":"2016-11-17T08:00:00.000Z","end":"2016-11-18T08:00:00.000Z","status":"CONFIRMED","summary":"Hopsin @ The Novo","description":"","location":"","id":"spocu2onqh2lemr7a4vljrraa8@google.com"},\
              {"image":"http://www.capitalcitiesmusic.com/files/2016/09/8a93a04785e94e4cb4b4f50a446e54a0.jpg","type": "UCLA Radio Presents","start":"2016-11-23T08:00:00.000Z","end":"2016-11-24T08:00:00.000Z","status":"CONFIRMED","summary":"Capital Cities @ Fonda","description":"","location":"","id":"tkq7qk2a3s3ftlld5is5182ua0@google.com"},\
              {"image":"http://images.sk-static.com/images/media/profile_images/artists/8041093/huge_avatar","type": "Giveaway","start":"2016-11-26T08:00:00.000Z","end":"2016-11-27T08:00:00.000Z","status":"CONFIRMED","summary":"Jai Wolf @ The Novo","description":"","location":"","id":"gi69id1ti4luactfaef68jb2js@google.com"}\
    ]},{"month":"December",\
              "arr":[\
              {"image":"http://www.smashtheclub.com/wp-content/uploads/2015/07/mrcarmack.jpg","type": "Giveaway","start":"2016-12-02T08:00:00.000Z","end":"2016-12-03T08:00:00.000Z","status":"CONFIRMED","summary":"Mr. Carmack @ The Novo","description":"","location":"","id":"fje2ccuvd8o8sqondv87o45j68@google.com"}\
    ]}]');

//content of events page
var EventsTab = React.createClass({
	render: function() {
		// describe colors with events legend
		var legend = ["Giveaway", "UCLA Radio Presents", "Campus Event", "Local Event"].map((event) => {
			return (
				<div className="colorKeyLabel" key={event}>
					<span>{event}</span>
					<div className="dot" style={{backgroundColor: getBackgroundColor(event)}}></div>
				</div>
			);
		});

		return(
			<div className="eventsTab">
				<div className="colorKey">
					{legend}
				</div>
				<div>
					{ eventsData.map (function(event) {
							return (
								<div className="monthEvents" key={event['month']}>
									<h1>{event['month']}</h1>
									<div className="allEvents">
										{ event['arr'].map( function(event) {
											return (
												<div className="event" key={event['id']}>
													<RectImage src={event['image']} />
													<div className="overlayWrapper">
														<div className="overlay" style={{backgroundColor: getBackgroundColor(event['type'])}}>
															<p className="eventDate">{formatDate(event['start'])}</p>
															<div className="eventOverlay">
																<p className="bandName">{getBandName(event['summary'])}</p>
																<p className="separator">. . .&nbsp;&nbsp;&nbsp;. . .&nbsp;&nbsp;&nbsp;. . .</p>
																<p className="venue">{getVenue(event['summary'])}</p>
															</div>
														</div>
														<div className="hoverOverlay">
															<p className="enterLabel">click for more details</p>
														</div>
													</div>
												</div>											
											);
										})
										}
									</div>
								</div>
							);
						})
					}
				</div>
			</div>
		);
	}
});

var getBackgroundColor = function(type){
	var color;
	switch(type){
		case "Giveaway":
			color = "#3c84cc";	//blue
			break;
		case "UCLA Radio Presents":
			color = "#098440";	//green
			break;
		case "Campus Event":
			color = "#842b78";	//magenta
			break;
		case "Local Event":
			color = "#cca437";	//orange
			break;
		default:
			color = "grey";
	}
	return color;
};

var getBandName = function(desc){
	return desc.substring(0, desc.indexOf("@") - 1);
};

var getVenue = function(desc){
	return desc.substring(desc.indexOf("@") + 2);
};

var formatDate = function(dateString) {
  var date = new Date(dateString);
	return date.getDate();
};

module.exports = EventsTab;