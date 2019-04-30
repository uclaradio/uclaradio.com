import React from 'react';
import './DiscoFeatures.scss';

class DiscoFeatures extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="discoFeatures">
        <img
          src="/img/disco_baby1.png"
          style={{
            height: '100px',
            position: 'relative',
            bottom: '-150px',
            left: '-11vw',
          }}
        />
        <img
          src="/img/disco_guy_with_babies.png"
          style={{
            position: 'relative',
            left: '-10vw',
          }}
        />
        <img
          src="/img/discoG.png"
          style={{
            height: '250px',
            position: 'relative',
            // bottom: '-150px',
            left: '40vw',
          }}
        />
        <img
          src="/img/disco_baby2.png"
          style={{
            height: '100px',
            position: 'relative',
            bottom: '-150px',
            left: '40vw',
          }}
        />
      </div>
    );
  }
}

export default DiscoFeatures;
