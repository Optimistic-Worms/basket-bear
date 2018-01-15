const express = require('express');
const { searchProducts, lookupProductsById } = require('../helpers/ebay');
const ebay = require('../helpers/ebay');

const ebayRoutes = express.Router();

ebayRoutes.get('/search', (req, res)=> {
  var keyword = req.query.keyword;
  console.log('searching for ', keyword);

  ebay.searchProducts(keyword)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(400).send(data);
  })
});

ebayRoutes.get('/lookup', (req, res) => {
  var itemIds = req.query.itemIds;
  ebay.lookupProductsById(itemIds)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(200).send(data);
  })
})

exports.ebayRouter = ebayRoutes;