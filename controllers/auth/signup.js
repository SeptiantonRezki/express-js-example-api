const { User } = require('../../models');
const createError = require('http-errors');
const { email } = require('../../configuration');
const jwt = require('jsonwebtoken');
const {readFileSync} = require('fs');


const secret = readFileSync('./private.key');
    

const postSignUp = (req, res, next) => {
    const validation = User.validate(req.body);
    if (validation.error) {
        const error = new Error(validation.error.message);
        error.statusCode = 400;
        return next(error);
    }
    // check existence
    const user = new User(req.body);
    user.checkExistence()
        .then(result => {
            if (result.check) {
                const error = new Error(result.message);
                error.statusCode = 409;
                return next(error);
            }
        })
        .catch(err => next(createError(500)));

    user.save((err) => {

        if (err){
            console.log("ini baru dijalankan setelah callback dipanggil || PROSES 2")
            return next(createError(500));
        }
        // kirim message ke gmail/email
        const token = jwt.sign({username: user.userData['username']}, secret, {
            expiresIn : '24h'
        });
        // configuration dari email message
        email(user.userData['email'], user.userData['username'], token);
        // 
        res.status(200).send({
            message: 'User has been successfully created'
        });
    });
};

module.exports = { postSignUp };