const express = require('express');
const { logger } = require('./configuration');
const createError = require('http-errors');
const { middleware } = require('./middlewares');
const app = express();
const path = require('path');
const routes = require('./routes');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// middleware
middleware(app);

// routes
routes(app);

// untuk logger
process.on('unhandledRejection', (reason) => {
    logger.error(reason);
    process.exit(1);
});

// handle error menggunkan http-errors
app.use((req, res, next) => {
    const error = createError(404);
    next(error);
    // console.log(error.message);
    // res.status(error.statusCode).send(error.message);
});

// semua error next akan dihandle disini => dilanjutkan dari atasnya
app.use((error, req, res, next) => {
    logger.error(error.message);
    res.statusCode = error.statusCode || 500;

    res.json({
        message: error.message
    })
})

module.exports = app;