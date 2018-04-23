import React from 'react';
import './SpaceJam.scss';

class SpaceJam extends React.Component {
  constructor(props) {
    super(props);
  }

  changeBackground(newB) {
    let background = document.body;
    background.style.backgroundImage = 'url(' + newB + ')';
    background.style.backgroundRepeat = 'no-repeat';
    background.style.backgroundSize = 'cover';
    background.style.backgroundAttachment = 'fixed';
  }

  render() {
    return (
      <div className="spaceJam">
        <img
          src="/img/alien1.png"
          onClick={() => this.changeBackground('/img/galaxy1.jpg')}
        />
        <img
          src="/img/alien2.png"
          onClick={() => this.changeBackground('/img/nebula0.jpg')}
        />
        <img
          src="/img/alien3.png"
          onClick={() => this.changeBackground('/img/galaxy2.png')}
        />
        <img
          src="/img/alien4.png"
          onClick={() => this.changeBackground('/img/galaxy5.jpeg')}
        />
        <img
          src="/img/alien5.png"
          onClick={() => this.changeBackground('/img/galaxy3.jpeg')}
        />
      </div>
    );
  }
}

export default SpaceJam;
