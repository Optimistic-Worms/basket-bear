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

let updateWatchListItemPrice = (id, merchant, currentPrice) => {
  return new Promise((resolve, reject) => {
    const productRef = db.collection('watchedItems').doc(merchant).collection('products').doc(id);

    productRef.update({
      currentPrice: currentPrice
    })
    .then(()=> {
      compareWatchPrices(id, merchant).then((messages) => {
        let message = 'Comparing watch prices: ' + JSON.stringify(messages);
        resolve(message);
      })
      .catch((error) => {
        reject(error);
      });
    })
    .catch((error) => {
      reject('Error updating current price of item');
    })
  })
}

let addToNotificationQueue = (user, productName, merchant, productId, currentPrice, requestedPrice) => {
  return new Promise((resolve, reject) => {
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
    })
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    })
  })
}

let compareWatchPrices = (id, merchant) => {
  return new Promise((resolve, reject) => {
    const productRef = db.collection('watchedItems').doc(merchant).collection('products').doc(id);

    productRef.get().then((doc) => {
      let currentPrice = doc.data().currentPrice;
      let pricesObject = doc.data().prices;
      let productName = doc.data().name;
      let requestedPrice;
      let notifications = [];

      for (let user in pricesObject) {
        if (currentPrice === 'Item No Longer Available') {
          requestedPrice = 'Item No Longer Available';
        } else if (Number.parseInt(currentPrice) <= Number.parseInt(pricesObject[user])) {
          requestedPrice = pricesObject[user];
          notifications.push(addToNotificationQueue(user, productName , merchant, id, currentPrice, requestedPrice));
        }
      }
      Promise.all(notifications).then((messages) => {
        let message = 'Notification Queue Messages:' + JSON.stringify(messages);
        resolve(message);
      })
      .catch((errors) => {
        reject('Notification Queue Errors');
      })
    })

  })
}

let checkIfPriceChanged = (id, merchant, currentPrice) => {
  return new Promise((resolve, reject) => {
    let returnMessage = "";
    const productRef = db.collection('watchedItems').doc(merchant).collection('products').doc(id);
    productRef.get().then((doc) => {
      if (currentPrice !== doc.data().currentPrice) {
        updateWatchListItemPrice(id, merchant, currentPrice)
        .then((messages) => {
          returnMessage = 'Updating watch list item price for ' + id + JSON.stringify(messages);
          resolve(returnMessage);
        })
        .catch((error) => {
          reject(error);
        });
      } else {
        returnMessage = 'item' + id + 'no price change';
        resolve(returnMessage);
      }
    })
    .catch((error) => {
      reject('error getting product');
    })
  })
}

let sendToAmazon = (itemIds) => {
  return new Promise((resolve, reject) => {
    amazon.lookupProductsById(itemIds).then((response) => {
      let returnedItemsToCheck = [];
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
        returnedItemsToCheck.push(checkIfPriceChanged(id, 'amazon', currentPrice));
      })
      Promise.all(returnedItemsToCheck).then((messages) => {
        let message = 'Checking Amazon returned items' + JSON.stringify(messages);
        resolve(message);
      })
      .catch((errors) => {
        reject(errors);
      })
    })
    .catch((error) => {
      reject('Error looking up amazon products');
    })
  })
}

let sendToEbay = (itemIds) => {
  return new Promise((resolve, reject) => {
    ebay.lookupProductsById(itemIds).then((response) => {
      let returnedEbayItemsToCheck = [];
      response.Item.forEach((item) => {
        let id = item.ItemID;
        let currentPrice = item.ConvertedCurrentPrice.Value;
        returnedEbayItemsToCheck.push(checkIfPriceChanged(id, 'eBay', currentPrice));
      })
      Promise.all(returnedEbayItemsToCheck).then((messages) => {
        let message = 'Checking returned Ebay Items:' + JSON.stringify(messages);
        resolve(message);
      })
      .catch((error) => {
        reject('Error on checkIfPriceChanged');
      })
    })
    .catch((error) => {
      reject('Error looking up Ebay Products');
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

let updateAmazonWatchItems = () => {
  return new Promise((resolve, reject) => {
    getProductsFromCollection('amazon')
    .then((amazonProducts) => {
      let sentToAmazon = [];
      // send in batched of 10 max due to amazon api lookup limit
      while (amazonProducts.length >= 10) {
        sentToAmazon.push(sendToAmazon(amazonProducts.slice(0, 9)));
        amazonProducts.splice(0, 9);
      }
      if (amazonProducts.length > 0) {
        sentToAmazon.push(sendToAmazon(amazonProducts));
      }
      Promise.all(sentToAmazon).then((messages) => {
        let message = 'Sent products to amazon for look up:' + JSON.stringify(messages);
        resolve(message);
      })
      .catch((error) => {
        reject('Error sending to amazon');
      })
    })
    .catch(()=> {
      reject('Error accessing Amazon Collection');
    })
  }) // end promise
}

let updateEbayWatchItems = () => {
  return new Promise((resolve, reject) => {
    getProductsFromCollection('eBay')
    .then((ebayProducts) => {
      let sentToEbay = [];
      // send in batched of 10 max due to ebay api lookup limit
      while (ebayProducts.length >= 10) {
        sentToEbay.push(sendToEbay(ebayProducts.slice(0, 9)));
        ebayProducts.splice(0, 9);
      }
      if (ebayProducts.length > 0) {
        sentToEbay.push(sendToEbay(ebayProducts));
      }
      Promise.all(sentToEbay).then((messages) => {
        let message = 'Sent products to ebay for look up:' + JSON.stringify(messages);
        resolve(message);
      })
      .catch((error) => {
        reject('Error sending to ebay');
      })
    })
    .catch(() => {
      reject('Error accessing ebay collection');
    })
  }) // end promise
}

exports.watchListWorker = (req, res) => {
  let workerData = [];
  if (req.query.authsecret !== process.env.AUTH_SECRET) {
    console.error("Missing or incorrect auth-secret header. Rejecting request.");
    res.status(401).send('Not Authorized')
  } else {
    workerData.push('Watched Items Worker Started');

    let workers = [updateAmazonWatchItems(), updateEbayWatchItems()];

    Promise.all(workers).then((messages) => {
      workerData.push(messages)
      res.send(JSON.stringify(workerData));
    })
    .catch((error) => {
      res.send(JSON.stringify(error));
    })
  }
}
