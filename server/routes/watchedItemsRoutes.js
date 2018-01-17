const express = require('express');
const { searchProducts, lookupProductsById } = require('../helpers/ebay');
const ebay = require('../helpers/ebay');
const { addToWatchList, removeFromWatchList } = require('../controllers/watchedItems');
const { isAuthenticated } = require('../controllers/authroutes.js');

const watchedItemsRoute = express.Router();

watchedItemsRoute.post('/', isAuthenticated, addToWatchList);
watchedItemsRoute.put('/', isAuthenticated, removeFromWatchList);

exports.watchedItemsRouter = watchedItemsRoute;