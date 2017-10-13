import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import path from 'path';

module.exports = {
  entry: {
    FrontpageApp: './client/react/FrontpageApp.js',
    panelDJ: './client/react/panelDJ.js',
    panelElrond: './client/react/panelElrond.js',
    panelFAQ: './client/react/panelFAQ.js',
    panelManager: './client/react/panelManager.js',
    panelShow: './client/react/panelShow.js',
    staffingPoints: './client/react/staffingPoints.js',
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
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.css/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
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
