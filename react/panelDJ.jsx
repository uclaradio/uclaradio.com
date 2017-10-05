// home.html
// let DJ edit personal info

import React from 'react';
import ReactDOM from 'react-dom';

import {
  Button,
  ButtonGroup,
  Well,
  Col,
  Row,
  Grid,
  Input,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';

const urls = {
  url: '/panel/api/user',
  picURL: '/panel/api/userPic',
  showsURL: '/panel/api/usershows',
  showLink: '/panel/show',
  addShowURL: '/panel/api/addShow',
};

// Panel Elements
const PanelLinksNavbar = require('./panel/PanelLinksNavbar.jsx');
const ShowList = require('./panel/ShowList.jsx');
const RectImage = require('./common/RectImage.jsx');

// Inputs
const InputEditableTextField = require('./panel/inputs/InputEditableTextField.jsx');
const InputFileUpload = require('./panel/inputs/InputFileUpload.jsx');

// Misc
const Dates = require('./common/Dates.js');

// Bootstrap Elements

const PanelPage = React.createClass({
  render() {
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
  },
});

const User = React.createClass({
  getInitialState() {
    return {
      user: { username: '', djName: '', email: '', phone: '', bio: '' },
      djNameVerified: false,
      emailVerified: false,
      phoneVerified: false,
      fullNameVerified: false,
      bioVerified: false,
    };
  },
  loadDataFromServer() {
    $.ajax({
      url: this.props.urls.url,
      dataType: 'json',
      cache: false,
      success: function(user) {
        this.setState({ user });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.url, status, err.toString());
      }.bind(this),
    });
  },
  handleUserDataSubmit(updatedUser, successVar) {
    const oldUser = this.state.user;
    // Optimistically update local data, will be refreshed or reset after response from server
    updatedUser.username = oldUser.username;
    this.setState({ user: updatedUser });
    // don't mark as verified yet
    const unverifiedState = {};
    unverifiedState[successVar] = false;
    this.setState(unverifiedState);
    $.ajax({
      url: this.props.urls.url,
      dataType: 'json',
      type: 'POST',
      data: { user: JSON.stringify(updatedUser) },
      success: function(user) {
        const successState = { user };
        successState[successVar] = true;
        this.setState(successState);
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({ user: oldUser });
        console.error(this.props.urls.url, status, err.toString());
      }.bind(this),
    });
  },
  handleDJNameSubmit(newDJName) {
    const user = $.extend(true, {}, this.state.user);
    user.djName = newDJName;
    this.handleUserDataSubmit(user, 'djNameVerified');
  },
  handleFullNameSubmit(fullName) {
    const user = $.extend(true, {}, this.state.user);
    user.fullName = fullName;
    this.handleUserDataSubmit(user, 'fullNameVerified');
  },
  handleEmailSubmit(newEmail) {
    const user = $.extend(true, {}, this.state.user);
    user.email = newEmail;
    this.handleUserDataSubmit(user, 'emailVerified');
  },
  handlePhoneSubmit(newPhone) {
    const user = $.extend(true, {}, this.state.user);
    user.phone = newPhone;
    this.handleUserDataSubmit(user, 'phoneVerified');
  },
  handleBioSubmit(newBio) {
    const user = $.extend(true, {}, this.state.user);
    user.bio = newBio;
    this.handleUserDataSubmit(user, 'bioVerified');
  },
  verifyPic() {
    this.setState({ picVerified: true });
  },
  unverifyPic() {
    this.setState({ picVerified: false });
  },
  updateUserState(user) {
    this.setState({ user });
  },
  handlePicSubmit(data) {
    if (!data) {
      return;
    }

    const formData = new FormData();
    formData.append('img', data);
    formData.append('username', this.state.user.username);
    const request = new XMLHttpRequest();
    request.open('POST', this.props.urls.picURL);
    const verify = this.verifyPic;
    const unverify = this.unverifyPic;
    const updateUser = this.updateUserState;
    unverify();
    request.onload = function(e) {
      if (request.status == 200) {
        updateUser(JSON.parse(request.response));
        verify();
      } else {
        unverify();
      }
    };
    request.send(formData);
  },
  componentDidMount() {
    this.loadDataFromServer();

    // make profile image square
    const imageWidth = $('.pic.profile').width();
    $('.pic.profile').css({ height: `${imageWidth}px` });
  },
  render() {
    return (
      <div className="user">
        <h2>DJ Info</h2>
        <RectImage src={this.state.user.picture || '/img/bear.jpg'} circle />
        <div className="centered">
          <small>
            <i>
              For best quality, upload an image with a width of 512px or greater{' '}
            </i>
          </small>
        </div>
        <InputFileUpload
          accept=".png,.gif,.jpg,.jpeg"
          title="Profile"
          onSubmit={this.handlePicSubmit}
          verified={this.state.picVerified}
        />
        <InputEditableTextField
          title="DJ Name"
          currentValue={this.state.user.djName}
          placeholder="Enter DJ Name"
          onSubmit={this.handleDJNameSubmit}
          verified={this.state.djNameVerified}
        />
        <InputEditableTextField
          title="Email"
          currentValue={this.state.user.email}
          placeholder="Enter Email"
          onSubmit={this.handleEmailSubmit}
          verified={this.state.emailVerified}
        />
        <InputEditableTextField
          title="Full Name"
          currentValue={this.state.user.fullName}
          placeholder="Enter Full Name"
          onSubmit={this.handleFullNameSubmit}
          verified={this.state.fullNameVerified}
        />
        <InputEditableTextField
          title="Phone"
          currentValue={this.state.user.phone}
          placeholder="Enter Phone Number"
          onSubmit={this.handlePhoneSubmit}
          verified={this.state.phoneVerified}
        />
        <InputEditableTextField
          multiline
          title="Bio"
          currentValue={this.state.user.bio}
          placeholder="Enter Bio"
          onSubmit={this.handleBioSubmit}
          verified={this.state.bioVerified}
        />
      </div>
    );
  },
});

