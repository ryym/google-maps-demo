const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const buildings     = require('./routes/buildings');
const errorHandlers = require('./routes/errors');

/**
 * Configure and create app.
 */
module.exports = function createApp(PATH) {
  const app = express();
  const ENV = app.get('env') || 'development';

  // Set up views.
  app.set('views', PATH.views);
  app.set('view engine', 'jade');

  // Routings.
  app.use('/buildings', buildings);

  useMiddlewares(app)(
    // Log requests.
    logger('dev'),

    // Use parsers.
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    cookieParser(),

    // Serve static files.
    express.static(PATH.public),

    // Serve a favicon.
    favicon( path.join(PATH.images, 'favicon.ico') ),

    // Catch 404 and forward to error handler.
    (req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    },

    // Handle errors.
    errorHandlers.get(ENV)
  );

  return app;
}

function useMiddlewares(app) {
  return (...middlewares) => {
    middlewares.forEach(
      m => app.use(m)
    );
  }
}
