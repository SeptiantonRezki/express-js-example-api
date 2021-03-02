const Joi = require('@hapi/joi');
const { dbCon } = require('../configuration');

class Comment {
    constructor(CommentData) {
        this.data = CommentData;
        this.data.createdAt = new Date();
        this.data.modifiedAt = new Date();
    };

    static validate(commentText) { // dari commentData => commnetText
        // kita menginkan commnet sebagai parameter dan method yang valid 
        // untuk mengatisipasi kerusakan pada sistem || impact negative for app performance, maka pada controllernya 
        const validation = Joi.string().max(300).validate(commentText); //dari CommentData['body'] => CommentData['text'] => => commnetText
        if (validation.error) {
            const error = new Error(validation.error.message);
            error.statusCode = 400;
            return error;
        };
        return null;
    }

    save() {
        return new Promise((res, rej) => {
            dbCon('comments', async (db) => {
                try {
                    await db.insertOne(this.data);
                    res();
                } catch (err) {
                    rej(err);
                }
            })
        })
    }
    static edit(commentId, text) {
        return new Promise((res, rej) => {
            dbCon('comments', async (db) => {
                try {
                    await db.updateOne({ _id: commentId }, { '$set': { text }, '$currentDate': { modifiedAt: true } });
                    res();
                } catch (err) {
                    rej(err);
                }
            });
        });
    }
    static delete(commentId) {
        return new Promise((res, rej) => {
            dbCon('comments', async (db) => {
                try {
                    await db.deleteOne({ _id: commentId });
                    res();
                } catch (err) {
                    rej(err);
                }
            });
        });
    }
}
module.exports = Comment;