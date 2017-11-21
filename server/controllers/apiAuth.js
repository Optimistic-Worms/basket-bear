const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const db = require('../../db/db-config.js');
const apiUserController = require('./apiUser.js');
const bcrypt = require('bcrypt-nodejs');

passport.use(new BasicStrategy((username, password, cb) => {
  console.log('username is ', username);
  db.collection('apiUsers').get()
    .then(users => {
      users.forEach(user => {
        const userObj = user.data();
        if (userObj.username === username) {
          console.log('user found')
          if (userObj.password === password) {
            return cb(null, user);
          } else {
            return cb('Password does not match', null);
          }
        }
      });
      cb('User not found', null);
    });
}));

exports.createHash = (string) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(5, (err, salt) => {
      bcrypt.hash(string, salt, null, (err, hash) => {
        if (err) {
          reject(err)
        }
        resolve(hash);
      });
    });
  });

}

exports.userIsAuthenticated = passport.authenticate('basic', {session: false});