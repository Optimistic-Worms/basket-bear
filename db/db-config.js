if (process.env.NODE_ENV !== 'test') {
  const admin = require("firebase-admin");

  let serviceAccount = JSON.parse(process.env.FIREBASE_DB);
  serviceAccount.private_key = `-----BEGIN PRIVATE KEY-----\n${process.env.FIREBASE_PRIVATE_KEY}\n-----END PRIVATE KEY-----\n`

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bbasket-9e24a.firebaseio.com"
  });


  const db = admin.firestore();

  module.exports = db;
};
