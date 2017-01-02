// ShowPage.jsx
// shows full description of a show

import React from 'react';

// Frontpage Components
import Loader from './Loader.jsx';

// Common Components
import RectImage from '../../common/RectImage.jsx';

import  { Link } from 'react-router';

// styling
require('./ShowPage.scss');

const defaultShowPic = "/img/radio.png";

/**
Page content for individual show
Displays full description of a show, with blurb, picture, djs.. everything

@prop show: show object
@prop fetching: currently fetching shows
@prop updateShows: callback to update all listed shows
**/
const ShowPage = React.createClass({
	componentDidUpdate() {
		if (this.props.show == null) {
			this.props.updateShows();
		}
	},
  // creates readable string from DJ dictionary returned from the server
  djString: function(djMap) {
    var djString = "";
    var addComma = false;
    for (var dj in djMap) {
      if (addComma) {
        djString += ", ";
      }
      djString += djMap[dj];
      addComma = true;
    }
    return djString;
  },
	render: function() {
		var show = this.props.show;
		if (!show) {
			return (
				<div className="showPage">
					{ this.props.fetching ?
						<Loader />
					:
						"This show doesn't exist!"
					}
				</div>
			);
		}
		return (
			<div className="showPage">
				<p><Link to="/beta/shows">{show.day + " " + show.time}</Link> / {show.genre}</p>
				<RectImage maxWidth="350px" src={show.picture || defaultShowPic} />
				<div className="showInfo">
					<h3>{show.title}</h3>
					<p>{this.djString(show.djs)}</p>
					<p>{show.blurb}</p>
				</div>
			</div>
		);
	}
});

export default ShowPage;
