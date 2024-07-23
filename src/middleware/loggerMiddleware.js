const logger = require('../utils/logger');

const loggerMiddleware = (req, res, next) => {
  logger.info('%s %s', req.method, req.url);
  next();
};

module.exports = loggerMiddleware;
