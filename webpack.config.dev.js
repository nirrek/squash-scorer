/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval-source-map',

  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      './src/main.js',
    ],
    serviceWorker: './serviceWorker.js',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'serviceWorker.js'),
        ],
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        loaders: ['svg-inline-loader'],
      },
    ],
  },
};
