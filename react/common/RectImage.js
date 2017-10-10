// RectImage

import React from 'react';
import Rectangle from 'react-rectangle';
import './RectImage.scss';

/**
*  Wrapper for Image which keeps its frame rectangular, sets height equal to width
*  Centers image with scale-to-fill if you set the background
*
*  @prop src: image source url
*  @prop maxWidth: maximum width value
*  @prop circle: Image should be circle
*  @prop aspectRatio: float ratio for image
*/
const RectImage = React.createClass({
  getDefaultProps() {
    return {
      aspectRatio: 1.0,
    };
  },
  handleResize(e) {
    this.setState({ windowWidth: window.innerWidth });
  },
  render() {
    const pictureStyle = {
      backgroundImage: `url(${this.props.src})`,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
    };
    if (this.props.circle) {
      pictureStyle.borderRadius = '50%';
    }
    const rectangleStyle = {
      maxWidth: this.props.maxWidth,
      margin: '0 auto',
    };
    return (
      <Rectangle
        className="rectImage"
        aspectRatio={this.props.aspectRatio}
        style={rectangleStyle}>
        <div style={pictureStyle} className="rectImagePic">
          {this.props.children}
        </div>
      </Rectangle>
    );
  },
});

export default RectImage;
