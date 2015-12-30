/**
 * Convert all subsequent modules using Babel.
 */
require('babel-core/register')();

const path = require('path');
const app  = require('./src/server/app');

const PATH = {
  public: path.join(__dirname, 'public'),
  images: path.join(__dirname, 'public', 'images'),
  views:  path.join(__dirname, 'views')
};

module.exports = app(PATH);
