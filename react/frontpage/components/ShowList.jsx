// ShowList.jsx

import React from 'react';

import Loader from './Loader.jsx';

require('./ShowList.scss');

/**
Implemented as a presentational component (view)

@prop shows: array of show objects
@prop fetching: currently fetching objects
@prop updateShows: callback to update all listed shows
**/
var ShowList = React.createClass({
	componentWillMount() {
		this.props.updateShows();
	},
	render() {
		return (
			<div className="showList">
				{ this.props.fetching && this.props.shows.length == 0 ?
					<Loader />
				:
				  this.props.shows.map((show) => (
						<div key={show.id}>
							<h3>{show.day + " " + show.time + ": "}{show.title}</h3>
							<p>{show.blurb}</p>
							<br />
						</div>
					))
				}
			</div>
		);
	}
});

export default ShowList;
