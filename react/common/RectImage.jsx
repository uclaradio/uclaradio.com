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
*  @prop circle: Image should be circle
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
    if (this.props.circle) {
      pictureStyle.borderRadius = "50%";
    }
    var rectangleStyle = {
      maxWidth: this.props.maxWidth,
      margin: "0 auto"
    };
    return (
      <Rectangle className="rectImage" aspectRatio={this.props.aspectRatio} style={rectangleStyle}>
        <div style={pictureStyle} className="rectImagePic" />
      </Rectangle>
    );
  }
});

module.exports = RectImage;
