// show.html
// let DJ edit show info

var React = require('react');
var ReactDOM = require('react-dom');

var urls = {showURL: "/panel/api/showData/",
            showUpdateURL: "/panel/api/updateShow",
            showPicURL: "/panel/api/showPic"};

// Custom elements
var PanelLinksNavbar = require('./components/PanelLinksNavbar.jsx');
var UserEditableTextField = require('./components/UserEditableTextField.jsx');
var UserEditableDateTimeField = require('./components/UserEditableDateTimeField.jsx');
var ConfirmationButton = require('./components/ConfirmationButton.jsx');
var FileInput = require('./components/FileInput.jsx');

// Bootstrap elements
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Well = require('react-bootstrap').Well;

var ShowPage = React.createClass({
  getShowIDFromURL: function() {
    return window.location.pathname.split('/').pop();
  },

  getInitialState: function() {
    return {showID: this.getShowIDFromURL()};
  },
  render: function() {
    return (
      <div className="showPage">
        <Grid>
          <PanelLinksNavbar />
          <Row>
            <Col xs={12} md={6}>
              <Well>
                <Show urls={this.props.urls} showID={this.state.showID} />
              </Well>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

var Show = React.createClass({
  getInitialState: function() {
    return {show: {}};
  },
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.urls.showURL+this.props.showID,
      dataType: 'json',
      cache: false,
      success: function(show) {
        this.setState({show: show});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.showURL, status, err.toString());
      }.bind(this)
    });
  },
  handleShowDataSubmit: function(updatedShow) {
    var oldShow = this.state.show;
    // Optimistically update local data, will be refreshed or reset after response from server
    this.setState({show: updatedShow});
    // Stringify arrays so they reach the server
    updatedShow.djs = JSON.stringify(updatedShow.djs);
    $.ajax({
      url: this.props.urls.showUpdateURL,
      dataType: 'json',
      type: 'POST',
      data: updatedShow,
      success: function() {
        this.loadDataFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({show: oldShow});
        console.error(this.props.urls.showUpdateURL, status, err.toString());
      }.bind(this)
    });
  },
  handleTitleSubmit: function(title) {
    var show = $.extend(true, {}, this.state.show);
    show.title = title;
    this.handleShowDataSubmit(show);
  },
  handleDateSubmit: function(day, time) {
    var show = $.extend(true, {}, this.state.show);
    show.day = day;
    show.time = time;
    this.handleShowDataSubmit(show);
  },
  handleGenreSubmit: function(genre) {
    var show = $.extend(true, {}, this.state.show);
    show.genre = genre;
    this.handleShowDataSubmit(show);
  },
  handleBlurbSubmit: function(blurb) {
    var show = $.extend(true, {}, this.state.show);
    show.blurb = blurb;
    this.handleShowDataSubmit(show);
  },
  handlePictureSubmit: function(img) {
    // this.props.onUpdateShowPicture(this.state.show.id, img);
    console.log("handlePictureSubmit not defined");
  },
  handleDeleteShow: function() {
    // this.props.onDeleteShow(this.state.show);
    console.log("handeDeleteShow not defined");
  },

  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return (
      <div className="show">
        <h3>{this.state.show.title}</h3>
        <img className="showPic" src={this.state.show.thumbnail || "/img/radio.png" } />
        <FileInput accept=".png,.gif,.jpg,.jpeg" onChange={this.handlePictureSubmit} submitText="Submit Picture" />
        <UserEditableTextField title="Title" currentValue={this.state.show.title} onTextSubmit={this.handleTitleSubmit} />
        <UserEditableDateTimeField day={this.state.show.day} time={this.state.show.time} onDateSubmit={this.handleDateSubmit} />
        <UserEditableTextField title="Genre" currentValue={this.state.show.genre} onTextSubmit={this.handleGenreSubmit} />
        <UserEditableTextField title="Blurb" multiline={true} currentValue={this.state.show.blurb} onTextSubmit={this.handleBlurbSubmit} />

        <ConfirmationButton confirm={"Delete '" + this.state.show.title + "'"} submit={"Really delete '" + this.state.show.title + "'?"} onSubmit={this.handleDeleteShow} />
      </div>
    );
  }
});

ReactDOM.render(
  <ShowPage urls={urls} />,
  document.getElementById('content')
);
