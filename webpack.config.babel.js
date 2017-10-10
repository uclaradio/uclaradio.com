import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
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
