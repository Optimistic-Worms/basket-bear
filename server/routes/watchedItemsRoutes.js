const express = require('express');
const { searchProducts, lookupProductsById } = require('../helpers/ebay');
const ebay = require('../helpers/ebay');
const { addToWatchList, removeFromWatchList } = require('../controllers/watchedItems');
const { isAuthenticated } = require('../controllers/authroutes.js');

const watchedItems = express.Router();

watchedItems.post('/', isAuthenticated, addToWatchList);
watchedItems.put('/', isAuthenticated, removeFromWatchList);

exports.watchedItemsRouter = watchedItems;