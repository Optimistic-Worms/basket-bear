const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const db = require('../../db/db-config.js');

passport.use(new BasicStrategy(
  (username, password, callback) => {

  })
);