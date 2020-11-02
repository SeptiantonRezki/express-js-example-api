const express = require('express');
const app = express();


app.get(('/'),(req, res, next) => {
    // res.send('Welcome to the hompage');
    // res.status(200).send('Welcome to the hompage'); => statis 200 succes 400 error 500 internal server error
    res.json({
        message : "welcome to homepe"
    });
    res.redirect('/user');
});
app.get('/user', (req, res, next) => {
    res.send('Welcome to user page');
})


module.exports = app;