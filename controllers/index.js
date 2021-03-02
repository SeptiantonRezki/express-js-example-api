// di mana untuk handle setiap function dari route tergantung kebutuhna route minta function yang mana
const { getLogin, postLogin } = require('./auth/login');
const { postSignUp } = require('./auth/signup');
const { getVerify } = require('./auth/veritification');

// movies
const { getMovies, getOneMovie } = require('./movieC');
// comments
const { postComment, editComment, deleteComment } = require('./commentC');

module.exports = {
    getLogin,
    postLogin,
    getMovies,
    getOneMovie,
    postSignUp,
    getVerify,
    postComment,
    editComment,
    deleteComment
};