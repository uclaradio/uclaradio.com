import webpack from 'webpack';
import path from 'path';

module.exports = {
  entry: {
    FrontpageApp: './client/react/FrontpageApp.jsx',
    panelDJ: './client/react/panelDJ.jsx',
    panelElrond: './client/react/panelElrond.jsx',
    panelFAQ: './client/react/panelFAQ.jsx',
    panelManager: './client/react/panelManager.jsx',
    panelShow: './client/react/panelShow.jsx',
    staffingPoints: './client/react/staffingPoints.jsx',
    // vendors: ['react', 'react-bootstrap'],
  },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'client', 'public', 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.json/,
        loader: 'json',
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js',
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
