if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  require('dotenv').config();

  const webPush = require('web-push');
  webPush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

const express = require('express')
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const axios = require('axios');

const path = require('path');
const port = process.env.PORT || 3000;
const isAuthenticated = require('./controllers/authroutes.js').isAuthenticated;

/* helpers */
const amazon = require('./helpers/amazon');
const ebay = require('./helpers/ebay');
/* controllers */
const shoppingList = require('./controllers/shoppingList');
const userSettings = require('./controllers/userSettings');
const product = require('./controllers/product');
const watch = require('./controllers/watchedItems');
/* dev controllers */
const apiUser = require('./controllers/developer/apiUser');
const apiAuth = require('./controllers/developer/auth/apiAuth');
const oauth = require('./controllers/developer/auth/oauth2');
const passport = require('passport');
const expressValidator = require('express-validator');

/* Push */
const addSubscriptionToDb = require('./controllers/userSettings.js').addSubscriptionToDb;
const removeSubscriptionFromDb = require('./controllers/userSettings.js').removeSubscriptionFromDb;
const getSubscriptionsFromDB = require('./controllers/userSettings.js').getSubscriptionsFromDB;

// VAPID keys should only be generated once.
// const newVapidKeys = webPush.generateVAPIDKeys();
// console.log(newVapidKeys)

let config;
(port === 3000)? config = require('../webpack.dev.js') : config = require('../webpack.prod.js');
const compiler = webpack(config);



app.use(express.static(__dirname));

app.use(passport.initialize());
app.use(expressValidator())

const webpackDevMiddlewareInstance = webpackDevMiddleware( compiler, {
  publicPath: config.output.publicPath
});

app.use(webpackDevMiddlewareInstance);

const server = app.listen(port || 3000);
console.log('server is listening on port ' + port);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(__dirname));
const apiRoutes = express.Router();
app.use('/api', apiRoutes);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  API Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */
/*app.get('/', (req,res)=> {
  res.send(200)
});*/

app.get('/thing', isAuthenticated, (req,res) =>{
  console.log('hit the 200')
  res.sendStatus(200);
});



/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Push Subscription
* * * * * * * * * * * * * * * * * * * * * * * * * * */

  app.post('/subscribe', isAuthenticated, (req, res) => {
    let data = req.body.subscription;
    let pushSubscription = {};
    let name = data.endpoint.replace('https://fcm.googleapis.com/fcm/send/','')
    pushSubscription[name] = {
       endpoint: data.endpoint,
       keys: {
           p256dh: data.keys.p256dh, // Public Key
           auth: data.keys.auth
       }
    };
    addSubscriptionToDb(req.username, pushSubscription).then(response => {
    res.send('Subscription accepted!');
    }).catch(error => {
    res.status(500).send(error)
    });
  });


 app.post('/unsubscribe', isAuthenticated, function (req, res) {
      let data = req.body.subscription;
      let username = req.username;
          let pushSubscription = {};
    let name = data.endpoint.replace('https://fcm.googleapis.com/fcm/send/','')
    pushSubscription[name] = {
       endpoint: data.endpoint,
       keys: {
           p256dh: data.keys.p256dh, // Public Key
           auth: data.keys.auth
       }
    };
     removeSubscriptionFromDb(username, pushSubscription);
     res.send('Subscription removed!');
 });

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Send Push Notification
* * * * * * * * * * * * * * * * * * * * * * * * * * */


// WARNING ROUTE ONLY SEMI PROTECTED USE FOR EXAMPLES ONLY

app.get('/notify', function (req, res) {
// get subscription from firebase.
  let username = req.get('user');

  getSubscriptionsFromDB(username).then(subs => {
    let subscribers = []
    for (var i in subs){
    subscribers.push(subs[i])
  }
  subscribers.shift();
  if(subscribers.length === 0 ){
    res.status(200).send('user has no subscriptions')
  }
  if(req.get('auth-secret') !== process.env.AUTH_SECRET) {
    console.log("Missing or incorrect auth-secret header. Rejecting request.");
    res.status(401).send('Not Authorized')
  }

  let message = req.query.message || `Willy Wonka's chocolate is the best!`;
  let clickTarget = req.query.clickTarget || `http://www.favoritemedium.com`;
  let title = req.query.title || `Push notification received!`;
  subscribers.forEach(pushSubscription => {

  //Can be anything you want. No specific structure necessary.
    let payload = JSON.stringify({message : message, clickTarget: clickTarget, title: title});
   webPush.
    sendNotification(pushSubscription, payload).then(response => {
      res.send(response)
    }).catch(error => {
    console.log(error)
      res.status(500).send(error)

    });
  });

  }).catch(error => {
      res.sendStatus(500)
  })
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Send Email
* * * * * * * * * * * * * * * * * * * * * * * * * * */

//CODE TO SEND THE INFO
app.post('/email', (req, res) => {
    console.log(req.query)
   var data = {
    'name': req.query.name,
    'email': req.query.email,
    'message':req.query.message,
    'subject': req.query.subject,
   };
   var options = {
     'method' : 'post',
     'contentType': 'application/json',
     'payload' : data,
     'auth': 'welcome'
   };
   var secondScriptID = 'AKfycbxjbt4Lk4MO3rVu9vG2k3kMT4ih0RwvMr6-In25nHmN32GtGuU'
   axios.post("https://script.google.com/macros/s/" + secondScriptID + "/exec", options).then((response)=>{
     console.log(response.data)
     res.sendStatus(response.status)
   }).catch(error =>{
     res.send(error)
   }).catch(error =>{
    res.send(error)
   });


// short term fix.

});




/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  User settings Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/userSettings', isAuthenticated, (req, res) => {
  var username = req.username;
  userSettings.getSettings(username)
  .then((result) => {
    res.status(200).send(result);
  }).catch(error => {
    res.status(500).send(error)
  });
});

