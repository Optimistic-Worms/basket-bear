const amazon = require('../helpers/amazon');
const ebay = require('../helpers/ebay');
const db = require('../../db/db-config');
const productHelpers = require('../helpers/productHelpers.js');
const Promise = require('bluebird');

exports.getLowestPrices = (req, res) => {
  console.log(req.user)
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

exports.addNewProduct = (req, res) => {
  const {name, id, merchant, targetPrice, currentPrice} = req.body;

  db.collection('productList').doc(merchant).collection('products').doc(id).set({
    name: name,
    merchant: merchant,
    currentPrice: currentPrice,
    prices: {[req.username]: Number(targetPrice)}
  }).then(() => {
    console.log('succesfully added new product price data')
    res.send('succesfully added new product price data');
  })
  .catch(err =>res.status(400).send(err));
};

exports.updateProduct = (req, res) => {
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
      exports.addNewProduct(req, res);
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send(err);
  });
};

exports.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    const amazonRef = db.collection('productList').doc('amazon').collection('products').doc(id);
    const ebayRef = db.collection('productList').doc('eBay').collection('products').doc(id);

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

exports.getPriceData = (req, res) => {
  const { id } = req.query;

  if (!id) {
    res.send('A product ID must be included in the request');
  } else {
    exports.getProductById(id)
    .then(product => {
      const { name, merchant, prices } = product.data();
      const { avg, count } = productHelpers.getAveragePrice(prices);
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
  }
};

 exports.searchProductsByName = (req, res) => {
//     console.log(req.query.name)
//     const amazonProducts = db.collection('productList').doc('amazon').collection('products');
//     // const ebayProducts = db.collection('productList').doc('eBay').collection('products');
//     let matchingProducts = [];
//     console.log(amazonProducts.get)

//     amazonProducts.get().then(products => {
//       console.log('getting products', product.length)
//       //res.send('success')
//       products.forEach(product => {
//         console.log(product.data())
//         // if (product.name.includes(req.name)) {
//         //   matchingProducts.push(product);
//         //  }
//       });
      // ebayProducts.get().then(products => {
      //   products.forEach(product => {
      //    if (product.name.includes(req.name)) {
      //     matchingProducts.push(product);
      //    }
      //   });
      //   const sorted = allProducts.slice(0, 100).sort((a, b) => {
      //     return Object.keys(b.prices).length - Object.keys(a.prices).length;
      //   });
      //   res.send(sorted);
      // }).catch(err => res.status(400).send(err));
    //}).catch(err => res.status(400).send(err));
     //const amazonProducts = db.collection('productList').doc('amazon').collection('products');
  //const ebayProducts = db.collection('productList').doc('eBay').collection('products');


    let allProducts = [];
    db.collection('productList').doc('amazon').collection('products').get().then(products => {
      products.forEach(product => {
       // console.log(product.data().name.toLowerCase().includes(req.query.name.toLowerCase()))
        if (product.data().name.toLowerCase().includes(req.query.name.toLowerCase())) {
        console.log('matched')
         productObj = product.data();
        productObj.id = product.id;
        allProducts.push(productObj)
        }
      });


      db.collection('productList').doc('eBay').collection('products').get().then(products => {
        products.forEach(product => {
         //console.log(product.data());
         if (product.data().name.includes(req.query.name)) {
            productObj = product.data();
        productObj.id = product.id;
        allProducts.push(productObj)
         }
        });
        // const sorted = (allProducts.slice(0, 100).sort((a, b) => {
        //   return Object.keys(b.prices).length - Object.keys(a.prices).length;
        // }));
        res.send(allProducts);
      }).catch(err => res.status(400).send(err));
    }).catch(err => res.status(400).send(err));

};

exports.getProducts = (req, res) => {
  const amazonProducts = db.collection('productList').doc('amazon').collection('products');
  const ebayProducts = db.collection('productList').doc('eBay').collection('products');

  if (req.query.id) {
    exports.getPriceData(req, res);
  } else if (req.query.name) {
      exports.searchProductsByName(req, res);
  } else {
    let allProducts = [];
    amazonProducts.get().then(products => {
      products.forEach(product => {
        productObj = product.data();
        productObj.id = product.id;
        allProducts.push(productObj)
      });
      ebayProducts.get().then(products => {
        products.forEach(product => {
          productObj = product.data();
          productObj.id = product.id;
          allProducts.push(productObj);
        });
        const sorted = (allProducts.slice(0, 100).sort((a, b) => {
          return Object.keys(b.prices).length - Object.keys(a.prices).length;
        }));
        res.send(sorted);
      }).catch(err => res.status(400).send(err));
    }).catch(err => res.status(400).send(err));
  }
}
