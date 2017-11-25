const oauth2orize = require('oauth2orize');
const passport = require('passport');
const db = require('../../../../db/db-config.js');
const encrypt = require('../../../helpers/encryption.js');
const authToken = require('./authToken.js');

const authServer = oauth2orize.createServer();

authServer.exchange(oauth2orize.exchange.clientCredentials((client, scope, cb) => {
  const token = encrypt.generateSecret(256);
  encrypt.createHash(token)
  .then(hash => {
    authToken.addToDb(client.id, hash, client.data().email)
    .then(tokenRef => {
      cb(null, token, {expires_in: 1800});
    })
    .catch(err => cb(err));
  });
}));

exports.server = authServer;