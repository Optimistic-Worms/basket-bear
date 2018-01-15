const express = require('express');

const {
  createShoppingList,
  getShoppingList,
  addItemToShoppingList,
  removeItemFromShoppingList,
  updateShoppingList,
  updateWatchPrice,
 } = require('../controllers/shoppingList');

const { addNewUserData } = require('../controllers/product');

const { isAuthenticated } = require('../controllers/authroutes.js');

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Shopping List Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

const shoppingListRoutes = express.Router();

shoppingListRoutes.post('/', isAuthenticated, (req, res) => {
  var username = req.username;
  createShoppingList(username)
  .then((data) => {
    res.status(200).send(data);
  });
});

shoppingListRoutes.get('/', isAuthenticated, (req, res) => {
  var username = req.username;
  getShoppingList(username)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(401).send(data);
  })
});

shoppingListRoutes.put('/', isAuthenticated, (req, res) => {
  var username = req.username;
  var product = req.body.product;
  addItemToShoppingList(username, product)
  .then((data) => {
    addNewUserData(product, username);
    res.status(200).send(data);
  });
});

shoppingListRoutes.delete('/', isAuthenticated, (req, res) => {
  var username = req.username;
  var productId = req.query.productId;
  removeItemFromShoppingList(username, productId)
  .then((data) => {
    res.status(200).send(data);
  });
})

shoppingListRoutes.put('/update/list', isAuthenticated, (req, res) => {
  var username = req.username;
  var list = req.body.list;
  updateShoppingList(username, list)
  .then((data) => {
    res.status(200).send(data);
  })
});

shoppingListRoutes.put('/update/watch', isAuthenticated, (req,res) => {
  var username = req.username;
  var productId = req.body.productId;
  var watchPrice = req.body.watchPrice;
  updateWatchPrice(username, productId, watchPrice)
  .then((data) => {
    res.status(200).send(data);
  })
});

exports.shoppingListRouter = shoppingListRoutes;
