const express = require('express');

const {
  authenticateUser,
  authenticateClient,
  authenticateToken
} = require('../controllers/developer/auth/apiAuth');

const {
  addUser,
  getClientData,
  generateNewClientSecret
} = require('../controllers/developer/apiUser');

const {
  getLowestPrices,
  updateProductPrice,
  getPriceData,
  getProducts,
  addNewUserData
} = require('../controllers/product');

const oauth = require('../controllers/developer/auth/oauth2');
const { isAuthenticated } = require('../controllers/authroutes.js');

const api = express.Router();

api.get('/', authenticateToken, (req, res) => {
  res.send('Welcome to the Basket Bear API! Proceed to "https://www.basketbear.com/dev/docs/start to get started"')
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Product Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

api.post('/products', isAuthenticated, updateProductPrice);

api.get('/products', authenticateToken, getProducts);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  API User Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

api.post('/usertoken', authenticateUser, oauth.server.token());

api.post('/token', authenticateClient, oauth.server.token());

api.post('/signup', addUser);

api.get('/renew', authenticateToken, generateNewClientSecret);

api.get('/user', authenticateToken, getClientData);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  API Search Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

api.get('/search', authenticateToken, getLowestPrices);

exports.apiRouter = api;