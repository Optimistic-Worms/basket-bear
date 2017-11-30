const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const db = require('../../../../db/db-config.js');
const encrypt = require('../../../helpers/encryption.js');
const apiUser = require('../apiUser.js');
const authToken = require('./authToken.js');

//for the Budget Basket client API User signup and login routes
passport.use('userBasic', new BasicStrategy((email, password, cb) => {
  apiUser.findByEmail(email, (err, userRef, userData) => {
    if (err) {
      return cb(err);
    }
    if (encrypt.verifyPasswordSync(password, userData.password)) {
      return cb(null, userRef);
    } else {
      return cb('passwords do not match')
    }
  });
}));

//for business API clients providing a client Id and secret in exhange for an ouath token
passport.use('clientBasic', new BasicStrategy((clientId, clientSecret, cb) => {
  apiUser.findByClientId(clientId, (err, clientRef, clientData) => {
    if (err) {
      return cb(err);
    }
    if (encrypt.verifyPasswordSync(clientSecret, clientData.clientSecret)) {
      return cb(null, clientRef);
    } else {
    return cb('client secrets do not match')
    }
  });
}));

//for token verification after successful client credentials grant
passport.use('accessToken', new BearerStrategy((accessToken, cb) => {
  authToken.findByValue(accessToken, (err, tokenRef, tokenData) => {
    if (err) {
      return cb(err);
    }
    apiUser.findByClientId(tokenData.clientId, (err, clientRef, clientData) => {
      if (err) {
        return cb(err);
      }
      console.log('granting access')
      return cb(null, clientRef, {scope: '*'});
    });
  });
}));

//Expanded passport middleware to provide access to the response for custom error handling
exports.authenticateUser = (req, res, next) => {
  passport.authenticate('userBasic', {session: false}, (err, user, info) => {
    if (err) {
      console.log('error: ', err)
     res.send(err);
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
  //using an IIFE to modify the response for a passport auth error to send the error data passed from DB or auth controllers
  //ex: 'passwords do not match'
};

exports.authenticateClient = (req, res, next) => {
  passport.authenticate('clientBasic', {session: false}, (err, user, info) => {
    if (err) {
      console.log('error: ', err)
      res.status(401).json(err);
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};

exports.authenticateToken = (req, res, next) => {
  passport.authenticate('accessToken', {session: false}, (err, user, info) => {
      if (err) {
        console.log('error: ', err)
        res.send(err);
      } else {
        req.user = user;
        next();
      }
    })(req, res, next);
};