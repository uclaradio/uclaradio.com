// ShowsContent.js

const React = require('react');

import ShowsGraph from './ShowsGraph.js';
import ShowBlurb from './ShowBlurb.js';
import ShowList from './ShowList.js';
import Loader from './Loader.js';

// mobile?
import isMobile from './misc/isMobile.js';

// styling
require('./ShowsContent.scss');

// possible values for this.state.viewType
const ScheduleViewType = {
  grid: 'gridView',
  list: 'listView',
};

/*
View component for shows tab of frontpage

@prop updateShows(): fetch updated list of shows
@prop fetching: bool -> fetching list of shows
@prop shows: list of show objects
@prop currentShowID: id of current show
@prop spotlightShowID: id of spotlight show
*/
const ShowsContent = React.createClass({
  getInitialState() {
    return {
      mobile: false,
      viewType: ScheduleViewType.grid,
    };
  },
  componentWillMount() {
    this.props.updateShows();
  },
  componentDidMount() {
    if (isMobile.any()) {
      this.setState({ mobile: true });
    }
  },
  toggleActiveShow(show) {
    this.setState({ activeShow: show });
  },
  updateViewType(viewType) {
    this.setState({ viewType });
  },
  render() {
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
        {/* List View -- small screens */}
        <div className="hidden-sm hidden-md hidden-lg">
          <ShowList shows={this.props.shows} />
        </div>

        {/* Choice between List & Grid View -- larger screens */}
        <div className="hidden-xs">
          <h1 className="schedHeader">schedule</h1>
          <div className="scheduleViewButton">
            <p
              className={
                this.state.viewType == ScheduleViewType.grid ? (
                  'switchSelStyle'
                ) : (
                  'switchStyle'
                )
              }
              onClick={() => {
                this.updateViewType(ScheduleViewType.grid);
              }}>
              GRID
            </p>
            <p
              className={
                this.state.viewType == ScheduleViewType.list ? (
                  'switchSelStyle'
                ) : (
                  'switchStyle'
                )
              }
              onClick={() => {
                this.updateViewType(ScheduleViewType.list);
              }}>
              LIST
            </p>
          </div>

          {this.state.viewType == ScheduleViewType.grid ? (
            <div>
              {/* Grid View */}
              <div className="graphStyle">
                <ShowsGraph
                  shows={this.props.shows}
                  currentShowID={this.props.currentShowID}
                  spotlightShowID={this.props.spotlightShowID}
                  activeShowID={
                    this.state.activeShow && this.state.activeShow.id
                  }
                  onShowClick={this.toggleActiveShow}
                />
              </div>
              <div className="blurbStyle">
                {this.state.activeShow && (
                  <ShowBlurb show={this.state.activeShow} />
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* List View */}
              <ShowList shows={this.props.shows} />
            </div>
          )}
        </div>
      </div>
    );
  },
});

module.exports = ShowsContent;
