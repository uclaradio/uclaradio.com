import React from 'react';
import './DiscoFeatures.scss';

class DiscoFeatures extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tints = [
      Math.random() * 360,
      Math.random() * 360,
      Math.random() * 360,
      Math.random() * 360,
    ];
    let handleClick = e => {
      e.preventDefault();
      e.target.style.filter = `sepia(100%) saturate(500%) hue-rotate(${Math.random() *
        360}deg)`;
    };

    return (
      <div className="discoFeatures">
        <img
          src="/img/disco_baby1.png"
          style={{
            height: '100px',
            position: 'relative',
            bottom: '-150px',
            left: '-11vw',
            filter: `sepia(100%) saturate(500%) hue-rotate(${tints[0]}deg)`,
          }}
          onClick={handleClick}
        />
        <img
          src="/img/disco_guy_with_babies.png"
          style={{
            position: 'relative',
            left: '-10vw',
            filter: `sepia(100%) saturate(500%) hue-rotate(${tints[1]}deg)`,
          }}
          onClick={handleClick}
        />
        <img
          src="/img/discoG.png"
          style={{
            height: '250px',
            position: 'relative',
            left: '40vw',
            filter: `sepia(100%) saturate(500%) hue-rotate(${tints[2]}deg)`,
          }}
          onClick={handleClick}
        />
        <img
          src="/img/disco_baby2.png"
          style={{
            height: '100px',
            position: 'relative',
            bottom: '-150px',
            left: '40vw',
            filter: `sepia(100%) saturate(500%) hue-rotate(${tints[3]}deg)`,
          }}
          onClick={handleClick}
        />
      </div>
    );
  }
}

export default DiscoFeatures;
