/**
 * Error handlers
 * Note:
 *  All handlers have to take four arguments
 *  to be recognized as an error handler.
 */
const handlers = {

  development(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  },

  production(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  }

};

export function get(env) {
  return handlers[env];
}
