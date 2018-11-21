import React from 'react';

const DJCurrentShow = React.createClass({
  render() {
    return (
      <div>
        {this.props.currentDJ.picture}
        <p>Now Playing</p>
        <p>{this.props.currentDJ.name}</p>
        <p>{this.props.currentDJ.show}</p>
        <p>About:</p>
        <p>{this.props.currentDJ.bio}</p>
      </div>
    );
  },
});

export default DJCurrentShow;
