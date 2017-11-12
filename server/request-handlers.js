// Shopping List Handlers

exports.createShoppingList = (username) => {
  var shoppingList = {};
  // create shopping list object
  // add to shopping list collection in database
  // returns success confirmation
  console.log('username:', username);
  return 'Created Shopping List';
}

exports.getShoppingList = (username) => {
  var items = [];
  // query the shopping list collection in the database
  // returns the array of items in the shopping list
  console.log('username:', username);
  return items;
}

exports.addItemToShoppingList = (username, product) => {
  var items = [];
  // query the shopping list collection in the database
  // get the shopping list's items array
  // push the new item to the array
  // return the array of items in the shopping list
  console.log('username:', username);
  console.log('product:', product);
  return items;
}

exports.removeItemFromShoppingList = (username, productId) => {
  var items = [];
  // querty the shopping list collection in the database
  // get the shopping list's item array
  // remove the item from the array
  // return the array of items in the shopping list
  console.log('username:', username);
  console.log('productid:', productId);
  return items;
}




/*  Planning what the shopping list and product objects should look like

var ShoppingList = {
  username: String,
  items: Array of Tuplse [Product Id, Requested Price]
}

var Product = {
  id: Number,
  name: String,
  imageUrl: String,
  description: String,
  merchant: String,
  link: String,
  priceHistory: Array,
  userPricing: Array of tuples [user, price]
}

var productCollection = {


  }
}
*/

