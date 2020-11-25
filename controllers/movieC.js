const { dbCon } = require('../configuration');
const { ObjectId } = require('bson');
const createError = require('http-errors');

const getMovies = (req, res, next) => {
    const pageNum = parseInt(req.params.page);

    if (isNaN(pageNum)) {
        return next(createError(400));
        // return res.status(400).send('bad request');
    }

    const movieToSkip = (pageNum - 1) * 10;
    dbCon('movies', async (db) => {
        try {
            const movies = await db.find({}).skip(movieToSkip).limit(10).toArray();
            res.json(movies);
        } catch (err) {
            next(createError(500));
            // res.status(500).send('Internal Server Error');
        }
    });
};

const getOneMovie = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        // return res.status(400).send('bad request');
        return next(createError(400));
    }
    const _id = new ObjectId(req.params.id);
    dbCon('movies', async (db) => {
        try {
            const movie = await db.findOne({ _id });
            if (!movie) {
               return  next(createError(404));
                // return res.status(404).send('Not Found');
            }
            res.json(movie);
        } catch (err) {
            return next(createError(500));
            // return res.status(500).send('Internal Server Error');
        }


    });
};

module.exports = {
    getMovies,
    getOneMovie
};