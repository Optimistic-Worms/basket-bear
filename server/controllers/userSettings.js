const db = require('../../db/db-config');


// Shopping List Handlers

exports.createSettings = (username, data = []) => {
  
  return new Promise((resolve, reject) => {
    db.collection('userSettings').doc(username).update({
      emailNotificationSettings: data,
    })
    .then(() => {
      resolve("We updated your changes");
    })
    .catch(error => {
      let message = error.Error;
      if(message = 'no entity to update:') {
      db.collection('userSettings').doc(username).set({
      emailNotificationSettings: data,
    }).then(() => {
      resolve('We update your changes')
    }).catch(error =>{
      reject('Something went wrong please try again')
    })
    } else {
      reject(error.Error);
    }
    });
  });
}

exports.addSubscriptionToDb = (username, data) => {
  return new Promise((resolve, reject) => {
    db.collection('userSettings').doc(username).update(data)
    .then((result) => {
      resolve(console.log(result))
    }).catch(error => {
      reject(console.log(error))
    })
  })
}

exports.removeSubscriptionFromDb = (username, data) => {
  var FieldValue = require("firebase-admin").firestore.FieldValue;
  return new Promise((resolve, reject) => {
  let obj = {}  
  let name = Object.keys(data)[0];
  obj[name] = FieldValue.delete()    
  db.collection('userSettings').doc(username).update(obj)
  .then((result) => {
      resolve(console.log(result))
    }).catch(error => {
      reject(console.log(error))
    })
  })
}

exports.getSubscriptionsFromDB = (username) => {
  return new Promise((resolve, reject) => {
    db.collection('userSettings').doc(username).get()
    .then((doc) => {
      delete doc.data().emailNotificationSettings
      resolve(doc.data());
    })
    .catch((error) => {
      console.log(error)
      console.log('no registered push endpoints')
      reject(error);
    });
  })





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