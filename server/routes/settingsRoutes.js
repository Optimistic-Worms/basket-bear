const express = require('express');
const { getSettings, createSettings} = require('../controllers/userSettings');
const { isAuthenticated } = require('../controllers/authroutes.js');

const settingsRoute = express.Router();

settingsRoute.get('/', isAuthenticated, (req, res) => {
  var username = req.username;
  getSettings(username)
  .then((result) => {
    res.status(200).send(result);
  }).catch(error => {
    res.status(500).send(error)
  });
});

settingsRoute.post('/', isAuthenticated, (req, res) => {
  var username = req.username;
  var data = req.body;
  createSettings(username, data)
  .then((result) => {
    res.status(200).send(result);
  }).catch(error => {
    res.status(500).send(error)
  });
});

exports.settingsRouter = settingsRoute;
