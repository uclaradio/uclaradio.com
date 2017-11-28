// elrond.html
// View what is currently on Rivendell

import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Well, Alert } from 'react-bootstrap';
import Reactable from 'reactable';
import Spinner from 'react-spinkit';

// Panel Elements
import PanelLinksNavbar from './panel/PanelLinksNavbar';

const Table = Reactable.Table;

const urls = {
  url: '/panel/api/songs',
};

const ElrondPage = React.createClass({
  render() {
    return (
      <div className="panelPage">
        <Grid>
          <PanelLinksNavbar />
          <Well>
            <RivendellTable />
          </Well>
        </Grid>
      </div>
    );
  },
});

const RivendellTable = React.createClass({
  getInitialState() {
    return { songs: [], fetching: true };
  },

  loadDataFromServer() {
    $.ajax({
      url: urls.url,
      dataType: 'json',
      cache: false,
      success: function(o) {
        this.setState({ songs: o.songs, fetching: false, lastUpdated: o.time });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.url, status, err.toString());
      }.bind(this),
    });
  },

  componentDidMount() {
    this.loadDataFromServer();
  },
  render() {
    return (
      <div>
        {this.state.fetching ? (
          <div className="centered">
            <Spinner spinnerName="three-bounce" noFadeIn />
          </div>
        ) : (
          <div>
            <div className="centered">
              <Alert bsStyle="warning">
                <strong>Last Updated:</strong> {this.state.lastUpdated}
              </Alert>
            </div>
            <Table
              className="table"
              id="table"
              data={this.state.songs}
              filterable={['title', 'artist', 'album', 'group']}
              itemsPerPage={100}
            />
          </div>
        )}
      </div>
    );
  },
});

ReactDOM.render(<ElrondPage />, document.getElementById('content'));
