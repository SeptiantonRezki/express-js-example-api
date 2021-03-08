const { MongoClient } = require('mongodb');

const _uri = process.env.MONGODB_URI;

// disini kita bisa menggunakan 2 collection
const dbCon = (coll, cb, coll2) => {
    MongoClient.connect(_uri)
    .then(async client => {

        const db = client.db('sample_mflix').collection(coll);
        let db2; // hal ini untuk mencegah apabila config tetapi hanya memakai satu collection saja, sehingga tdak merusak sistem 
        if(coll2){
            db2 = client.db('sample_mflix').collection(coll2);
        }
        await cb(db, db2);
        client.close();
    });
};

// dbCon('movies', async (db) => {
//     const movie = await db.findOne();
//     console.log(movie);
// })

module.exports= dbCon;

