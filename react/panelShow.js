// show.html
// let DJ edit show info

const React = require('react');
const ReactDOM = require('react-dom');

const urls = {
  showURL: '/panel/api/showData/',
  showUpdateURL: '/panel/api/updateShow',
  showPicURL: '/panel/api/showPic',
  deleteShowURL: '/panel/api/deleteShow',
  deleteRedirectURL: '/panel',
};

// Panel Elements
const PanelLinksNavbar = require('./panel/PanelLinksNavbar');
const RectImage = require('./common/RectImage');

// Inputs
const InputEditableTextField = require('./panel/inputs/InputEditableTextField');
const InputEditableDateTimeField = require('./panel/inputs/InputEditableDateTimeField');
const InputCheckbox = require('./panel/inputs/InputCheckbox');
const InputFileUpload = require('./panel/inputs/InputFileUpload');
const ConfirmationButton = require('./panel/inputs/ConfirmationButton');

// Bootstrap Elements
const Grid = require('react-bootstrap').Grid;
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Well = require('react-bootstrap').Well;
const FormControls = require('react-bootstrap').FormControls;

const ShowPage = React.createClass({
  getShowIDFromURL() {
    return window.location.pathname.split('/').pop();
  },

  getInitialState() {
    return { showID: this.getShowIDFromURL() };
  },
  render() {
    return (
      <div className="showPage">
        <Grid fluid>
          <PanelLinksNavbar />
        </Grid>
        <Show urls={this.props.urls} showID={this.state.showID} />
      </div>
    );
  },
});

