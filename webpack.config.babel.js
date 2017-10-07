import webpack from 'webpack';
import path from 'path';

module.exports = {
  entry: {
    FrontpageApp: './react/FrontpageApp.js',
    panelDJ: './react/panelDJ.js',
    panelElrond: './react/panelElrond.js',
    panelFAQ: './react/panelFAQ.js',
    panelManager: './react/panelManager.js',
    panelShow: './react/panelShow.js',
    staffingPoints: './react/staffingPoints.js',
    // vendors: ['react', 'react-bootstrap'],
  },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'public', 'build'),
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
