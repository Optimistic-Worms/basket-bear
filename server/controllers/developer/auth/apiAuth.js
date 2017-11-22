const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const db = require('../../../../db/db-config.js');
const encrypt = require('../../../helpers/encryption.js');

passport.use(new BasicStrategy(function(username, password, cb) {
  db.collection('apiUsers').get()
  .then(snapshot => {
    snapshot.forEach(user => {
      const userObj = user.data();
      if (userObj.email === username) {
        encrypt.verifyPassword(password, userObj.password)
        .then(() => cb(null, user))
        .catch(err => cb(err, null))
      }
    });
  });
}));

exports.userIsAuthenticated = passport.authenticate('basic', { session: false });