const Show = React.createClass({
  getInitialState() {
    return {
      show: {},
      titleVerified: false,
      dateVerified: false,
      genreVerified: false,
      blurbVerified: false,
      publicVerified: false,
      artVerified: false,
      facebookVerified: false,
      tumblrVerified: false,
      soundcloudVerified: false,
      mixcloudVerified: false,
    };
  },
  loadDataFromServer() {
    $.ajax({
      url: this.props.urls.showURL + this.props.showID,
      dataType: 'json',
      cache: false,
      success: function(show) {
        this.setState({ show });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.showURL, status, err.toString());
      }.bind(this),
    });
  },
  handleShowDataSubmit(updatedShow, successVar) {
    const oldShow = this.state.show;
    // Optimistically update local data, will be refreshed or reset after response from server
    this.setState({ show: updatedShow });
    // Stringify arrays so they reach the server
    const safeShow = JSON.stringify(updatedShow);
    // don't mark as verified yet
    const unverifiedState = {};
    unverifiedState[successVar] = false;
    this.setState(unverifiedState);
    $.ajax({
      url: this.props.urls.showUpdateURL,
      dataType: 'json',
      type: 'POST',
      data: { show: safeShow },
      success: function(show) {
        const successState = { show };
        successState[successVar] = true;
        this.setState(successState);
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({ show: oldShow });
        console.error(this.props.urls.showUpdateURL, status, err.toString());
      }.bind(this),
    });
  },
  verifyShowArt() {
    this.setState({ artVerified: true });
  },
  unverifyShowArt() {
    this.setState({ artVerified: false });
  },
  validateLink(link) {
    if (link === '') {
      return link;
    }
    if (link.indexOf('http') == -1) {
      const addHTTP = `http://${link}`;
      return addHTTP;
    }
    return link;
  },
  handleShowArtSubmit(data) {
    if (!data) {
      return;
    }

    const formData = new FormData();
    formData.append('img', data);
    formData.append('id', this.state.show.id);
    const request = new XMLHttpRequest();
    request.open('POST', this.props.urls.showPicURL);
    const loadData = this.loadDataFromServer;
    const verify = this.verifyShowArt;
    const unverify = this.unverifyShowArt;
    unverify();
    request.onload = function(e) {
      if (request.status == 200) {
        loadData();
        verify();
      } else {
        unverify();
      }
    };
    request.send(formData);
  },
  handleTitleSubmit(title) {
    const show = $.extend(true, {}, this.state.show);
    show.title = title;
    this.handleShowDataSubmit(show, 'titleVerified');
  },
  handleDateSubmit(day, time) {
    const show = $.extend(true, {}, this.state.show);
    show.day = day;
    show.time = time;
    this.handleShowDataSubmit(show, 'dateVerified');
  },
  handleGenreSubmit(genre) {
    const show = $.extend(true, {}, this.state.show);
    show.genre = genre;
    this.handleShowDataSubmit(show, 'genreVerified');
  },
  handleBlurbSubmit(blurb) {
    const show = $.extend(true, {}, this.state.show);
    show.blurb = blurb;
    this.handleShowDataSubmit(show, 'blurbVerified');
  },
  handleFacebookSubmit(facebook) {
    const show = $.extend(true, {}, this.state.show);
    show.facebook = this.validateLink(facebook);
    this.handleShowDataSubmit(show, 'facebookVerified');
  },
  handleTumblrSubmit(tumblr) {
    const show = $.extend(true, {}, this.state.show);
    show.tumblr = this.validateLink(tumblr);
    this.handleShowDataSubmit(show, 'tumblrVerified');
  },
  handleSoundcloudSubmit(soundcloud) {
    const show = $.extend(true, {}, this.state.show);
    show.soundcloud = this.validateLink(soundcloud);
    this.handleShowDataSubmit(show, 'soundcloudVerified');
  },
  handleMixcloudSubmit(mixcloud) {
    const show = $.extend(true, {}, this.state.show);
    show.mixcloud = this.validateLink(mixcloud);
    this.handleShowDataSubmit(show, 'mixcloudVerified');
  },

  handlePublicSubmit(checked) {
    const show = $.extend(true, {}, this.state.show);
    show.public = checked;
    this.handleShowDataSubmit(show, 'publicVerified');
  },
  handleDeleteShow() {
    $.ajax({
      url: this.props.urls.deleteShowURL,
      dataType: 'json',
      type: 'POST',
      data: { id: this.state.show.id },
      success: function() {
        location.href = this.props.urls.deleteRedirectURL;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.urls.deleteShowURL, status, err.toString());
      }.bind(this),
    });
  },

  componentDidMount() {
    this.loadDataFromServer();
  },
  render() {
    let djs = '';
    if (this.state.show.djs != null) {
      let useComma = false;
      const djMap = this.state.show.djs;
      Object.keys(djMap).forEach(username => {
        if (useComma) {
          djs += ', ';
        } else {
          useComma = true;
        }
        djs += djMap[username];
      });
    }
    return (
      <div className="show">
        <Grid>
          <Well>
            <Row>
              <Col xs={12} md={4}>
                <RectImage
                  src={this.state.show.picture || '/img/radio.png'}
                  rounded
                  maxWidth="380px"
                />
                <div className="centered">
                  <small>
                    <i>
                      For best quality, upload an image with a width of 512px or
                      greater{' '}
                    </i>
                  </small>
                </div>
              </Col>
              <Col xs={12} md={8}>
                <h3>{this.state.show.title}</h3>
                <InputFileUpload
                  accept=".png,.gif,.jpg,.jpeg"
                  title="Art"
                  onSubmit={this.handleShowArtSubmit}
                  verified={this.state.artVerified}
                />
                <form className="form-horizontal">
                  <FormControls.Static
                    label="DJs"
                    labelClassName="col-xs-3"
                    wrapperClassName="inputEditWrapper col-xs-9">
                    {djs}
                  </FormControls.Static>
                </form>
                <InputEditableTextField
                  title="Title"
                  currentValue={this.state.show.title}
                  onSubmit={this.handleTitleSubmit}
                  placeholder="Enter Show Title"
                  verified={this.state.titleVerified}
                />
                <InputEditableDateTimeField
                  title="Time"
                  day={this.state.show.day}
                  time={this.state.show.time}
                  onDateSubmit={this.handleDateSubmit}
                  placeholder="Enter Show Time"
                  verified={this.state.dateVerified}
                />
                <InputEditableTextField
                  title="Genre"
                  currentValue={this.state.show.genre}
                  onSubmit={this.handleGenreSubmit}
                  placeholder="Enter Show Genre"
                  verified={this.state.genreVerified}
                />
                <InputEditableTextField
                  title="Blurb"
                  multiline
                  currentValue={this.state.show.blurb}
                  onSubmit={this.handleBlurbSubmit}
                  placeholder="Enter Show Blurb"
                  verified={this.state.blurbVerified}
                />
                <InputEditableTextField
                  title="Facebook"
                  multiline
                  currentValue={this.state.show.facebook}
                  onSubmit={this.handleFacebookSubmit}
                  placeholder="https://www.facebook.com/yourshow"
                  verified={this.state.facebookVerified}
                />
                <InputEditableTextField
                  title="Tumblr"
                  multiline
                  currentValue={this.state.show.tumblr}
                  onSubmit={this.handleTumblrSubmit}
                  placeholder="http://yourshow.tumblr.com"
                  verified={this.state.tumblrVerified}
                />
                <InputEditableTextField
                  title="Soundcloud"
                  multiline
                  currentValue={this.state.show.soundcloud}
                  onSubmit={this.handleSoundcloudSubmit}
                  placeholder="https://soundcloud.com/yourshow"
                  verified={this.state.soundcloudVerified}
                />
                <InputEditableTextField
                  title="Mixcloud"
                  multiline
                  currentValue={this.state.show.mixcloud}
                  onSubmit={this.handleMixcloudSubmit}
                  placeholder="https://www.mixcloud.com/yourshow"
                  verified={this.state.mixcloudVerified}
                />
                <InputCheckbox
                  title="Public"
                  details="Make Show Public"
                  checked={this.state.show.public}
                  onSelect={this.handlePublicSubmit}
                  verified={this.state.publicVerified}
                />
                <ConfirmationButton
                  confirm={`Delete '${this.state.show.title}'`}
                  submit={`Really delete '${this.state.show.title}'?`}
                  onSubmit={this.handleDeleteShow}
                />
              </Col>
            </Row>
          </Well>
        </Grid>
      </div>
    );
  },
});

ReactDOM.render(<ShowPage urls={urls} />, document.getElementById('content'));
