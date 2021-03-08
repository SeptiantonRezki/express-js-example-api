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
            dbCon('comments', async (db, db2) => {
                try {
                    const comment = await db.insertOne(this.data);
                    // untuk mendapatkan id dari data yang baru dimasukkan maka harus dimasukkan dalam sebuah variabel terlebih dahulu
                    this.data['id'] = comment.insertedId;
                    await db2.updateOne({ _id: this.data['movieId'] }, {
                        '$push': {
                            comments: {
                                '$each': [{ _id: this.data['id'], username: this.data['username'], text: this.data['text'] }],
                                '$slice': -10
                            }
                        }
                    }
                    )
                    //slice digunakan mengurutkan jika -10, maka limit yang di baca hanya 10 saja dan jika - maka yang ditampilkan adalah data yang terbaru
                    /**
                     * setelah insert check di collection movies => ada tambahan field comment, check id dan copy
                     * pindah collection ke comment cari id commnet sesuai yang sudah di copy
                     */
                    res();
                } catch (err) {
                    rej(err);
                }
            }, 'movies'); //disini menggunakan collection ke-2
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