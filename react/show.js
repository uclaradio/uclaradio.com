// show.html
// let DJ edit show info

var React = require('react');
var ReactDOM = require('react-dom');

var urls = {showURL: "/panel/api/showData/",
            showUpdateURL: "/panel/api/updateShow",
            showPicURL: "/panel/api/showPic"};

// Custom elements
var PanelLinksNavbar = require('./components/PanelLinksNavbar.jsx');
var InputEditableTextField = require('./components/InputEditableTextField.jsx');
var InputEditableDateTimeField = require('./components/InputEditableDateTimeField.jsx');
var ConfirmationButton = require('./components/ConfirmationButton.jsx');
var FileInput = require('./components/FileInput.jsx');

// Bootstrap elements
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Well = require('react-bootstrap').Well;
var Image = require('react-bootstrap').Image;

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
        <Grid fluid>
          <PanelLinksNavbar />
        </Grid>
        <Show urls={this.props.urls} showID={this.state.showID} />
      </div>
    );
  }
});

var Show = React.createClass({
  getInitialState: function() {
    return {show: {}, titleVerified: false, dateVerified: false,
      genreVerified: false, blurbVerified: false};
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
  handleShowDataSubmit: function(updatedShow, successVar) {
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
      success: function(show) {
        var successState = {show: show};
        successState[successVar] = true;
        this.setState(successState);
      }.bind(this),
      error: function(xhr, status, err) {
        var failedState = {show: oldShow};
        failedState[successVar] = false;
        this.setState(failedState);
        console.error(this.props.urls.showUpdateURL, status, err.toString());
      }.bind(this)
    });
  },
  handleTitleSubmit: function(title) {
    var show = $.extend(true, {}, this.state.show);
    show.title = title;
    this.handleShowDataSubmit(show, 'titleVerified');
  },
  handleDateSubmit: function(day, time) {
    var show = $.extend(true, {}, this.state.show);
    show.day = day;
    show.time = time;
    this.handleShowDataSubmit(show, 'dateVerified');
  },
  handleGenreSubmit: function(genre) {
    var show = $.extend(true, {}, this.state.show);
    show.genre = genre;
    this.handleShowDataSubmit(show, 'genreVerified');
  },
  handleBlurbSubmit: function(blurb) {
    var show = $.extend(true, {}, this.state.show);
    show.blurb = blurb;
    this.handleShowDataSubmit(show, 'blurbVerified');
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
        <Grid>
          <Well>
            <Row>
              <Col xs={12} md={4}>
                <Image className="showImg" src={this.state.show.thumbnail || "/img/radio.png" } responsive rounded />
              </Col>
              <Col xs={12} md={8}>
                <h3>{this.state.show.title}</h3>
                <FileInput accept=".png,.gif,.jpg,.jpeg" onChange={this.handlePictureSubmit} submitText="Submit Picture" />
                <InputEditableTextField title="Title" currentValue={this.state.show.title}
                  onSubmit={this.handleTitleSubmit} placeholder="Enter Show Title" verified={this.state.titleVerified} />
                <InputEditableDateTimeField title="Time" day={this.state.show.day} time={this.state.show.time}
                  onDateSubmit={this.handleDateSubmit} placeholder="Enter Show Time" verified={this.state.dateVerified} />
                <InputEditableTextField title="Genre" currentValue={this.state.show.genre}
                  onSubmit={this.handleGenreSubmit} placeholder="Enter Show Genre" verified={this.state.genreVerified} />
                <InputEditableTextField title="Blurb" multiline currentValue={this.state.show.blurb}
                  onSubmit={this.handleBlurbSubmit} placeholder="Enter Show Blurb" verified={this.state.blurbVerified} />

                <ConfirmationButton confirm={"Delete '" + this.state.show.title + "'"} submit={"Really delete '" + this.state.show.title + "'?"} onSubmit={this.handleDeleteShow} />
              </Col>
            </Row>
          </Well>
        </Grid>
      </div>
    );
  }
});

ReactDOM.render(
  <ShowPage urls={urls} />,
  document.getElementById('content')
);
