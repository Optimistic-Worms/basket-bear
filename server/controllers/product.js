const amazon = require('../helpers/amazon');
const ebay = require('../helpers/ebay');
const db = require('../../db/db-config');

exports.getLowestPrices = (req, res) => {
  console.log(req.user)
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
  const {name, id, merchant, targetPrice, currentPrice} = req.body;
  //console.log(name, id, merchant, targetPrice, currentPrice)

  db.collection('productList').doc(merchant).collection('products').doc(id).set({
    name: name,
    merchant: merchant,
    currentPrice: currentPrice,
    prices: {[req.username]: targetPrice}
  }).then(() => {
    console.log('succesfully added new product price data')
    res.send('succesfully added new product price data');
  })
  .catch(err =>res.status(400).send(err));
};

exports.update = (req, res) => {
  const {id, targetPrice, merchant} = req.body;
  const productRef = db.collection('productList').doc(merchant).collection('products').doc(id);

  productRef.get().then((product) => {
    if (product.exists) {
      let prices = product.data().prices;
      prices[req.username] = targetPrice;
      productRef.update({prices: prices})
      .then(() => {
        console.log('Product price data succesfully updated')
        res.send('Product price data succesfully updated')
      })
      .catch((err) => res.status(400).send(err));
    } else {
      exports.addNew(req, res);
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  });
};

exports.getData = () => {

}
