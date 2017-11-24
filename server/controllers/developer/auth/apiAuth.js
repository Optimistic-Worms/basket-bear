const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const db = require('../../../../db/db-config.js');
const encrypt = require('../../../helpers/encryption.js');

passport.use('userBasic', new BasicStrategy((email, password, cb) => {
  console.log('authenticating by email', email)
  db.collection('apiUsers').get()
    .then(users => {
      for (let i = 0; i < users.docs.length; i++) {
        const userRef = users.docs[i];
        const userData = userRef.data();
        if (userData.email === email) {
          if (encrypt.verifyPasswordSync(password, userData.password)) {
            console.log('passwords match')
            return cb(null, users.docs[i]);
          } else {
            console.log('passwords do not match')
            return cb('passwords do not match')
          }
        }
      }
      console.log('No matching user found')
      return cb('No matching user found for: ' + email);
  })
}));


passport.use('clientBasic', new BasicStrategy((clientId, clientSecret, cb) => {
  console.log('authenticating by clientId', clientId)
  db.collection('apiUsers').get()
    .then(users => {
      users.forEach((user) => {
        const userObj = user.data();
         console.log(user.id, clientId)
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

exports.authenticateUser = (req, res, next) => {
  passport.authenticate('userBasic', {session: false}, (err, user, info) => {
    if (err) {
      res.send(err);
    }
    req.user = user;
    next();
  })(req, res, next);
};

exports.clientIsAuthenticated = passport.authenticate('accessToken', { session: false });
