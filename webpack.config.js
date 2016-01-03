const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATH = {
  src:  path.join(__dirname, 'src', 'client'),
  dist: path.join(__dirname, 'public'),
  mdl:  path.join(__dirname, 'node_modules', 'material-design-lite')
};

module.exports = {
  entry: {
    app: PATH.src,
    mdl: path.join(PATH.mdl, 'material.js')
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      $mdl: 'material-design-lite'
    }
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: PATH.src,
        loaders: [
          'babel'
        ]
      },

      {
        test: /\.scss$/,
        include: PATH.src,
        loader: ExtractTextPlugin.extract(
          'style', [
            'css',
            'autoprefixer?browsers=last 2 versions',
            'sass'
        ])
      },

      { /* material-design-lite */
        test: /\.css$/,
        include: PATH.mdl,
        loader: ExtractTextPlugin.extract(
          'style',
          'css'
        )
      }
    ]
  },

  output: {
    path: PATH.dist,
    publicPath: '/',
    filename: '[name].js'
  },

  devServer: {
    contentBase: PATH.dist,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATH.src, 'index.html'),
      inject: 'body'
    }),

    new ExtractTextPlugin('styles.css')
  ]
}
