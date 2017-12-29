const db = require('../../db/db-config');
const amazon = require('../helpers/amazon');
const ebay = require('../helpers/ebay');


exports.addToWatchList = (req, res) => {
  const {id, merchant, targetPrice, currentPrice} = req.body;
  const productRef = db.collection('watchedItems').doc(merchant).collection('products').doc(id);

  productRef.get().then((product) => {
    if (product.exists) {
      let prices = product.data().prices;
      prices[req.username] = targetPrice;
      productRef.update({prices: prices})
      .then(() => {
        res.send('Watch List data succesfully updated');
      })
      .catch((err) => res.status(400).send(err));
    } else {
      productRef.set({
        merchant: merchant,
        currentPrice: currentPrice,
        prices: {[req.username]: targetPrice}
      }).then(() => {
        res.send('Succesfully added new product to watch list');
      })
      .catch(err =>res.status(400).send(err));
    }
  })
  .catch((err) => {
    res.status(400).send(err);
  });
};

exports.removeFromWatchList = (req, res) => {
  const {id, merchant} = req.body;
  const productRef = db.collection('watchedItems').doc(merchant).collection('products').doc(id);

  productRef.get().then((product) => {
    if (product.exists) {
      let prices = product.data().prices;
      delete prices[req.username];
      if (Object.keys(prices).length < 1) {
        productRef.delete()
        .then(() => {
          res.send('No more users watching, deleted item from watch list');
        })
        .catch((err) => res.status(400).send(err));
      } else {
        productRef.update({prices: prices})
        .then(()=> {
          res.send('Removed user from watched item');
        })
        .catch((err) => res.status(400).send(err));
      }
    } else {
      res.send('No item to remove');
    }
  })
  .catch((err) => res.status(400).send(err));
}

exports.updateWatchListItemPrice = (id, merchant, currentPrice) => {
  const productRef = db.collection('watchedItems').doc(merchant).collection('products').doc(id);

  productRef.update({
    currentPrice: currentPrice
  })
  .then(()=> {
    console.log('updated current price of item');
  })
  .catch(()=> {
    console.error('error updating current price of item');
  })
}

exports.compareWatchPrices = (currentPrice, pricesObject) => {
  // pricesObject in format  {userUID: price}
  // currentPrice as a string

  // for the list of users watching,
  // if the current price drops to or below their watched price
  // add the user to notification queue to be notified according to their notification settings
}

exports.workOnWatchList = (req, res) => {
  // scan the collection of watched items: AMAZON
  // add each product ID to a amazon QUEUE to send for price lookup

  // while queue is longer than 10 items,
  // send the first 10 items for price lookup
  // remove those IDs from the queue

  // for each item returned from amazon price lookup,
  // parse for the current price of the item
  // update the current price : module.exports.updateWatchListItemPrice(id, )
  // compare watch prices of users watching : module.exports.compareWatchPrices()

  // do the same for ebay products

}