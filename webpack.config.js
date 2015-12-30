const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'public')
};

module.exports = {
  entry: [
    path.join(PATH.src, 'index.jsx')
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: PATH.src,
        loaders: [
          'babel'
        ]
      }
    ]
  },

  output: {
    path: PATH.dist,
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: PATH.dist,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATH.src, 'index.html'),
      inject: 'body'
    })
  ]
}
