const express = require('express');

const { isAuthenticated } = require('../controllers/authroutes.js');
const { subscribe, unsubscribe } = require('../controllers/pushNotifications');

const subscribeRoute = express.Router();

subscribeRoute.post('/', isAuthenticated, subscribe);
subscribeRoute.post('/remove', isAuthenticated, unsubscribe);

exports.subscribeRouter = subscribeRoute;