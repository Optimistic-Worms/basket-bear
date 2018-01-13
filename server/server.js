const webPush = require('web-push');
let emailAuth;

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
 require('dotenv').config();
}

if(process.env.NODE_ENV !== 'test'){
    emailAuth = process.env.EMAIL_AUTH
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
const webpackHotMiddleware = require('webpack-hot-middleware');

const path = require('path');
const port = process.env.PORT || 3000;

/* helpers */
const amazon = require('./helpers/amazon');
const ebay = require('./helpers/ebay');
/* controllers */
const isAuthenticated = require('./controllers/authroutes.js').isAuthenticated;
const isCronAuthenticated = require('./controllers/authroutes.js').isCronAuthenticated;
const shoppingList = require('./controllers/shoppingList');
const userSettings = require('./controllers/userSettings');
const { getLowestPrices, updateProductPrice, getPriceData, getProducts, addNewUserData } = require('./controllers/product');
const watch = require('./controllers/watchedItems');
/* dev controllers */
const apiUser = require('./controllers/developer/apiUser');

const apiAuth = require('./controllers/developer/auth/apiAuth');
const oauth = require('./controllers/developer/auth/oauth2');
const passport = require('passport');
const expressValidator = require('express-validator');

/* Push */
const getSubscriptionsFromDB = require('./controllers/userSettings.js').getSubscriptionsFromDB;
const push = require('./controllers/pushNotifications');
// VAPID keys should only be generated once.
// const newVapidKeys = webPush.generateVAPIDKeys();
// console.log(newVapidKeys)
/* Notification */
const notificationWorker =  require('./controllers/notificationWorker');
/* Check disposable email*/
const checkEmail = require('./controllers/disposableEmailList');

let config;
(port === 3000)? config = require('../webpack.dev.js') : config = require('../webpack.prod.js');
const compiler = webpack(config);

app.use(passport.initialize());
app.use(expressValidator())

const webpackDevMiddlewareInstance = webpackDevMiddleware( compiler, {
  publicPath: config.output.publicPath
});

app.use(webpackDevMiddlewareInstance);

if (process.env.HOT) {
  app.use(webpackHotMiddleware(compiler));
}

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
  Check for disposable email
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/checkemail', checkEmail.check)


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Push Subscription
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.post('/subscribe', isAuthenticated, push.subscribe);
app.post('/unsubscribe', isAuthenticated, push.unsubscribe);


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Notification Worker
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/runnotifications', isCronAuthenticated, notificationWorker.notificationWorker)

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
    addNewUserData(product, username);
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
app.get('/watchedItemsWorker', isCronAuthenticated, watch.watchListWorker);


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
  const { itemIds } = req.query;
  if (!itemIds) {
    res.send('request must include at least one item id')
  } else {
    amazon.lookupProductsById(itemIds)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((data) => {
      res.status(400).send(data);
    })
  }

});

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Product Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

apiRoutes.post('/products', isAuthenticated, updateProductPrice);

apiRoutes.get('/products', apiAuth.authenticateToken, getProducts);


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Business API Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

apiRoutes.get('/', apiAuth.authenticateToken, (req, res) => {
  res.send('Welcome to the Basket Bear API!')
});

apiRoutes.post('/usertoken', apiAuth.authenticateUser, oauth.server.token());

apiRoutes.post('/token', apiAuth.authenticateClient, oauth.server.token());

apiRoutes.post('/signup', apiUser.addUser);

apiRoutes.get('/renew', apiAuth.authenticateToken, apiUser.generateNewClientSecret);

apiRoutes.get('/user', apiAuth.authenticateToken, apiUser.getClientData);

apiRoutes.get('/search', apiAuth.authenticateToken, getLowestPrices);

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