const db = require('../../db/db-config');
const amazon = require('../helpers/amazon');
const ebay = require('../helpers/ebay');

exports.addToWatchList = (req, res) => {
  const {name, id, merchant, targetPrice, currentPrice} = req.body;
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

let checkIfPriceChanged = (id, merchant, currentPrice) => {
  const productRef = db.collection('watchedItems').doc(merchant).collection('products').doc(id);
  productRef.get().then((doc) => {
    if (currentPrice !== doc.data().currentPrice) {
      updateWatchListItemPrice(id, merchant, currentPrice);
    }
    console.log('item', id, 'no price change');
  })

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
    let requestedPrice;
    for (let user in pricesObject) {
      if (currentPrice === 'Item No Longer Available') {
        requestedPrice = 'Item No Longer Available';
      } else if (Number.parseInt(currentPrice) <= Number.parseInt(pricesObject[user])) {
        requestedPrice = pricesObject[user];
      }
      addToNotificationQueue(user, productName , merchant, id, currentPrice, requestedPrice);
    }
  })
}

let addToNotificationQueue = (user, productName, merchant, productId, currentPrice, requestedPrice) => {
    let notification = {
    'user': user,
    'product': productName,
    'productId': productId,
    'merchant': merchant,
    'requestedPrice': requestedPrice,
    'priceDroppedTo': currentPrice
  }
  db.collection('awaitNotification').doc().set({
      items: notification
  }).then(result =>{
    console.log(result)
  }).catch(err =>{
    console.log(err)
  })
}

let sendToAmazon = (itemIds) => {
  amazon.lookupProductsById(itemIds).then((response) => {
    response.ItemLookupResponse.Items[0].Item.forEach((item) => {
      let offer;
      let currentPrice;
      let id = item.ASIN[0];
      if (item.Offers[0].Offer) {
        offer = item.Offers[0].Offer[0].OfferListing[0];
        if (offer.SalePrice) {
          currentPrice = offer.SalePrice[0].FormattedPrice[0].substring(1);
        } else if (offer.Price) { //ONLY SET THIS IF THERE IS NO SALE PRICE
          currentPrice = offer.Price[0].FormattedPrice[0].substring(1);
        }
      } else {
        currentPrice = 'Item No Longer Available';
      }
      checkIfPriceChanged(id, 'amazon', currentPrice);
    })
  })
}

let sendToEbay = (itemIds) => {
  ebay.lookupProductsById(itemIds).then((response) => {
    response.Item.forEach((item) => {
      let id = item.ItemID;
      let currentPrice = item.ConvertedCurrentPrice.Value;
      checkIfPriceChanged(id, 'eBay', currentPrice);
    })
  })
}

let getProductsFromCollection = (merchant) => {
  return new Promise((resolve, reject) => {
    const productRef = db.collection('watchedItems').doc(merchant).collection('products')
    productRef.get()
    .then((query) => {
      let products = [];
      query.forEach((doc) => {
        products.push(doc.id);
      })
      resolve(products);
    })
    .catch((error) => {
      reject(error);
    })
  }) //end promise
}

exports.watchListWorker = (req, res) => {
  let workerData = [];
  if (req.query.authsecret !== process.env.AUTH_SECRET) {
    console.error("Missing or incorrect auth-secret header. Rejecting request.");
    res.status(401).send('Not Authorized')
  } else {
    workerData.push('Watched Items Worker Started');

    getProductsFromCollection('amazon')
    .then((amazonProducts) => {
      // send in batched of 10 max due to amazon api lookup limit
      while (amazonProducts.length >= 10) {
        sendToAmazon(amazonProducts.slice(0, 9));
        amazonProducts.splice(0, 9);
      }
      if (amazonProducts.length > 0) {
        sendToAmazon(amazonProducts);
      }
    })
    .catch(()=> {
      workerData.push('Error accessing Amazon Collection');
    })

    getProductsFromCollection('eBay')
    .then((ebayProducts) => {
      // send in batched of 10 max due to ebay api lookup limit
      while (ebayProducts.length >= 10) {
        sendToEbay(ebayProducts.slice(0, 9));
        ebayProducts.splice(0, 9);
      }
      if (ebayProducts.length > 0) {
        sendToEbay(ebayProducts);
      }
    })
    .catch(() => {
      workerData.push('Error accessing ebay collection');
    })

    res.send(JSON.stringify(workerData));
  }
}
