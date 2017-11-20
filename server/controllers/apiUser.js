const db = require('../../db/db-config.js');
//const auth = require('./auth.js')
const Promise = require('bluebird');

exports.addApiUser = (username, password) => {
  return new Promise((resolve, reject) => {
    db.collection('apiUsers').add({
      username: username,
      password: password
    })
    .then(ref => resolve(ref))
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

}



exports.loginApiUser = (username, password) => {

}

exports.logoutApiUser = (username) => {

}

exports.getProductData = (productObj) => {

}

exports.getMerchantData = () => {
cd
}

