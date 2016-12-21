// ShowPage.jsx
// shows full description of a show

import React from 'react';

// Frontpage Components
import Loader from './Loader.jsx';

// Common Components
import RectImage from '../../common/RectImage.jsx';

/**
Page content displaying full description of a show, with blurb, picture, djs.. everything

@prop show: show object
@prop fetching: currently fetching shows
@prop updateShows: callback to update all listed shows
**/
const ShowPage = React.createClass({
	componentWillMount() {
		if (this.props.show == null) {
			this.props.updateShows();
		}
	},
	render: function() {
		if (!this.props.show) {
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
				<RectImage maxWidth="350px" src={this.props.show.picture} />
				<h3>{this.props.show.title}</h3>
				<p>{this.props.show.blurb}</p>
			</div>
		);
	}
});

export default ShowPage;
