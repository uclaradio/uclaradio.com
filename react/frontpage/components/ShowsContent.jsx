// ShowsContent.jsx

var React = require('react');

var ShowsGraph = require('./ShowsGraph.jsx');
var ShowBlurb = require('./ShowBlurb.jsx');

// styling
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
	toggleActiveShow: function(show) {
		this.setState({activeShow: show});
	},
	render: function() {
		var graphStyle = {
			width: "70%"
		};

		var blurbStyle = {
			width: "30%"
		};

		return (
			<div className="showsContent">
				<div className="graph" style={graphStyle}>
					<ShowsGraph shows={this.props.shows}
						currentShowID={this.props.currentShowID}
						spotlightShowID={this.props.spotlightShowID}
						activeShowID={this.state.activeShow && this.state.activeShow.id}
						onShowClick={this.toggleActiveShow} />
				</div>
				{ activeShow &&
					<div className="blurb" style={blurbStyle}>
						<ShowBlurb show={activeShow} />
					</div>
				}
			</div>
		);
	}
});

module.exports = ShowsContent;
