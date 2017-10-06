import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import path from 'path';

module.exports = {
  entry: {
    FrontpageApp: './react/FrontpageApp.jsx',
    panelDJ: './react/panelDJ.jsx',
    panelElrond: './react/panelElrond.jsx',
    panelFAQ: './react/panelFAQ.jsx',
    panelManager: './react/panelManager.jsx',
    panelShow: './react/panelShow.jsx',
    staffingPoints: './react/staffingPoints.jsx',
    // vendors: ['react', 'react-bootstrap'],
  },
  output: {
    filename: '[name].min.js',
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
