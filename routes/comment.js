const { Router } = require('express');
const router = Router();

// function yang digunakan dari controller
const { postComment, editComment, deleteComment, getComments } = require('../controllers');


// untuk mendapatkan _id dan username
// dan tidak seoranpun nantinya bisa menambahkan komen, sehingga tidak bisa merusak apps kita
const { auth } = require('../middlewares');


router
.get('/getComments/:movieId/:page', auth, getComments)
.post('/createComment/:movieId', auth, postComment)
.put('/editComment/:commentId', auth,  editComment)
.delete('/deleteComment/:commentId', auth, deleteComment)

// cara menambahkan komen /** */ => buat "/" kemudian buat "*" dua kali otomatis membuat komen tersebut

/**
 * test comment post
 * 1. dapatkan idmovie => menggukanan halaman => movies/4 
 * 2. tambahkan komen => create-comment/movieId/ => json body => isikan comment => {"text" : "a comment"}
 * 3. autohiration => barrier token => masukkan token yang telah kita generate dari => auth/login
 * 4. mongodb comppas => {text : "a comment"}
 * test error
 * tanpa authorization/tanpa movieId/ body[text] || req.body['text'] => number
 */
/**
 * edit comment
 * barrier token
 * body => raw => json => {"text" : "edit text"}
 * type PUT route
 * http://localhost:5000/edit-comment/603e120c96b303327ce4a88a
 */
/**
 * delete comment
 * barrier token
 * type delete route
 * http://localhost:5000/delete-comment/603e120c96b303327ce4a88a
 */


module.exports = router;