// Shopping List Handlers

exports.createShoppingList = (req, res) => {
  res.status(200).send('you made a new shopping list');
}

exports.getShoppingList = (req, res) => {
  res.status(200).send('here is the shopping list');
}

exports.addItemToShoppingList = (req, res) => {
  res.status(200).send('adding item to shopping list');
}

exports.removeItemFromShoppingList = (req, res) => {
  res.status(200).send('removed item from shopping list');
}




/*  Planning what the shopping list and product objects should look like

var ShoppingList = {
  username: String,
  items: Array
}

var Product = {
  name: String,
  imageUrl: String,
  description: String,
  merchant: String,
  link: String,
  listedPrice: Number,
  requestedPrice: Number
}
*/

