const { Router } = require('express');
const { getLogin, postSignUp, postLogin } = require('../controllers');

const router = Router();

router
    .get('/login', getLogin)
    .post('/login', postLogin)
    .get('/signup')
    .post('/signup', postSignUp)

module.exports = router;