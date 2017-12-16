const db = require('../../db/db-config');
const Promise = require('bluebird');

// Shopping List Handlers

exports.createSettings = (username, data = []) => {
  console.log('Hit createSettings')
  console.log(username)

  return new Promise((resolve, reject) => {
    db.collection('userSettings').doc(username).set({
      emailNotificationSettings: data
    })
    .then(() => {
      resolve("We updated your changes", username);
    })
    .catch(() => {
      reject("We couldn't update your changes please try again later", username);
    });
  });
}

exports.getSettings = (username) => {
  return new Promise((resolve, reject) => {
    db.collection('userSettings').doc(username).get()
    .then((doc) => {
      resolve(doc.data().emailNotificationSettings);
    })
    .catch(() => {
      module.exports.createSettings(username);
      console.log('no email list')
      reject({});
    });
  })
}