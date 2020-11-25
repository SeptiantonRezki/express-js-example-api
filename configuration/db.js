const { MongoClient } = require('mongodb');

const _uri = 'mongodb+srv://septiantonRezki:septian16@projekexamplea.jwtpv.mongodb.net/sample_mflix?retryWrites=true&w=majority';
const dbCon = (coll, cb) => {
    MongoClient.connect(_uri)
    .then(async client => {
        const db = client.db('sample_mflix').collection(coll);
        await cb(db);
        client.close();
    });
};

// dbCon('movies', async (db) => {
//     const movie = await db.findOne();
//     console.log(movie);
// })

module.exports= dbCon;