app.post('/userSettings', isAuthenticated, (req, res) => {
  var username = req.username;
  var data = req.body;
  userSettings.createSettings(username, data)
  .then((result) => {
    res.status(200).send(result);
  }).catch(error => {
    res.status(500).send(error)
  });
});



/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Shopping List Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.post('/shoppingList', isAuthenticated, (req, res) => {
  var username = req.username;
  shoppingList.createShoppingList(username)
  .then((data) => {
    res.status(200).send(data);
  });
});

app.get('/shoppingList', isAuthenticated, (req, res) => {
  var username = req.username;
  shoppingList.getShoppingList(username)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(401).send(data);
  })
});

app.put('/shoppingList', isAuthenticated, (req, res) => {
  var username = req.username;
  var product = req.body.product;
  shoppingList.addItemToShoppingList(username, product)
  .then((data) => {
    res.status(200).send(data);
  });
});

app.delete('/shoppingList', isAuthenticated, (req, res) => {
  var username = req.username;
  var productId = req.query.productId;
  shoppingList.removeItemFromShoppingList(username, productId)
  .then((data) => {
    res.status(200).send(data);
  });
})

app.put('/updateShoppingList', isAuthenticated, (req, res) => {
  var username = req.username;
  var list = req.body.list;
  shoppingList.updateShoppingList(username, list)
  .then((data) => {
    res.status(200).send(data);
  })
});

app.put('/updateWatchPrice', isAuthenticated, (req,res) => {
  var username = req.username;
  var productId = req.body.productId;
  var watchPrice = req.body.watchPrice;
  shoppingList.updateWatchPrice(username, productId, watchPrice)
  .then((data) => {
    res.status(200).send(data);
  })
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Watched Items Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.post('/watchedItems', isAuthenticated, watch.addToWatchList);
app.put('/watchedItems', isAuthenticated, watch.removeFromWatchList);
app.get('/watchedItemsWorker', watch.watchListWorker);


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Ebay API Calls
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/searchEbay', (req, res)=> {
  var keyword = req.query.keyword;
  console.log('searching for ', keyword);

  ebay.searchProducts(keyword)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(400).send(data);
  })
});

app.get('/lookupEbay', (req, res) => {
  var itemIds = req.query.itemIds;
  ebay.lookupProductsById(itemIds)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(200).send(data);
  })
})


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Amazon API Calls
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/searchAmazon', (req, res) => {
  var searchQuery = req.query.keyword;
  amazon.searchProducts(searchQuery)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(400).send(data);
  })
});

app.get('/lookupAmazon', (req, res) => {
  var itemIds = req.query.itemIds;
  amazon.lookupProductsById(itemIds)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(400).send(data);
  })
});


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Product Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

apiRoutes.post('/products', isAuthenticated, product.update);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Business API Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

apiRoutes.get('/', apiAuth.authenticateToken, (req, res) => {
  res.send('Welcome to the Budget Basket API!')
});

apiRoutes.post('/usertoken', apiAuth.authenticateUser, oauth.server.token());

apiRoutes.post('/token', apiAuth.authenticateClient, oauth.server.token());

apiRoutes.post('/signup', apiUser.addUser);

apiRoutes.get('/user', apiAuth.authenticateToken, apiUser.getClientData);

apiRoutes.get('/search', apiAuth.authenticateToken, product.getLowestPrices);

apiRoutes.get('/product', apiAuth.authenticateToken, product.getData);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Fallback Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

/* Compression to g-zip*/
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('*', (req,res) =>{
  res.sendFile(path.resolve(__dirname, '../index.html'))
});


module.exports.server = server;
module.exports.app = app;
module.exports.webpackDevMiddlewareInstance = webpackDevMiddlewareInstance;