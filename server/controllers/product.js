const amazon = require('./amazon');
const ebay = require('./ebay');
const db = require('../../db/db-config');

exports.getLowestPrices = (req, res) => {
  const product = req.query.keyword;
  let results = [];

  amazon.searchProducts(product)
  .then(rawResults => {
    let parsed = amazon.parseResultsSync(rawResults);
    results = results.concat(parsed);""

    ebay.searchProducts(product)
    .then(data => {
      results = results.concat(JSON.parse(data));
      //sort combined results by ascending price
      const sorted = results.sort((a, b) => +a.price - +b.price);
      res.send(sorted);
    })
    .catch(err => res.status(400).send(err));
  })
  .catch(err => res.status(400).send(err));
};

exports.addNew = (req, res) => {
  //console.log(req.body);
  const {name, id, merchant, targetPrice} = req.body;
  db.collection('product').add({
      name, name,
      id: id,
      merhcant: merchant,
      targetPrice: targetPrice
    }).then(productRef => {
      console.log(productRef.id);
      res.json({id: productRef.id});
    })
    .catch(err =>res.status(400).send(err));
};

exports.getData = () => {

}
