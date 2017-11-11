var admin = require("firebase-admin");

var serviceAccount = require('./bbasket-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bbasket-9e24a.firebaseio.com"
});

var db = admin.firestore();


module.exports = db;