const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');

module.exports = (req, res, next) => {
    // in Authorization, kemudian pilih barier token, masukkan token jwt kamu
    if (!req.get('Authorization')) {
        return next(createError(401));
    }
    const token = req.get('Authorization').split(' ')[1];
    const secret = readFileSync('./private.key');

    try {
        const decode = jwt.verify(token, secret);
        req.user = { _id: decode._id, username: decode.username };
        next();
    } catch (error) {
        next(createError(401));
    }

} 