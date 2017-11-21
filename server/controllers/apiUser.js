const db = require('../../db/db-config.js');
const crypto = require('crypto');

//const auth = require('./auth.js')
const Promise = require('bluebird');

exports.addUser = (req, res) => {
  db.collection('apiUsers').add({
    email: req.body.email,
    password: req.body.passsword
  })
  .then(ref => {
    res.send('added user with id: ', ref.id)
  })
  .catch(err => reject(err));
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



exports.login = (req, res) => {
  res.send(req.user);
}

exports.logoutApiUser = (username) => {

}

exports.getProductData = (productObj) => {

}

exports.getMerchantData = () => {

}

