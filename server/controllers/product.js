const Promise = require('bluebird');
const amazon = require('../helpers/amazon');
const ebay = require('../helpers/ebay');
const db = require('../../db/db-config');
const { getAveragePrice, sortByPopularity, parseData , productNamesMatch } = require('../helpers/productHelpers.js');
let amazonProducts;
let ebayProducts;

if (process.env.NODE_ENV !== 'test') {
  amazonProducts = db.collection('productList').doc('amazon').collection('products');
  ebayProducts = db.collection('productList').doc('eBay').collection('products');
}

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
      //sort combined results by ascending price
      const sorted = results.sort((a, b) => +a.price - +b.price);
      res.send(sorted);
    })
    .catch(err => res.status(400).send(err));
  })
  .catch(err => res.status(400).send(err));
};

exports.addNewProduct = (product, username) => {
  return new Promise((resolve, reject) => {
    const {name, id, merchant, targetPrice, currentPrice} = product;
    db.collection('productList').doc(merchant).collection('products').doc(id).set({
      name: name,
      merchant: merchant,
      currentPrice: currentPrice,
      prices: {[username]: Number(targetPrice)}
    }).then(() => {
      resolve('succesfully added new product price data');
    })
    .catch(err => reject(err));
    });
};

exports.updateProductPrice = (req, res) => {
  const { id, targetPrice, merchant } = req.body.product;

  const productRef = db.collection('productList').doc(merchant).collection('products').doc(id);
  productRef.get().then((product) => {
    if (product.exists) {
      let prices = product.data().prices;
      prices[req.username] = Number(targetPrice);
      productRef.update({prices: prices})
      .then(() => {
        console.log('Product price data succesfully updated');
        res.send('Product price data succesfully updated')
      })
      .catch((err) => res.status(400).send(err));
    } else {
      exports.addNewProduct(req.body.product, req.username)
      .then(data => {
        console.log(data);
        res.send(data)
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
};

exports.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    const amazonRef = amazonProducts.doc(id);
    const ebayRef = ebayProducts.doc(id);

    amazonRef.get().then((product) => {
      if (product.exists) {
        return resolve(product);
      } else {
        ebayRef.get().then((product) => {
          if (product.exists) {
           return resolve(product);
          } else {
            return reject(`No product found in amazon or ebay for ID:${id}`)
          }
        })
        .catch(err => reject(err));
      }
    })
    .catch(err => reject(err));
  });
};

exports.getProductData = (req, res) => {
  const { id } = req.query;
  exports.getProductById(id)
  .then(product => {
    const { name, merchant, prices } = product.data();
    const { avg, count } = getAveragePrice(prices);
    res.send({
      name: name,
      merchant: merchant,
      recorded_price_count: count,
      average_requested_price: avg
    });
  })
  .catch(err => {
    console.log(err);
    res.status(400).send(err);
  });
};

 exports.searchProductsByName = (req, res) => {
  let allProducts = [];

  amazonProducts.get().then(products => {
    products.forEach(product => {
      const productObj = parseData(product);
      if (productNamesMatch(productObj, req.query.name)) {
        allProducts.push(productObj);
      }
    });

    ebayProducts.get().then(products => {
      products.forEach(product => {
        if (productNamesMatch(productObj, req.query.name)) {
          allProducts.push(productObj);
        }
      });
      const sorted = sortByPopularity(allProducts);
      res.send(sorted);
    }).catch(err => res.status(400).send(err));
  }).catch(err => res.status(400).send(err));
};

exports.getProducts = (req, res) => {
  const { id, name } = req.query;

  if (id) {
    exports.getProductData(req, res);
  } else if (name) {
      exports.searchProductsByName(req, res);
  } else {
    let allProducts = [];
    amazonProducts.get().then(products => {
      products.forEach(product => allProducts.push(parseData(product)));
      ebayProducts.get().then(products => {
        products.forEach(product => allProducts.push(parseData(product)));
        const sorted = sortByPopularity(allProducts);
        res.send(sorted);
      }).catch(err => res.status(400).send(err));
    }).catch(err => res.status(400).send(err));
  }
}

exports.addNewUserData = (productObj, username) => {
  const { id, currentPrice, merchant } = productObj;
  const productRef = db.collection('productList').doc(merchant).collection('products').doc(id);

   //set target price to current price since the user is adding the product for the first time
  productRef.get().then((product) => {
    if (product.exists) {
      let prices = product.data().prices;
      prices[username] = Number(currentPrice);
      productRef.update({prices: prices})
      .then(() => {
        console.log('Product price data succesfully updated')
      })
      .catch((err) => res.status(400).send(err));
    } else {
      productObj.targetPrice = Number(productObj.currentPrice || productObj.price);
      exports.addNewProduct(productObj, username);
    }
  })
  .catch((err) => {
    console.log(err);
  });
}