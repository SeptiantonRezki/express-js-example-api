const morgan = require('morgan');
const { logger } = require('../configuration');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handler'); //untuk menghandle tampilan website


module.exports = {

    middleware: (app) => {
        app.use(morgan('combined', { stream: logger.stream })); // develop => dev && production =>combined
        app.use(express.json());
        // Body Parser Middleware
        // app.use(bodyParser.urlencoded({ extended: false }));
        // app.use(bodyParser.json());
        // View engine setup
        // app.engine('handlebars', exphbs());
        // app.set('view engine', 'handlebars');

    },

    auth: require('./auth')
} 