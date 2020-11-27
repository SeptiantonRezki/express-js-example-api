// di mana untuk handle setiap function dari route tergantung kebutuhna route minta function yang mana
const { getLogin, postLogin } = require('./auth/login');
const { postSignUp } = require('./auth/signup');
const { getMovies, getOneMovie } = require('./movieC');

module.exports = {
    getLogin,
    postLogin,
    getMovies,
    getOneMovie,
    postSignUp,
};