const UserShowsList = React.createClass({
  getInitialState() {
    // shows: {title, day, time}
    return { shows: [] };
  },
  loadDataFromServer() {
    $.ajax({
      url: this.props.urls.showsURL,
      dataType: 'json',
      cache: false,
      success: function(shows) {
        this.setState({ shows });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.showsURL, status, err.toString());
      }.bind(this),
    });
  },
  handleUserSubmitNewShow(showData) {
    const oldShows = this.state.shows;
    // optimistically add show data
    const localShowData = showData;
    localShowData.id = oldShows[oldShows.length - 1] + 1; // give new show a temporary id so React has a key for the show element
    this.setState({ shows: this.state.shows.concat([localShowData]) });
    $.ajax({
      url: this.props.urls.addShowURL,
      dataType: 'json',
      type: 'POST',
      data: showData,
      success: function(shows) {
        this.setState({ shows });
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({ shows: oldShows });
        console.error(this.props.urls.addShowURL, status, err.toString());
      }.bind(this),
    });
  },
  componentDidMount() {
    this.loadDataFromServer();
  },
  render() {
    return (
      <div className="userShowsList">
        <ShowList
          url={this.props.urls.showLink}
          shows={this.state.shows}
          placeholder="/img/radio.png"
        />
        <NewShowForm onNewShowSubmit={this.handleUserSubmitNewShow} />
      </div>
    );
  },
});

const NewShowForm = React.createClass({
  getInitialState() {
    return { title: '', day: 'Mon', time: '11am', editable: false };
  },
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  },
  handleDayChange(e, day) {
    this.setState({ day });
  },
  handleTimeChange(e, time) {
    this.setState({ time });
  },
  toggleEditableField(e) {
    this.setState({ text: '', editable: !this.state.editable });
  },
  handleSubmit(e) {
    e.preventDefault();
    const title = this.state.title.trim();
    const day = this.state.day.trim();
    const time = this.state.time.trim();
    if (!title || !day || !time) {
      return;
    }
    const showData = { title, day, time };
    this.props.onNewShowSubmit(showData);
    this.setState(this.getInitialState());
  },
  render() {
    const days = Dates.availableDays.map(day => (
      <MenuItem key={day} eventKey={day}>
        {Dates.dayFromVar(day)}
      </MenuItem>
    ));

    const times = Dates.availableTimes.map(time => (
      <MenuItem key={time} eventKey={time}>
        {time}
      </MenuItem>
    ));
    return (
      <div className="newShowForm">
        {this.state.editable ? (
          <form onSubmit={this.handleSubmit}>
            <h4>New Show</h4>
            <Input
              type="text"
              placeholder="Show Title"
              value={this.state.title}
              className="noBottom"
              onChange={this.handleTitleChange}
            />
            <div className="centered">
              <ButtonGroup className="lightPadding">
                <DropdownButton
                  id="day"
                  title={
                    Dates.dayFromVar(this.state.day) || (
                      <span className="placeholder">Day</span>
                    )
                  }
                  onSelect={this.handleDayChange}
                  key={this.state.day}>
                  {days}
                </DropdownButton>
                <DropdownButton
                  id="time"
                  title={
                    this.state.time || <span className="placeholder">Time</span>
                  }
                  onSelect={this.handleTimeChange}
                  key={this.state.time}>
                  {times}
                </DropdownButton>
              </ButtonGroup>
              <Button onClick={this.handleSubmit} className="lightPadding">
                Submit
              </Button>
              <Button
                className="cancelLink lightPadding"
                onClick={this.toggleEditableField}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          // locked to user input
          <p className="centered">
            <a onClick={this.toggleEditableField}>+ Add New Show</a>
          </p>
        )}
      </div>
    );
  },
});

ReactDOM.render(<PanelPage urls={urls} />, document.getElementById('content'));
