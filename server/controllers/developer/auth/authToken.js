const db = require('../../../../db/db-config.js');
const encrypt = require('../../../helpers/encryption.js');

exports.addToDB = (clientId, token) => {
  db.collection('apiAuthTokens').add({
    value: token,
    user: 'test@test.com',
    clientId: clientId
  }).then(ref => console.log('Token added'));
};