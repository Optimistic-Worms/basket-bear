const express = require('express');

const { isCronAuthenticated } = require('../controllers/authroutes.js');
const { notificationWorker } =  require('../controllers/notificationWorker');

const notificationsRoute = express.Router();

notificationsRoute.get('/', isCronAuthenticated, notificationWorker);

exports.notificationsRouter = notificationsRoute;