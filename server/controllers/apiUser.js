const db = require('../../db/db-config.js');
const crypto = require('crypto');

//const auth = require('./auth.js')
const Promise = require('bluebird');

exports.addApiUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.collection('apiUsers').add({
      user_id: userId
    })
    .then(ref => {
      exports.createClientSecret(ref.id)
      .then((secret) => resolve(secret));
    })
    .catch(err => reject(err));
  });
}


exports.checkApiUser = (username, password) => {
  const user = db.collection('apiUsers').where('username', '==', username).get().then(user => console.log(user))

}

exports.createClientSecret = (clientId) => {
  const randomValueHex = (len) => {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0, len);   // return required number of characters
  };

  return new Promise((resolve, reject) => {
    var apiUser = db.collection('apiUsers').doc(clientId)
    var secret = randomValueHex(24);
    apiUser.update({
      client_secret: secret
    })
    .then(doc => {
      resolve(secret);
    })
    .catch(err => reject(err));
  });
}



exports.loginApiUser = (username, password) => {

}

exports.logoutApiUser = (username) => {

}

exports.getProductData = (productObj) => {

}

exports.getMerchantData = () => {

}

