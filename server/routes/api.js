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

const apiRoutes = express.Router();

apiRoutes.get('/', authenticateToken, (req, res) => {
  res.send('Welcome to the Basket Bear API! Proceed to "https://www.basketbear.com/dev/docs/start to get started"')
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Product Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

apiRoutes.post('/products', isAuthenticated, updateProductPrice);

apiRoutes.get('/products', authenticateToken, getProducts);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  API User Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

apiRoutes.post('/usertoken', authenticateUser, oauth.server.token());

apiRoutes.post('/token', authenticateClient, oauth.server.token());

apiRoutes.post('/signup', addUser);

apiRoutes.get('/renew', authenticateToken, generateNewClientSecret);

apiRoutes.get('/user', authenticateToken, getClientData);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  API Search Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

apiRoutes.get('/search', authenticateToken, getLowestPrices);

exports.apiRouter = apiRoutes;