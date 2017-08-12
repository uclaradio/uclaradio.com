// TriangleCanvas.jsx

import React from 'react';
import Trianglify from 'trianglify';

require('./TriangleCanvas.scss');

/**
Canvas with Trianglify styling applied, equal in size to current window,
  can be used as a sweet background.
Will automatically size to window's width and height.

@prop cellSize: cell_size option for Trianglify
@prop xColors: x_colors option for Trianglify
@prop yColors: y_colors option for Trianglify
note: more Trianglify options available https://github.com/qrohlf/trianglify
*/
const TriangleCanvas = React.createClass({
  getDefaultProps() {
    return {
      cellSize: Trianglify.defaults.cell_size,
      xColors: Trianglify.defaults.x_colors,
      yColors: Trianglify.defaults.cell_size,
    };
  },
  componentDidMount() {
    this.renderCanvas();
  },
  renderCanvas() {
    const canvas = document.getElementById('daCanvas');
    const pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      cell_size: this.props.cellSize,
      x_colors: this.props.xColors,
    });
    pattern.canvas(canvas);
  },
  render() {
    return (
      <div className="triangleCanvas">
        <canvas className="canvasCanvas" id="daCanvas" />
        <div className="canvasContent">
          {this.props.children}
        </div>
      </div>
    );
  },
});

module.exports = TriangleCanvas;
