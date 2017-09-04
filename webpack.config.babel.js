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
  loaders: [
    {
      test: /\.js[x]?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react'],
      },
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    },
    {
      test: /\.json$/,
      loader: 'json',
    },
  ],
  output: {
    filename: '[name]',
    path: './public/build',
  },
};
