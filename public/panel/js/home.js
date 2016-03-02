// home.html
// let DJ edit personal info

var urls = {url: "/panel/api/user",
            updateURL: "/panel/api/updateUser",
            showsURL: "/panel/api/shows",
            showURL: "/panel/api/show",
            addShowURL: "/panel/api/addShow",
            showPicURL: "/panel/api/showPic"};

var UserData = React.createClass({
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
      url: this.props.urls.updateURL,
      dataType: 'json',
      type: 'POST',
      data: updatedUser,
      success: function(user) {
        this.setState({user: user});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({user: oldUser});
        console.error(this.props.urls.updateURL, status, err.toString());
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
        <ShowsList url={this.props.urls.showsURL} showURL={this.props.urls.showURL} addShowURL={this.props.urls.addShowURL} showPicURL={this.props.urls.showPicURL} />

        <br />
        {(this.state.user.links == null) ? <div /> : <Links links={this.state.user.links} />}
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
       <br />
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
        <UserEditableTextField name="Title" currentValue={this.props.show.title} onTextSubmit={this.handleTitleSubmit} />
        <UserEditableDateTimeField day={this.props.show.day} time={this.props.show.time} onDateSubmit={this.handleDateSubmit} />
        <UserEditableTextField name="Genre" currentValue={this.props.show.genre} onTextSubmit={this.handleGenreSubmit} />
        <UserEditableTextField name="Blurb" multiline={true} currentValue={this.props.show.blurb} onTextSubmit={this.handleBlurbSubmit} />

        <ConfirmationButton confirm={"Delete '" + this.props.show.title + "'"} submit={"Really delete '" + this.props.show.title + "'?"} onSubmit={this.handleDeleteShow} />
        <br />
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

var Links = React.createClass({
  render: function() {
    var allLinks = this.props.links.map(function(link) {
      return (
      <li key={link.title}>
        <a href={link.link}>{link.title}</a>
      </li>
      );
    });
    return (
      <div className="links">
        <h2> Links </h2>
        <p><ul>
        {allLinks}
        </ul></p>
      </div>
    );
  }
});

ReactDOM.render(
  <UserData urls={urls} />,
  document.getElementById('content')
);
