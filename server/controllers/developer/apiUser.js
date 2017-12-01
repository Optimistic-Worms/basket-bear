const db = require('../../../db/db-config.js');
const encrypt = require('../../helpers/encryption.js');
const Promise = require('bluebird');

exports.addUser = (req, res) => {
  exports.findByEmail(req.body.email, (err, userRef, userData) => {
    if (userRef) {
      res.status(400).send(`An account with email: ${req.body.email} already exists`);
    } else {
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
  });
};

exports.findByEmail = (email, callback) => {
  db.collection('apiUsers').where('email', '==', email).get()
  .then(users => {
    if (users.docs.length) {
      for (let i = 0; i < users.docs.length; i++) {
        const userRef = users.docs[i];
        const userData = userRef.data();
        return callback(null, userRef, userData);
      }
    }
    return callback(`no account found for ${email}`)
  })
  .catch(err => callback(err));
};

exports.findByClientId = (clientId, callback) => {
  db.collection('apiUsers').doc(clientId).get()
  .then(clientRef => {
    const clientData = clientRef.data();
    callback(null, clientRef, clientData);
  })
  .catch(err => {
    callback('No clients found for ID: ' + clientId);
  });
};

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
};

exports.login = (req, res) => {
}

exports.logoutApiUser = (username) => {

}

exports.getProductData = (productObj) => {

}

exports.getMerchantData = () => {

}
