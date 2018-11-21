import React from 'react';
import RectImage from '../../../common/RectImage';

const DJCurrentShow = React.createClass({
  render() {
    return (
      <div className="currentDJ">
        <div className="currentDJImage">
          <RectImage
            maxWidth="235px"
            maxHeight="235px"
            src={this.props.currentDJ.picture}
          />
        </div>
        <div className="currentDJInfo">
          <p>Now Playing</p>
          <p className="currentDJName">{this.props.currentDJ.name}</p>
          <p className="currentDJShow">
            {this.props.currentDJ.show + ' @ ' + this.props.currentDJ.showtime}
          </p>
          <p>About: {this.props.currentDJ.bio}</p>
        </div>
      </div>
    );
  },
});

export default DJCurrentShow;
