import path from 'path';

module.exports = {
  entry: {
    app: [
      './react/FrontpageApp.jsx',
      './react/panelDJ.jsx',
      './react/panelElrond.jsx',
      './react/panelFAQ.jsx',
      './react/panelManager.jsx',
      './react/panelShow.jsx',
      './react/staffingPoints.jsx',
    ],
    // vendors: ['react', 'react-bootstrap'],
  },
  output: {
    filename: '[name]',
    path: './public/build',
  },
};
