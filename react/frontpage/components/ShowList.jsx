// ShowList.jsx

import React from 'react';

require('./ShowList.scss');

/**
Implemented as a presentational component (view)

@prop shows: array of show objects
@prop updateShows: callback to update all listed shows
**/
var ShowList = React.createClass({
	componentWillMount() {
		this.props.updateShows();
	},
	render() {
		return (
			<div className="showList">
				{ this.props.shows.map((show) => (
					<div key={show.id}>
						<h3>{show.title}</h3>
						<p>{show.genre}</p>
						<br />
					</div>
				)) }
			</div>
		);
	}
});

export default ShowList;
