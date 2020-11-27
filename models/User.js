const { dbCon } = require('../configuration');
const { userValidator, logSchema } = require('../validator');
const { hashSync, compareSync } = require('bcryptjs');

class User {
    constructor(userData) {
        this.userData = { ...userData };
    };
    save(cb) {
        dbCon('users', async (db) => {
            try {
                const hashedPass = hashSync(this.userData['password'], 12);
                this.userData['password'] = hashedPass;
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

    static login(userData) {
        return new Promise((resolve, reject) => {
            // validation
            const validation = logSchema.validate(userData);
            if (validation.error) {
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return resolve(error);
            }

            dbCon('users', async (db) => {
                try {
                    // find user
                    const user = await db.findOne({ '$or': [{ username: userData['username'] }, { email: userData['username'] }] }, {projection:{username: 1,  password: 1}});

                    // console.log(user);
                    
                    if (!user || !compareSync(userData['password'], user.password)) {
                        const error = new Error('Please enter valid username and password');
                        error.statusCode = 404;
                        return resolve(error);
                    }
                    resolve(user);
                } catch (err) {
                    reject(err);
                }
            })
        });
    }
}
// User.login({
//     username: 'anas31',
//     password: 'Anas-1234'
// })
//     .then(res => {
//         console.log(res);
//     });

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