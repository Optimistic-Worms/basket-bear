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
  const {name, id, merchant, targetPrice, userId} = req.body;

  db.collection('products').doc(id).set({
    name, name,
    merhcant: merchant,
    prices: {[userId]: targetPrice}
  }).then(() => {
    res.send('succesfully added product');
  })
  .catch(err =>res.status(400).send(err));
};

exports.update = (req, res) => {
  const {id, targetPrice, userId} = req.body;
  const productRef = db.collection('products').doc(id);

  productRef.get()
  .then((product) => {
    if (product.exists) {
      let prices = product.data().prices;
      prices[userId] = targetPrice;

      productRef.update({prices: prices})
      .then(() => res.send('Product succesfully updated product'))
      .catch((err) => res.status(400).send(err));
    } else {
      exports.addNew(req, res);
    }
  })
  .catch((err) => res.status(400).send(err));
};

exports.getData = () => {

}
