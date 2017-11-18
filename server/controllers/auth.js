const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const db = require('../../db/db-config.js');

passport.use(new BasicStrategy(
  (username, password, callback) => {
    db.collection('apiUsers').where('username', '==', username).get()
    .then(snapshot => {
      console.log(snapshot)
    })
    .catch(err => console.log('cannot find user: ', username));
  })
);