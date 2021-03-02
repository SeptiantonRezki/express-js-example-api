const { ObjectId } = require("bson")
const createError = require('http-errors');
const { Comment } = require('../models');


const postComment = (req, res, next) => {
    //1. data apa saja yang akan kita masukkan ke database

    /**
     * _id => sudah digenereted oleh mongoDB
     * userID => bisa kita dapatkan dari auth, sehingga user harus sertakan TOKEN saat commnet
     * movieId => req.params.id => yang ada di url-nya
     * text => req.body (kita membutuhkan text, yang dikirimkan dari req.body) 
     * createdAt => sudah ada pada model
     * modifiedAt => sudah ada pada model
    */

    // ObjectId ini merupkan sebuah _id khusus dari MongoDB, sehinnga _id tersebut akan di cek apakah valid dari MongoDB    
    if (!ObjectId.isValid(req.params.movieId)) {
        return next(createError(400)); //bad request
    }
    const error = Comment.validate(req.body['text']);
    if (error) {
        return next(error);
    }
    const commentData = { text: req.body['text'] };
    commentData.userId = new ObjectId(req.user['_id']);
    commentData.username = req.user['username'];
    commentData.movieId = new ObjectId(req.user['movieId']);

    const comment = new Comment(commentData);


    comment.save().then(() => {
        res.status(201).json({
            message: 'the comment has succesfully created '
        });
    }).catch((err) => {
        next(createError(500)); //internal server error
    })


}

const editComment = (req, res, next) => {
    if (!ObjectId.isValid(req.params.commentId)) {
        return next(createError(400)); //bad request
    }
    const commentId = new ObjectId(req.params.commentId);

    Comment.edit(commentId, req.body['text'])
        .then(() => {
            res.json({
                message: 'done',
            });
        })
        .catch((err) => {
            next(createError(500));//internal server error
        });
}

const deleteComment = (req, res, next) => {
    if (!ObjectId.isValid(req.params.commentId)) {
        return next(createError(400)); //bad request
    }
    const commentId = new ObjectId(req.params.commentId);


    Comment.delete(commentId)
        .then(() => {
            res.json({
                message: 'done',
            });
        })
        .catch((err) => {
            next(createError(500));//internal server error
        });
}
module.exports = {
    postComment,
    editComment,
    deleteComment
}