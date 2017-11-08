// Shopping List Handlers

exports.createShoppingList = (req, res) => {
  res.status(200).send('you made a new shopping list');

  // requires request data : username
  // create shopping list object
  // add to shopping list collection in database
  // returns success confirmation
}

exports.getShoppingList = (req, res) => {
  res.status(200).send('here is the shopping list');

  // requires request data : username
  // query the shopping list collection in the database
  // returns the array of items in the shopping list
}

exports.addItemToShoppingList = (req, res) => {
  res.status(200).send('adding item to shopping list');

  // requires request data : username, product
  // query the shopping list collection in the database
  // get the shopping list's items array
  // push the new item to the array
  // return the array of items in the shopping list

}

exports.removeItemFromShoppingList = (req, res) => {
  res.status(200).send('removed item from shopping list');

  // requires request data : user's shopping list, product ID?
  // querty the shopping list collection in the database
  // get the shopping list's item array
  // remove the item from the array
  // return the array of items in the shopping list


}




/*  Planning what the shopping list and product objects should look like

var ShoppingList = {
  username: String,
  items: Array
}

var Product = {
  id: Number,
  name: String,
  imageUrl: String,
  description: String,
  merchant: String,
  link: String,
  listedPrice: Number,
  requestedPrice: Number
}

var productCollection = {


  }
}
*/

