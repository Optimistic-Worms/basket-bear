const db = require('../../db/db-config');
const Promise = require('bluebird');

// Shopping List Handlers

exports.createShoppingList = (username) => {
  return new Promise((resolve, reject) => {
    db.collection('shoppingLists').doc(username).set({
      items: {}
    })
    .then(() => {
      resolve('Created shopping list for user ', username);
    })
    .catch(() => {
      reject('Did not create shopping list for user ', username);
    });
  });
}

exports.getShoppingList = (username) => {
  return new Promise((resolve, reject) => {
    db.collection('shoppingLists').doc(username).get()
    .then((doc) => {
      resolve(doc.data().items);
    })
    .catch(() => {
      reject('no shopping list')
    });
  })
}

exports.addItemToShoppingList = (username, product) => {
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

exports.removeItemFromShoppingList = (username, productId) => {
  var items;
  return new Promise((resolve, reject) => {
    module.exports.getShoppingList(username)
    .then((shoppingListItems) => {
      items = shoppingListItems;
      delete items.productId;
      resolve(items);
    })
    .catch(() => {
      reject('no shopping list');
    })
  });
}

