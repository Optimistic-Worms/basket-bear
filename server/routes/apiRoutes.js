const express = require('express');

const {
  authenticateUser,
  authenticateClient,
  authenticateToken
} = require('../controllers/developer/auth/apiAuth.js');

const {
  addUser,
  getClientData,
  generateNewClientSecret
} = require('../controllers/developer/apiUser.js');

const {
  getLowestPrices,
  updateProductPrice,
  getPriceData,
  getProducts,
  addNewUserData
} = require('../controllers/product');

const oauth = require('../controllers/developer/auth/oauth2');
const { isAuthenticated } = require('../controllers/authroutes.js');

const apiRoute = express.Router();

apiRoute.get('/', authenticateToken, (req, res) => {
  res.send('Welcome to the Basket Bear APIRoute! Proceed to "https://www.basketbear.com/dev/docs/start to get started"')
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Product Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

apiRoute.post('/products', isAuthenticated, updateProductPrice);

apiRoute.get('/products', authenticateToken, getProducts);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  APIRoute User Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

apiRoute.post('/usertoken', authenticateUser, oauth.server.token());

apiRoute.post('/token', authenticateClient, oauth.server.token());

apiRoute.post('/signup', addUser);

apiRoute.get('/renew', authenticateToken, generateNewClientSecret);

apiRoute.get('/user', authenticateToken, getClientData);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  APIRoute Search Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

apiRoute.get('/search', authenticateToken, getLowestPrices);

exports.apiRouter = apiRoute;