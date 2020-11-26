const { dbCon } = require('../configuration');
const { userValidator } = require('../validator');

class User {
    constructor(userData) {
        this.userData = { ...userData };
    };
    save(cb) {
        dbCon('users', async (db) => {
            try {
                await db.insertOne(this.userData);
                cb();
            } catch (error) {
                console.log("dijalnakan terlebih dahulu jika tidak error(SEPERTI PENULISANSALAH SINTAKS atau CODE ERROR) || PROSES I");
                cb(error);
            }
        });
    };

    checkExistence() {
        return new Promise((resolve, reject) => {
            dbCon('users', async (db) => {
                try {
                    const user = await db.findOne({ '$or': [{ username: this.userData['username'] }, { 'email': this.userData['email'] }] });
                    if (!user) {
                        resolve({
                            check: false
                        })
                    } else if (this.userData['username'] === user.username) {
                        resolve({
                            check: true,
                            message: 'this username is already in use'
                        })
                    } else if (this.userData['email'] === user.email) {
                        resolve({
                            check: true,
                            message: 'this email is already in use'
                        });
                    }
                } catch (err) {
                    reject(err);
                }

            });
        });
    }

    static validate(userData) {
        // const result = userValidator.validate(userData);
        // return result;
        // console.log(result);
        // console.log(result.error.message);
        return userValidator.validate(userData);
    }
};

module.exports = User;

// const user = new User({
//     username: 'anasSaber',
//     email: 'anas@example.com',
//     password: 'anas1234',
//     first_name: 'Anas',
//     last_name: 'Saber'
// });
// user.save();

// const userData = {
//     username: 'an',
//     email: 'anas@example.com',
//     password: 'Anas-1234',
//     first_name: 'Anas',
//     last_name: 'Saber'
// };
// const validation = User.validate(userData);
// User.validate(userData);

// const user = new User({
//     username: 'anassssSaber',
//     email: 'anasssSaber@example.com',
//     password: 'anas1234',
//     first_name: 'Anas',
//     last_name: 'Saber'
// });
// user.checkExistence()
// .then(check => {
//     console.log(check);
// })
// .catch(err => console.log(err));
// ;


// node .\models\User.js