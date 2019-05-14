import React from 'react';
import RectImage from '../../../common/RectImage';
import './PodcastPage.scss';
import { TSImportEqualsDeclaration } from 'babel-types';

/**
 Content of each playlist 
 props
 @title title of playlist
 @imgURL image url
 @tracks array of track objects
 **/

class PodcastPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const tracks = [];
    this.props.tracks.forEach(track =>
      tracks.push(<PodcastTrack title={track.title} uri={track.uri} />)
    );
    return (
      <div>
        <div className="player">
          <h3>{this.props.title}</h3>
          <RectImage maxWidth="150px" src={this.props.imgURL} />
          {tracks}
        </div>

        <div className="episodeList">
          <p>Title</p>
          <p>Date</p>
        </div>
      </div>
    );
  }
}
export default PodcastPlaylist;
