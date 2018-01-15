const express = require('express');
const { searchProducts, lookupProductsById } = require('../helpers/amazon');
const ebay = require('../helpers/ebay');

const amazon = express.Router();

amazon.get('/search', (req, res) => {
  var searchQuery = req.query.keyword;
  searchProducts(searchQuery)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(400).send(data);
  })
});

amazon.get('/lookup', (req, res) => {
  const { itemIds } = req.query;
  if (!itemIds) {
    res.send('request must include at least one item id')
  } else {
    lookupProductsById(itemIds)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((data) => {
      res.status(400).send(data);
    })
  }

});

exports.amazonRouter = amazon;