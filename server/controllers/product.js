const amazon = require('./amazon');
const ebay = require('./ebay');

exports.getLowestPrices = (req, res) => {
  const product = req.query.keyword;
  let results = [];
  amazon.searchProducts(product)
  .then(rawResults => {
    let parsed = amazon.parseResultsSync(rawResults);
    results = results.concat(parsed);

    ebay.searchProducts(product)
    .then(data => {
      results = results.concat(JSON.parse(data));

      const sorted = results.sort((a, b) => {
        return Number(a.price) - Number(b.price);
      });

      res.send(sorted);
    })
    .catch(err => res.status(400).send(err));
  })
  .catch(err => res.status(400).send(err));
}

exports.addPriceData = () => {

}

exports.getPriceData = () => {

}