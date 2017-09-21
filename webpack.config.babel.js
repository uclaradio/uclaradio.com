import webpack from 'webpack';
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
    path: path.join(__dirname, 'public', 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js[x]?/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
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
