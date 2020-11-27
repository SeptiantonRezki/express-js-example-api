const { User } = require('../../models');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');

const logger = require('../../configuration/logger');
const getLogin = (req, res, next) => { //http://localhost:5000/auth/login
    logger.info("hello");
    res.send('Welcome to login page');
};

const postLogin = (req, res, next) => {
    User.login(req.body)
        .then(result => {
            if (result instanceof Error) {
                return next(result);
            }
            const secret = readFileSync('./private.key');
            const token = jwt.sign({ _id: result._id, username: result.username }, secret);

            res.json({token});
        })
};

module.exports = {
    getLogin,
    postLogin
};