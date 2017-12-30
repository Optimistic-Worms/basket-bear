const db = require('../../db/db-config');
const amazon = require('../helpers/amazon');
const ebay = require('../helpers/ebay');


exports.addToWatchList = (req, res) => {
  const {name, id, merchant, targetPrice, currentPrice} = req.body;
  const productRef = db.collection('watchedItems').doc(merchant).collection('products').doc(id);
  //console.log('adding to watch list:', name, id, merchant, targetPrice, currentPrice);

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
        name: name,
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

let updateWatchListItemPrice = (id, merchant, currentPrice) => {
  const productRef = db.collection('watchedItems').doc(merchant).collection('products').doc(id);

  productRef.update({
    currentPrice: currentPrice
  })
  .then(()=> {
    console.log('updated current price of item, ',id, merchant, currentPrice);
    compareWatchPrices(id, merchant);
  })
  .catch(()=> {
    console.error('error updating current price of item');
  })
}

let compareWatchPrices = (id, merchant) => {
  const productRef = db.collection('watchedItems').doc(merchant).collection('products').doc(id);

  productRef.get().then((doc) => {
    let currentPrice = doc.data().currentPrice;
    let pricesObject = doc.data().prices;
    let productName = doc.data().name;
    for (let user in pricesObject) {
      if (currentPrice <= pricesObject[user]) {
        addToNotificationQueue(user, productName , merchant, id, currentPrice);
      }
    }
  })
}

let addToNotificationQueue = (user, productName, merchant, productId, currentPrice) => {
  console.log('Notify user: ', user,
    'Product: ', productName,
    'productId: ', productId,
    'Merchant: ', merchant,
    'Price dropped to ', currentPrice);
}

let sendToAmazon = (itemIds) => {
  amazon.lookupProductsById(itemIds).then((response) => {
    response.ItemLookupResponse.Items[0].Item.forEach((item) => {
      let offer = item.Offers[0].Offer[0].OfferListing[0];
      let id = item.ASIN[0];
      let currentPrice;
      if (offer.SalePrice) {
        currentPrice = offer.SalePrice[0].FormattedPrice[0].substring(1);
      } else if (offer.Price) { //ONLY SET THIS IF THERE IS NO SALE PRICE
        currentPrice = offer.Price[0].FormattedPrice[0].substring(1);
      }
      updateWatchListItemPrice(id, 'amazon', currentPrice);
    })
  })
}

exports.watchListWorker = (req, res) => {
  const productRef = db.collection('watchedItems').doc('amazon').collection('products')

  // scan the collection of watched items: AMAZON
  // add each product ID to a amazon QUEUE to send for price lookup
  productRef.get().then((query)=> {
    let amazonProducts = [];
    query.forEach((doc) => {
      amazonProducts.push(doc.id);
    })
    return amazonProducts;
  })
  .then((amazonProducts) => {
    // while queue is longer than 10 items,
    // send the first 10 items for price lookup
    // remove those IDs from the queue
    while (amazonProducts.length > 10) {
      sendToAmazon(amazonProducts.slice(0, 9));
      amazonProducts.splice(0, 9);
    }
    if (amazonProducts.length > 0) {
      sendToAmazon(amazonProducts);
    }
  })
  res.send('starting watch worker');


  // do the same for ebay products

}
