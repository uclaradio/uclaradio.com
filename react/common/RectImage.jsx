// RectImage.jsx

var React = require('react');

// Bootstrap Elements
var Image = require('react-bootstrap').Image;

// Open-Source Elements
var Rectangle = require('react-rectangle');

/**
*  Wrapper for Image which keeps its frame square, sets height equal to width
*  Centers image with scale-to-fill if you set the background
*
*  @prop src: image source url
*  @prop maxWidth: maximum width value
*  @prop thumbnail: Image should be thumbnail
*  @prop responsive: Image should be responsive
*  @prop circle: Image should be circle
*  @prop rounded: Image should be rounded
*/
var RectImage = React.createClass({
  getDefaultProps: function() {
    return {
      aspectRatio: 1.0
    };
  },
  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },
  render: function() {
    var pictureStyle = {
      backgroundImage: "url(" + this.props.src + ")",
      width: "100%",
      height: "100%",
      backgroundSize: "cover"
    };
    var rectangleStyle = {
      maxWidth: this.props.maxWidth,
      margin: "0 auto"
    };
    return (
      <div className="rectImage">
        <Rectangle aspectRatio={this.props.aspectRatio} style={rectangleStyle}>
          <Image style={pictureStyle} className="rectImagePic"
          thumbnail={this.props.thumbnail} responsive
          circle={this.props.circle} rounded={this.props.rounded} />
        </Rectangle>
      </div>
    );
  }
});

module.exports = RectImage;
