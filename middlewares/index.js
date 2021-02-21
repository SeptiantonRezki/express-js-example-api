const morgan = require('morgan');
const { logger } = require('../configuration');
const express = require('express');


module.exports = {

    middleware: (app) => {
        app.use(morgan('combined', { stream: logger.stream })); // develop => dev && production =>combined
        app.use(express.json());
    },
    auth:require('./auth')
} 