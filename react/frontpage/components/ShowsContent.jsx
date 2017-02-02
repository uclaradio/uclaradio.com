// ShowsContent.jsx

var React = require('react');

import ShowsGraph from './ShowsGraph.jsx';
import ShowBlurb from './ShowBlurb.jsx';
import ShowList from './ShowList.jsx';
import Loader from './Loader.jsx';

//mobile?
import isMobile from './misc/isMobile.js';

// styling
require('./ShowsContent.scss');
require('./shows.css');

// possible values for this.state.viewType
const ScheduleViewType = {
	grid: "gridView",
	list: "listView"
};

/*
View component for shows tab of frontpage

@prop updateShows(): fetch updated list of shows
@prop fetching: bool -> fetching list of shows
@prop shows: list of show objects
@prop currentShowID: id of current show
@prop spotlightShowID: id of spotlight show
*/
var ShowsContent = React.createClass({
	getInitialState: function() {
		return {
			mobile: false,
			viewType: ScheduleViewType.grid
		};
	},
	componentWillMount: function() {
		this.props.updateShows();
	},
	componentDidMount: function() {
		if (isMobile.any()) {
			this.setState({mobile: true});
		}
	},
	toggleActiveShow: function(show) {
		this.setState({activeShow: show});
	},
	updateViewType: function(viewType) {
		this.setState({viewType: viewType});
	},
	render: function() {
		var graphStyle = {
			width: "50%",
			float: "left"
		};

		var blurbStyle = {
			width: "50%",
			float: "left"
		};

		// loading
		if (this.props.fetching && this.props.shows.length == 0) {
			return (
				<div className="showsContent">
					<Loader />
				</div>	
			);
		}

		return (
			<div className="showsContent">
				{ !this.state.mobile && 
					<div>
						<p style={{textAlign: "center"}}>
							<a onClick={()=>{this.updateViewType(ScheduleViewType.grid)}}>Grid</a>
							&nbsp;&nbsp;&nbsp;
							<a onClick={()=>{this.updateViewType(ScheduleViewType.list)}}>List</a>
						</p>
					</div>
				}

				{ !this.state.mobile && this.state.viewType == ScheduleViewType.grid ?
					<div>
						{ /* Grid View */ }
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
					:
					<div>
						{ /* List View */ }
						<ShowList shows={this.props.shows} />
					</div>
				}
			</div>
		);
	}
});

module.exports = ShowsContent;
