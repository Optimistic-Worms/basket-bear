const Promise = require('bluebird');
const db = require('../../../../db/db-config.js');
const encrypt = require('../../../helpers/encryption.js');

exports.addToDb = (clientId, token, email) => {
  return new Promise((resolve, reject) => {
    db.collection('apiAuthTokens').add({
      value: token,
      user: email,
      clientId: clientId
    }).then(tokenRef => {
      console.log('Token added');
      resolve(tokenRef);
    })
    .catch(err => reject(err));
  });
};

exports.findByValue = (tokenValue, callback) => {
  db.collection('apiAuthTokens').get()
  .then(tokens => {
    if (tokens.docs.length) {
      for (let i = 0; i < tokens.docs.length; i++) {
        const tokenRef = tokens.docs[i];
        const tokenData = tokenRef.data();
        if (encrypt.verifyPasswordSync(tokenValue, tokenData.value)) {
          return callback(null, tokenRef, tokenData);
        }
      }
      return callback('no matching token found');
    } else {
      return callback('no matching token found');
    }
  })
  .catch((err) => callback('no matching token found'));
};