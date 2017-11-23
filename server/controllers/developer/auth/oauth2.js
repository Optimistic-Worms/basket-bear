const oauth2orize = require('oauth2orize');
const passport = require('passport');
const db = require('../../../../db/db-config.js');
const encrypt = require('../../../helpers/encryption.js');

const authServer = oauth2orize.createServer();

authServer.exchange(oauth2orize.exchange.clientCredentials((client, scope, cb) => {
  console.log('exchanging')
  const token = encrypt.generateClientSecret(256);
  cb(null, token, {expires_in: 1800})
  // db.collection('apiAuthTokens').add({
  //   value: token,
  //   clientId: client.clientId
  // }).then(ref => {
  //   cb(null, token, {expires_in: 1800})
  //   console.log('Token added');
  // });
}));

exports.token = [
  passport.authenticate('clientBasic', {session: false}),
  authServer.token(),
  authServer.errorHandler()
];