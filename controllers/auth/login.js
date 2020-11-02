const logger = require('../../configuration/logger');

module.exports.getLogin =  (req, res, next) => { //http://localhost:5000/auth/login
    logger.info("hello");
    res.send('Welcome to login page');
};