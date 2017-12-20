const db = require('../../db/db-config');


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

