import webpack from 'webpack';
import path from 'path';

module.exports = {
  entry: {
    FrontpageApp: './client/react/FrontpageApp.js',
    panelDJ: './client/react/panelDJ.js',
    panelElrond: './client/react/panelElrond.js',
    panelFAQ: './client/react/panelFAQ.js',
    panelManager: './client/react/panelManager.js',
    panelShow: './client/react/panelShow.js',
    // staffingPoints: './client/react/staffingPoints.js',
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
