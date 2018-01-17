const express = require('express');
const { searchProducts, lookupProductsById } = require('../helpers/ebay');

const ebayRoute = express.Router();

ebayRoute.get('/search', (req, res)=> {
  var keyword = req.query.keyword;
  console.log('searching for ', keyword);

  searchProducts(keyword)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(400).send(data);
  })
});

ebayRoute.get('/lookup', (req, res) => {
  var itemIds = req.query.itemIds;
  lookupProductsById(itemIds)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(200).send(data);
  })
})

exports.ebayRouter = ebayRoute;