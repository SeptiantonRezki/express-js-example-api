const { Router } = require('express');
const { getLogin, postSignUp, postLogin, getVerify } = require('../controllers');

const router = Router();

router
    .get('/login', getLogin)
    .post('/login', postLogin)
    .get('/signup')
    .post('/signup', postSignUp)
    .get('/verify', getVerify) //buat user baru yang baru mendafatar, harus memvalidasi akun terlebih dahulu memalui email yang dikirimkan

module.exports = router;