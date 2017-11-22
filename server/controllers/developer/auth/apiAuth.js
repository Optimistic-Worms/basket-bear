const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const db = require('../../../../db/db-config.js');
const encrypt = require('../../../helpers/encryption.js');

passport.use('clientBasic', new BasicStrategy((username, password, cb) => {
  console.log(username, password)
  db.collection('apiUsers').get()
  .then(users => {
    users.forEach((user) => {
      const userObj = user.data();
      if (userObj.email === username) {
        if (encrypt.verifyPasswordSync(password, userObj.password)) {
          return cb(null, user);
        } else {
          return cb('Password does not match', null)
        }
      }
    });
  })
  .catch(err => cb(err, null));
}));

passport.use('clientPassword', new ClientPasswordStrategy(function(clientId, clientSecret, done) {
  console.log('authenticating')
  done('test', 'authenticating')
  // db.collection('apiUsers').doc(clientId)
  // .then(user => {
  //   return cb(null, user);
  // })
  // .catch(err => cb(err, null));
}));


passport.use('accessToken', new BearerStrategy((accessToken, cb) => {
  db.collection('apiAuthTokens').get()
  .then(tokens => {
    tokens.forEach(token => {
      const tokenObj = token.data();
      if (tokenObj.value === accessToken) {
        db.collection('apiUsers').doc(tokenObj.clientId)
        .then(user => {
          return cb(null, user, {scope: '*'});
        })
        .catch(err => cb(err, null));
      }
    });
  })
  .catch(err => cb(err, null));
}));

exports.userIsAuthenticated = passport.authenticate('clientBasic', { session: false });