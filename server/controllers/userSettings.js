const db = require('../../db/db-config');
const Promise = require('bluebird');

// Shopping List Handlers

exports.createSettings = (username, data) => {
  console.log('Hit createSettings')
  console.log(username)
  return new Promise((resolve, reject) => {
    db.collection('userSettings').doc(username).set({
      emailNotificationSettings: data
    })
    .then(() => {
      resolve('Created settings for user ', username);
    })
    .catch(() => {
      reject('Failed to create settings for user ', username);
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
/*
exports.addSettings = (username, product) => {
  var items;
  return new Promise((resolve, reject) => {
    module.exports.getShoppingList(username)
    .then((shoppingListItems) => {
      items = shoppingListItems;
      items[product.id] = product;
      db.collection('shoppingLists').doc(username).set({
        items: items
      })
      .then(()=> {
        resolve(items);
      })
      .catch(() => {
        reject('Couldnt add item to shopping list');
      })
    })
    .catch(() => {
      module.exports.createShoppingList(username);
      resolve('No existing shopping list. Create shopping list. Try adding item again');
    })
  })
}

exports.removeSettings = (username, productId) => {
  var items;
  return new Promise((resolve, reject) => {
    module.exports.getShoppingList(username)
    .then((shoppingListItems) => {
      items = shoppingListItems;
      delete items[productId];
      db.collection('shoppingLists').doc(username).set({
        items: items
      })
      resolve(items);
    })
    .catch(() => {
      reject('no shopping list');
    })
  });
}

exports.updateShoppingList = (username, list) => {
  return new Promise((resolve, reject) => {
    db.collection('shoppingLists').doc(username).set({
      items: list
    })
    .then(() => {
      resolve('Shopping List Updated');
    })
    .catch(() => {
      reject('Did not save updated shopping list');
    })
  });
}*/