/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'source-map',

  entry: {
    bundle: './src/main.js',
    serviceWorker: './serviceWorker.js',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
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
