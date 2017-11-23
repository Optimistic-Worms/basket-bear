const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const db = require('../../../../db/db-config.js');
const encrypt = require('../../../helpers/encryption.js');

passport.use('clientBasic', new BasicStrategy((clientId, clientSecret, cb) => {
  console.log('authenticating by clientId', clientId)
  db.collection('apiUsers').get()
    .then(users => {
      users.forEach((user) => {
        const userObj = user.data();
        if (user.id === clientId) {
          if (encrypt.verifyPasswordSync(clientSecret, userObj.password)) {
            console.log('passwords match')
            return cb(null, user);
          } else {
             console.log('passwords do not match')
            return cb('Password does not match', null)
          }
        }
      });
    })
}));

passport.use('accessToken', new BearerStrategy((accessToken, cb) => {
  console.log(accessToken)
  db.collection('apiAuthTokens').get()
  .then(tokens => {
    tokens.forEach(token => {
      const tokenObj = token.data();
      if (tokenObj.value === accessToken) {
        db.collection('apiUsers').get()
        .then(users => {
          users.forEach(user => {
            //const userObj = user.data();
            if (user.id === tokenObj.clientId) {
              console.log('granting access')
              cb(null, user, {scope: '*'});
            }
          });
        })
        .catch(err => cb(err, null));
      }
    });
  })
}));

exports.userIsAuthenticated = passport.authenticate('clientBasic', { session: false });
exports.clientIsAuthenticated = passport.authenticate('accessToken', { session: false });
