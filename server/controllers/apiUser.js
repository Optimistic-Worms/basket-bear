const db = require('../../db/db-config.js');
const encrypt = require('../helpers/encryption.js');
const Promise = require('bluebird');

exports.addUser = (req, res) => {
  encrypt.createHash(req.body.password)
  .then((hashed) => {
    db.collection('apiUsers').add({
      email: req.body.email,
      password: hashed,
    })
    .then(ref => {
      exports.generateNewClientSecret(ref.id)
      .then((secret) => {
        res.send(`added user with id: ${ref.id} and secret: ${secret}`);
      });
    })
    .catch(err => console.log(err));
  });
}

exports.generateNewClientSecret = (clientId) => {
  const secret = encrypt.generateSecret(24);
  return new Promise((resolve, reject) => {
    encrypt.createHash(secret)
    .then(hashed => {
      db.collection('apiUsers').doc(clientId).update({
        clientSecret: hashed
      })
      .then(() => {
        console.log('updated secret to: ', secret);
        resolve(secret);
      })
      .catch(err => reject(err));
    });
  });
};

exports.getNewClientSecret = (req, res) => {
  exports.generateNewClientSecret(req.user.id)
  .then(secret => res.json({clientSecret: secret}))
}

exports.login = (req, res) => {
  res.send(req.user.id);
}

exports.logoutApiUser = (username) => {

}

exports.getProductData = (productObj) => {

}

exports.getMerchantData = () => {

}

