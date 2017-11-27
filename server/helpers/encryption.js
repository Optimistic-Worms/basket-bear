const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const crypto = require('crypto');


exports.verifyPasswordSync = (string, hash) => {
  return bcrypt.compareSync(string, hash);
};

exports.createHash = (string) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(5, (err, salt) => {
      bcrypt.hash(string, salt, null, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

exports.generateSecret = (len) => {
  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
};