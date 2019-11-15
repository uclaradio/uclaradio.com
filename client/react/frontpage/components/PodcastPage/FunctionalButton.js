import React from 'react';

const FunctionalButton = ({ handleClick, button }) => (
  <div>
    <button onClick={handleClick}>
      <p>{button}</p>
    </button>
  </div>
);

export default FunctionalButton;
