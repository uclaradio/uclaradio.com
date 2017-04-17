// elrond.html
// View what is currently on Rivendell

const React = require('react');
const ReactDOM = require('react-dom');

const urls = {
  url: "/panel/api/songs"
};


// Panel Elements
const PanelLinksNavbar = require('./panel/PanelLinksNavbar.jsx');

// Boostrap Components
const Grid = require('react-bootstrap').Grid;

// Table Components
const Reactable = require('reactable');
const Table = Reactable.Table;
var Spinner = require('react-spinkit');

const ElrondPage = React.createClass({
  render: function() {
    return (
      <div className="panelPage">
        <Grid>
          <PanelLinksNavbar />
          <RivendellTable />
        </Grid>
      </div>
    );
  }
});

const RivendellTable = React.createClass({
  getInitialState: function() {
    return {songs: [], fetching: true};
  },

  loadDataFromServer: function() {
    $.ajax({
      url: urls.url,
      dataType: 'json',
      cache: false,
      success: function(o) {
        this.setState({songs: o.songs, fetching: false});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return (
      <div>
        { this.state.fetching ? 
          <div className="centered">
            <Spinner spinnerName='three-bounce' noFadeIn />
          </div>
          :
          <Table className="table" id="table" data={this.state.songs} filterable={['title', 'artist', 'album', 'group']} itemsPerPage={100} />
        }
      </div>
    );
  }
});

ReactDOM.render(
  <ElrondPage />,
  document.getElementById('content')
);

