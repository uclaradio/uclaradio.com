// ShowsContent.jsx

var React = require('react');

var ShowsGraph = require('./ShowsGraph.jsx');
var ShowBlurb = require('./ShowBlurb.jsx');
import Loader from './Loader.jsx';

// styling
require('./ShowsContent.scss');
require('./shows.css');

/*
View component for shows tab of frontpage

@prop updateShows(): fetch updated list of shows
@prop fetching: bool -> fetching list of shows
@prop shows: list of show objects
@prop currentShowID: id of current show
@prop spotlightShowID: id of spotlight show
*/
var ShowsContent = React.createClass({
	componentWillMount: function() {
		this.props.updateShows();
	},
	getInitialState: function() {
		return {};
	},
	toggleActiveShow: function(show) {
		this.setState({activeShow: show});
	},
	render: function() {
		var graphStyle = {
			width: "50%"
		};

		var blurbStyle = {
			width: "50%"
		};

		return (
			<div className="showsContent">
				{ this.props.fetching && this.props.shows.length == 0 ?
					<Loader />
				:
					<div>
						<div className="graph" style={graphStyle}>
							<ShowsGraph shows={this.props.shows}
								currentShowID={this.props.currentShowID}
								spotlightShowID={this.props.spotlightShowID}
								activeShowID={this.state.activeShow && this.state.activeShow.id}
								onShowClick={this.toggleActiveShow} />
						</div>
						<div className="blurb" style={blurbStyle}>
							{ this.state.activeShow &&
								<ShowBlurb show={this.state.activeShow} />
							}
						</div>
					</div>
				}
			</div>
		);
	}
});

module.exports = ShowsContent;
