import React from 'react';
import './SpaceJam.scss';

class SpaceJam extends React.Component {
  constructor(props) {
    super(props);
  }

  changeBackground(newB) {
    let background = document.getElementById('space');
    background.src = newB;
  }

  render() {
    return (
      <div className="spaceJam">
        <img
          src="/img/alien1.png"
          onClick={() => this.changeBackground('/img/nebula3.jpg')}
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
          onClick={() => this.changeBackground('/img/galaxy7.jpeg')}
        />
        <img
          src="/img/alien5.png"
          onClick={() => this.changeBackground('/img/nebula4.jpg')}
        />
      </div>
    );
  }
}

export default SpaceJam;
