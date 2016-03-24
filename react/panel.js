// home.html
// let DJ edit personal info

var React = require('react');
var ReactDOM = require('react-dom');

var urls = {url: "/panel/api/user",
            updateURL: "/panel/api/updateUser",
            showsURL: "/panel/api/shows",
            showURL: "/panel/api/show",
            addShowURL: "/panel/api/addShow",
            showPicURL: "/panel/api/showPic"};

// Custom elements
var PanelLinksNavbar = require('./components/PanelLinksNavbar.jsx');
var InputEditableTextField = require('./components/InputEditableTextField.jsx');
var UserEditableTextField = require('./components/UserEditableTextField.jsx');
var UserEditableDateTimeField = require('./components/UserEditableDateTimeField.jsx');
var ConfirmationButton = require('./components/ConfirmationButton.jsx');
var FileInput = require('./components/FileInput.jsx');

// Bootstrap elements
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Well = require('react-bootstrap').Well;

var User = React.createClass({
  getInitialState: function() {
    return {user: {username: '', djName: '', email: '', phone: ''},
      djNameVerified: false, emailVerified: false, phoneVerified: false};
  },
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.urls.url,
      dataType: 'json',
      cache: false,
      success: function(user) {
        this.setState({user: user});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.url, status, err.toString());
      }.bind(this)
    });
  },
  handleUserDataSubmit: function(updatedUser, successVar) {
    var oldUser = this.state.user;
    // Optimistically update local data, will be refreshed or reset after response from server
    updatedUser.username = oldUser.username;
    this.setState({user: updatedUser});
    $.ajax({
      url: this.props.urls.updateURL,
      dataType: 'json',
      type: 'POST',
      data: updatedUser,
      success: function(user) {
        var successState = {user: user};
        successState[successVar] = true;
        this.setState(successState);
      }.bind(this),
      error: function(xhr, status, err) {
        var failedState = {user: oldUser};
        failedState[successVar] = false;
        this.setState(failedState);
        console.error(this.props.urls.updateURL, status, err.toString());
      }.bind(this)
    });
  },
  handleDJNameSubmit: function(newDJName) {
    var user = $.extend(true, {}, this.state.user);
    user.djName = newDJName;
    this.handleUserDataSubmit(user, "djNameVerified");
  },
  handleEmailSubmit: function(newEmail) {
    var user = $.extend(true, {}, this.state.user);
    user.email = newEmail;
    this.handleUserDataSubmit(user, "emailVerified");
  },
  handlePhoneSubmit: function(newPhone) {
    var user = $.extend(true, {}, this.state.user);
    user.phone = newPhone;
    this.handleUserDataSubmit(user, "phoneVerified");
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return (
      <div className="user">
        <Grid>
          <PanelLinksNavbar />
          <Row>
            <Col xs={12} md={6}>
              <Well>
                <h2>DJ Info</h2>
                <InputEditableTextField title="DJ Name" currentValue={this.state.user.djName}
                  placeholder="Enter DJ Name" onSubmit={this.handleDJNameSubmit} 
                  verified={this.state.djNameVerified} />
                <InputEditableTextField title="Email" currentValue={this.state.user.email}
                  placeholder="Enter Email" onSubmit={this.handleEmailSubmit}
                  verified={this.state.emailVerified} />
                <InputEditableTextField title="Phone" currentValue={this.state.user.phone}
                  placeholder="Enter Phone Number" onSubmit={this.handlePhoneSubmit}
                  verified={this.state.phoneVerified} />
              </Well>
            </Col>
            <Col xs={12} md={6}>
                <ShowsList url={this.props.urls.showsURL} showURL={this.props.urls.showURL} addShowURL={this.props.urls.addShowURL} showPicURL={this.props.urls.showPicURL} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

var ShowsList = React.createClass({
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(shows) {
        this.setState({shows: shows});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleUserSubmitNewShow: function(showData) {
    var oldShows = this.state.shows;
    // optimistically add show data
    var localShowData = showData;
    localShowData.id = oldShows[oldShows.length-1] + 1; // give new show a temporary id so React has a key for the show element
    this.setState({shows: this.state.shows.concat([localShowData])});
    $.ajax({
      url: this.props.addShowURL,
      dataType: 'json',
      type: 'POST',
      data: showData,
      success: function(shows) {
        this.setState({shows: shows});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({shows: oldShows});
        console.error(this.props.addShowURL, status, err.toString());
      }.bind(this)
    });
  },
  handleUpdateShow: function(showData) {
    var oldShows = this.state.shows;
    var newShows = $.extend(true, [], this.state.shows);
    for (var i = 0; i < newShows.length; i++) {
      if (newShows[i].id == showData.id) {
        // found show to update
        newShows[i] = showData;
        break;
      }
    }
    // optimistically add show data to present
    this.setState({shows: newShows});
    // encode array as JSON to send to server
    showData.djs = JSON.stringify(showData.djs);
    $.ajax({
      url: this.props.showURL,
      dataType: 'json',
      type: 'POST',
      data: showData,
      success: function() {
        this.loadDataFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({shows: oldShows});
        console.error(this.props.showURL, status, err.toString());
      }.bind(this)
    });
  },
  handleUpdatePicture: function(id, img) {
    var formData = new FormData();
    formData.append("img", img);
    formData.append("id", id);
    var request = new XMLHttpRequest();
    request.open("POST", this.props.showPicURL);
    var loadData = this.loadDataFromServer;
    request.onload = function(e) {
      if (request.status == 200) { loadData(); }
    };
    request.send(formData);
  },
  handleDeleteShow: function(show) {
    show.delete = true;
    $.ajax({
      url: this.props.showURL,
      dataType: 'json',
      type: 'POST',
      data: show,
      success: function() {
        this.loadDataFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.showURL, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    // shows: {title, day, time}
    return {shows: []};
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    // create list of all shows
    var showURL = this.props.showURL;
    var handleUpdateShow = this.handleUpdateShow;
    var handleDeleteShow = this.handleDeleteShow;
    var handleUpdatePicture = this.handleUpdatePicture;
    var allShows = this.state.shows.map(function(show) {
      return (
      <div key={show.id}>
       <Show show={show} url={showURL} onUpdateShow={handleUpdateShow} onUpdateShowPicture={handleUpdatePicture} onDeleteShow={handleDeleteShow} />
      </div>
      );
    });
    return (
      <div className="showsList">
        <h2> Shows </h2>
        {allShows}
        <br />
        <NewShowForm onNewShowSubmit={this.handleUserSubmitNewShow}/>
      </div>
    );
  }
});

var Show = React.createClass({
  getInitialState: function() {
    return {};
  },
  handleTitleSubmit: function(title) {
    var updatedShow = this.props.show;
    updatedShow.title = title;
    this.props.onUpdateShow(updatedShow);
  },
  handleDateSubmit: function(day, time) {
    var updatedShow = this.props.show;
    updatedShow.day = day;
    updatedShow.time = time;
    this.props.onUpdateShow(updatedShow);
  },
  handleGenreSubmit: function(genre) {
    var updatedShow = this.props.show;
    updatedShow.genre = genre;
    this.props.onUpdateShow(updatedShow);
  },
  handleBlurbSubmit: function(blurb) {
    var updatedShow = this.props.show;
    updatedShow.blurb = blurb;
    this.props.onUpdateShow(updatedShow);
  },
  handlePictureSubmit: function(img) {
    this.props.onUpdateShowPicture(this.props.show.id, img);
  },
  handleDeleteShow: function() {
    this.props.onDeleteShow(this.props.show);
  },
  render: function() {
    return (
      <div className="show">
        <h3>{this.props.show.title}</h3>
        <img className="showPic" src={this.props.show.thumbnail || "/img/radio.png" } />
        <FileInput accept=".png,.gif,.jpg,.jpeg" onChange={this.handlePictureSubmit} submitText="Submit Picture" />
        <UserEditableTextField title="Title" currentValue={this.props.show.title} onTextSubmit={this.handleTitleSubmit} />
        <UserEditableDateTimeField day={this.props.show.day} time={this.props.show.time} onDateSubmit={this.handleDateSubmit} />
        <UserEditableTextField title="Genre" currentValue={this.props.show.genre} onTextSubmit={this.handleGenreSubmit} />
        <UserEditableTextField title="Blurb" multiline={true} currentValue={this.props.show.blurb} onTextSubmit={this.handleBlurbSubmit} />

        <ConfirmationButton confirm={"Delete '" + this.props.show.title + "'"} submit={"Really delete '" + this.props.show.title + "'?"} onSubmit={this.handleDeleteShow} />
      </div>
    );
  }
});

var NewShowForm = React.createClass({
  getInitialState: function() {
    return {title: '', day: 'Mon', time: '11am', editable: false};
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  handleDayChange: function(e) {
    this.setState({day: e.target.value});
  },
  handleTimeChange: function(e) {
    this.setState({time: e.target.value});
  },
  toggleEditableField: function(e) {
    this.setState({text: '', editable: !this.state.editable})
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var day = this.state.day.trim();
    var time = this.state.time.trim();
    if (!title || !day || !time) {
      return;
    }
    var showData = {"title": title, "day": day, "time": time};
    this.props.onNewShowSubmit(showData);
    this.setState(this.getInitialState());
  },
  render: function() {
    return (
      <div className="newShowForm">
        { this.state.editable ?
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="no_bottom_margins"
              placeholder= "Show Title"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
            &ensp;<DateTimeField day={this.state.day} time={this.state.time} onDayChange={this.handleDayChange} onTimeChange={this.handleTimeChange} />
            &ensp;<input type="submit" id="no_bottom_margins" value="Submit" />
            &ensp;<a onClick={this.toggleEditableField}>Cancel</a>
          </form>
          :
          // locked to user input
          <p><a onClick={this.toggleEditableField}>+ Add New Show</a></p>
        }
      </div>
    );
  }
});

ReactDOM.render(
  <User urls={urls} />,
  document.getElementById('content')
);
