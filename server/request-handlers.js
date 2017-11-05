//Request Handlers


// Create a new shopping list when a new user is created
/*
var ShoppingList = {
  username : string
  items : array
}

var Product = {
  name
  image
  description
  merchant
  link
  listedPrice
  requestedPrice
}
*/
exports.createShoppingList = (req, res) => {
  res.send('you made a new shopping list');
}

exports.getShoppingList = (req, res) => {
  res.send('here is the shopping list');
}

exports.addItemToShoppingList = (req, res) => {
  res.send('adding item to shopping list');
}

exports.removeItemFromShoppingList = (req, res) => {
  res.send('removed item from shopping list');
}

