const express = require('express');
const path = require('path');

const fallbackRoute = express.Router();

fallbackRoute.get('/', (req,res) => {
  res.sendFile(path.resolve(__dirname, '../../index.html'));
});

exports.fallbackRouter = fallbackRoute;