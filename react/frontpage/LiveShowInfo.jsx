// LiveShowInfo.jsx

var React = require('react');

// Common Elements
var RectImage = require('../common/RectImage.jsx');

var defaultShowPic = "/img/radio.png"

/**
Floating div with image and relevant info for a show

@prop title: (optional) title to show above show
@prop show: show to present
*/
var LiveShowInfo = React.createClass({
  djString: function(djMap) {
    var djString = "";
    var addComma = false;
    for (var dj in djMap) {
      if (addComma) {
        djString += ", ";
      }
      djString += djMap[dj];
      addComma = true;
    }
    return djString;
  },
  truncateName: function(name, l) {
    return name.length > l ? name.substr(0,l-2) + "\u2026" : name;
  },
  render: function() {
    if (!this.props.show) {
      return <div classname="liveShowInfo"></div>;
    } else {
      return (
        <div className="liveShowInfo frontWell">
          <div className="liveShowBanner">
            { !this.props.title ? "" :
              <h3>{this.props.title}</h3>
            }
            <div className="showDetails">
              <span className="time">{this.props.show.day + " " + this.props.show.time}</span>
              <span className="genre">{this.truncateName(this.props.show.genre || "", 18)}</span>
            </div>
            <RectImage responsive
                        src={this.props.show.picture || defaultShowPic} />
          </div>
          <h4>{this.props.show.title || ""}</h4>
          <p className="djs">{this.djString(this.props.show.djs || {})}</p>
          <p className="blurb">{this.props.show.blurb || ""}</p>
        </div>
      );
    }
  }
});

module.exports = LiveShowInfo;
