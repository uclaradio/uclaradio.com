// home.html
// let DJ edit personal info

var React = require('react');
var ReactDOM = require('react-dom');

var urls = {url: "/panel/api/user",
            picURL: "/panel/api/userPic",
            showsURL: "/panel/api/shows",
            showLink: "/panel/show",
            addShowURL: "/panel/api/addShow"};

// Custom elements
var PanelLinksNavbar = require('./components/PanelLinksNavbar.jsx');
var InputEditableTextField = require('./components/InputEditableTextField.jsx');
var ConfirmationButton = require('./components/ConfirmationButton.jsx');
var InputFileUpload = require('./components/InputFileUpload.jsx');
var ShowList = require('./components/ShowList.jsx');

// Bootstrap elements
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Well = require('react-bootstrap').Well;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Image = require('react-bootstrap').Image;

// Helper files
var Dates = require('./components/misc/Dates.js');

var PanelPage = React.createClass({
  render: function() {
    return (
      <div className="panelPage">
        <Grid>
          <PanelLinksNavbar />
          <Row>
            <Col xs={12} md={6}>
              <Well>
                <User urls={this.props.urls} />
              </Well>
            </Col>
            <Col xs={12} md={6}>
                <UserShowsList urls={this.props.urls} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

var User = React.createClass({
  getInitialState: function() {
    return {user: {username: '', djName: '', email: '', phone: ''},
      djNameVerified: false, emailVerified: false, phoneVerified: false, fullNameVerified: false};
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
    // don't mark as verified yet
    var unverifiedState = {};
    unverifiedState[successVar] = false;
    this.setState(unverifiedState);
    $.ajax({
      url: this.props.urls.url,
      dataType: 'json',
      type: 'POST',
      data: {user: JSON.stringify(updatedUser)},
      success: function(user) {
        var successState = {user: user};
        successState[successVar] = true;
        this.setState(successState);
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({user: oldUser});
        console.error(this.props.urls.url, status, err.toString());
      }.bind(this)
    });
  },
  handleDJNameSubmit: function(newDJName) {
    var user = $.extend(true, {}, this.state.user);
    user.djName = newDJName;
    this.handleUserDataSubmit(user, "djNameVerified");
  },
  handleFullNameSubmit: function(fullName) {
    var user = $.extend(true, {}, this.state.user);
    user.fullName = fullName;
    this.handleUserDataSubmit(user, "fullNameVerified");
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
  verifyPic: function() {
    this.setState({picVerified: true});
  },
  unverifyPic: function() {
    this.setState({picVerified: false});
  },
  handlePicSubmit: function(data) {
    if (!data) { return; }

    var formData = new FormData();
    formData.append("img", data);
    formData.append("username", this.state.user.username);
    var request = new XMLHttpRequest();
    request.open("POST", this.props.urls.picURL);
    var loadData = this.loadDataFromServer;
    var verify = this.verifyPic;
    var unverify = this.unverifyPic;
    unverify();
    request.onload = function(e) {
      if (request.status == 200) {
        var user = request.response;
        this.setState({user: user});
        verify();
      }
      else {
        unverify();
      }
    };
    request.send(formData);
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return (
      <div className="user">
        <h2>DJ Info</h2>
        <Image className="pic profile" src={this.state.user.picture || "/img/bear.jpg" } responsive circle />
        <InputFileUpload accept=".png,.gif,.jpg,.jpeg" title="Profile" onSubmit={this.handlePicSubmit} verified={this.state.picVerified} />
        <InputEditableTextField title="DJ Name" currentValue={this.state.user.djName}
          placeholder="Enter DJ Name" onSubmit={this.handleDJNameSubmit} 
          verified={this.state.djNameVerified} />
        <InputEditableTextField title="Email" currentValue={this.state.user.email}
          placeholder="Enter Email" onSubmit={this.handleEmailSubmit}
          verified={this.state.emailVerified} />
        <InputEditableTextField title="Full Name" currentValue={this.state.user.fullName}
          placeholder="Enter Full Name" onSubmit={this.handleFullNameSubmit}
          verified={this.state.fullNameVerified} />
        <InputEditableTextField title="Phone" currentValue={this.state.user.phone}
          placeholder="Enter Phone Number" onSubmit={this.handlePhoneSubmit}
          verified={this.state.phoneVerified} />
      </div>
    );
  }
});


var UserShowsList = React.createClass({
  getInitialState: function() {
    // shows: {title, day, time}
    return {shows: []};
  },
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.urls.showsURL,
      dataType: 'json',
      cache: false,
      success: function(shows) {
        this.setState({shows: shows});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.showsURL, status, err.toString());
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
      url: this.props.urls.addShowURL,
      dataType: 'json',
      type: 'POST',
      data: showData,
      success: function(shows) {
        this.setState({shows: shows});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({shows: oldShows});
        console.error(this.props.urls.addShowURL, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return (
      <div className="userShowsList">
        <ShowList url={this.props.urls.showLink} shows={this.state.shows} placeholder="/img/radio.png" />
        <NewShowForm onNewShowSubmit={this.handleUserSubmitNewShow}/>
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
  handleDayChange: function(e, day) {
    this.setState({day: day});
  },
  handleTimeChange: function(e, time) {
    this.setState({time: time});
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
    var days = Dates.availableDays.map(function(day) {
      return <MenuItem key={day} eventKey={day}>{Dates.dayFromVar(day)}</MenuItem>;
    });

    var times = Dates.availableTimes.map(function(time) {
      return <MenuItem key={time} eventKey={time}>{time}</MenuItem>;
    });
    return (
      <div className="newShowForm">
        { this.state.editable ?
          <form onSubmit={this.handleSubmit}>
            <h4>New Show</h4>
            <Input
              type="text"
              placeholder= "Show Title"
              value={this.state.title}
              className="noBottom"
              onChange={this.handleTitleChange}
            />
            <div className="centered">
              <ButtonGroup className="lightPadding">
                <DropdownButton id="day" title={Dates.dayFromVar(this.state.day) || <span className="placeholder">Day</span>}
                onSelect={this.handleDayChange} key={this.state.day}>
                  {days}
                </DropdownButton>
                <DropdownButton id="time" title={this.state.time || <span className="placeholder">Time</span>}
                onSelect={this.handleTimeChange} key={this.state.time}>
                  {times}
                </DropdownButton>
              </ButtonGroup>
              <Button onClick={this.handleSubmit} className="lightPadding">Submit</Button>
              <Button className="cancelLink lightPadding" onClick={this.toggleEditableField}>Cancel</Button>
            </div>
          </form>
          :
          // locked to user input
          <p className="centered"><a onClick={this.toggleEditableField}>+ Add New Show</a></p>
        }
      </div>
    );
  }
});

ReactDOM.render(
  <PanelPage urls={urls} />,
  document.getElementById('content')
);
