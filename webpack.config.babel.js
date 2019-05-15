import webpack from 'webpack';
import path from 'path';

module.exports = {
  entry: {
    FrontpageApp: './client/react/FrontpageApp.js',
    PanelDJ: './client/react/PanelDJ.js',
    PanelElrond: './client/react/PanelElrond.js',
    PanelFAQ: './client/react/PanelFAQ.js',
    PanelManager: './client/react/PanelManager.js',
    PanelShow: './client/react/PanelShow.js',
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
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'Vendors',
      filename: 'Vendors.js',
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
