const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const db = require('../../db/db-config.js');

passport.use(new BasicStrategy(function(username, password, cb) {
  console.log('username is ', username)
  db.collection('apiUsers').get()
  .then(snapshot => {
    snapshot.forEach(user => {
      if (user.data().username === username) {
        return cb(null, user.data());
      }
    });
  });
}));

exports.userIsAuthenticated = passport.authenticate('basic', { session: false });