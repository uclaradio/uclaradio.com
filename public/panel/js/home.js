// home.html
// let DJ edit personal info


var UserData = React.createClass({
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(user) {
        this.setState({user: user});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleDJNameSubmit: function(newDJName) {
    var user = $.extend(true, {}, this.state.user);
    user.djName = newDJName;
    this.handleUserDataSubmit(user);
  },
  handleEmailSubmit: function(newEmail) {
    var user = $.extend(true, {}, this.state.user);
    user.email = newEmail;
    this.handleUserDataSubmit(user);
  },
  handlePhoneSubmit: function(newPhone) {
    var user = $.extend(true, {}, this.state.user);
    user.phone = newPhone;
    this.handleUserDataSubmit(user);
  },
  handleUserDataSubmit: function(updatedUser) {
    var oldUser = this.state.user;
    // Optimistically update local data, will be refreshed or reset after response from server
    updatedUser.username = oldUser.username;
    this.setState({user: updatedUser});
    $.ajax({
      url: this.props.updateURL,
      dataType: 'json',
      type: 'POST',
      data: updatedUser,
      success: function(user) {
        this.setState({user: user});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({user: oldUser});
        console.error(this.props.updateURL, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {user: {username: '', djName: '', email: '', phone: ''}};
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    return (
      <div className="userData">
        <h2>{this.state.user.username}</h2>

        <UserEditableTextField name="DJ Name" currentValue={this.state.user.djName} onTextSubmit={this.handleDJNameSubmit} />
        <UserEditableTextField name="Email" currentValue={this.state.user.email} onTextSubmit={this.handleEmailSubmit} />
        <UserEditableTextField name="Phone Number" currentValue={this.state.user.phone} onTextSubmit={this.handlePhoneSubmit} />

        <br />
        <ShowsList url={this.props.showURL} addShowURL={this.props.addShowURL}/>
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
    this.setState({shows: this.state.shows.concat([showData])});
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
  getInitialState: function() {
    // shows: {title, day, time}
    return {shows: []};
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    // list shows
    var allShows = this.state.shows.map(function(show) {
      return (
        <li key={show.title}><b>{show.title}</b> ({show.day} {show.time})</li>
      );
    });
    return (
      <div className="showsList">
      <h2> Shows </h2>
      <ul>
        {allShows}
        <li key="newShow"><NewShowForm onNewShowSubmit={this.handleUserSubmitNewShow}/></li>
      </ul>
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
            &ensp;<select value={this.state.day} onChange={this.handleDayChange}>
              <option value="Mon">Monday</option>
              <option value="Tue">Tuesday</option>
              <option value="Wed">Wednesday</option>
              <option value="Thu">Thursday</option>
              <option value="Fri">Friday</option>
              <option value="Sat">Saturday</option>
              <option value="Sun">Sunday</option>
            </select>
            &ensp;<select value={this.state.time} onChange={this.handleTimeChange}>
              <option value="11am">11AM</option>
              <option value="12pm">12PM</option>
              <option value="1pm">1PM</option>
            </select>
            &ensp;<input type="submit" id="no_bottom_margins" value="Submit" />
            &ensp;<a onClick={this.toggleEditableField}>Cancel</a>
          </form>
          :
          // locked to user input
          <p><a onClick={this.toggleEditableField}>Add New Show</a></p>
        }
      </div>
    );
  }
});


ReactDOM.render(
  <UserData url="/panel/api/user" updateURL="/panel/api/updateUser" showURL="/panel/api/shows" addShowURL="/panel/api/addShow" />,
  document.getElementById('content')
);
