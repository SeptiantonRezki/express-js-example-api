const { Router } = require('express');
const router = Router();

// function yang digunakan dari controller
const { postComment } = require('../controllers');


// untuk mendapatkan _id dan username
// dan tidak seoranpun nantinya bisa menambahkan komen, sehingga tidak bisa merusak apps kita
const { auth } = require('../middlewares');


router
.post('/createComment/:movieId', auth, postComment);

// cara menambahkan komen /** */ => buat "/" kemudian buat "*" dua kali otomatis membuat komen tersebut

/**
 * test comment post
 * 1. dapatkan idmovie => menggukanan halaman => movies/4 
 * 2. tambahkan komen => createComment/movieId/ => json body => isikan comment => {"text" : "a comment"}
 * 3. autohiration => barrier token => masukkan token yang telah kita generate dari => auth/login
 * 4. mongodb comppas => {text : "a comment"}
 * test error
 * tanpa authorization/tanpa movieId/ body[text] || req.body['text'] => number
 */


module.exports = router;