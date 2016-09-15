// SquareImage.jsx

var React = require('react');

// Bootstrap elements
var Image = require('react-bootstrap').Image;

/**
*  Wrapper for Image which keeps its frame square, sets height equal to width
*  Centers image with scale-to-fill if you set the background
*
*  @prop src: image source url
*  @prop thumbnail: Image should be thumbnail
*  @prop responsive: Image should be responsive
*  @prop circle: Image should be circle
*  @prop rounded: Image should be rounded
*/
var SquareImage = React.createClass({
  componentDidMount: function() {
    // make image square
    var allInstances = document.getElementsByClassName("squareImagePic");
    for (var picIndex = 0; picIndex < allInstances.length; picIndex++) {
      var pic = $(allInstances[picIndex]);
      var imageWidth = pic.outerWidth();
      pic.css({'height':imageWidth+'px'});
      pic.css({'background-size':'cover'});
    }
  },
  render: function() {
    var pictureStyle = {backgroundImage: "url(" + this.props.src + ")"};
    return (
      <div className="squareImage">
        <Image style={pictureStyle} className="squareImagePic"
        thumbnail={this.props.thumbnail} responsive={this.props.responsive}
        circle={this.props.circle} rounded={this.props.rounded} />
      </div>
    );
  }
});

module.exports = SquareImage;
