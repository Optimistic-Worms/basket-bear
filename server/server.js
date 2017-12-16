if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  require('dotenv').config();
}

const express = require('express')
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();


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
const webPush = require('web-push');

// VAPID keys should only be generated only once.
//const vapidKeys = webpush.generateVAPIDKeys();
const vapidKeys = { publicKey: 'BLsbtk_kNrAfek4KTxD7ZhNe6HxXkRAf-DHuTxHoT7by4QSSpbACzFr6VmmaWTGyk2ZHG5W710XSdr_ArN0eSxU',
  privateKey: 'mLb3rfv8snnNtfa5EtgAR0teNK6YsaQdZoOc8LXJdF0' }





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
app.get('/', (req,res)=> {
  res.send(200)
});

app.get('/thing', isAuthenticated, (req,res) =>{
  console.log('hit the 200')
  res.sendStatus(200);
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Push Subscription 
* * * * * * * * * * * * * * * * * * * * * * * * * * */

const pushSubscription = {
  endpoint: "https://fcm.googleapis.com/fcm/send/fRrddhOtCak:APA91bEPUDSz02umNG_DFOVvwTycbusoF084IRY2tKfhgN4kvCeIclmSSQ47WSlXXHyAk3dKMYrXoO8dQWLyDMMil5Ol8mde6IKFH29Md8csRY2UKzuUY7KyiZDf2cvkEqoquCn4Kg5R",
  keys: {
    p256dh: vapidKeys.publicKey,
    auth: vapidKeys.privateKey
  }
};

const payload = '< Push Payload String >';
/*const options = {
  gcmAPIKey: '< GCM API Key >',
  vapidDetails: {
    subject: '< \'mailto\' Address or URL >',
    publicKey: '< URL Safe Base64 Encoded Public Key >',
    privateKey: '< URL Safe Base64 Encoded Private Key >'
  },
  TTL: <Number>,
  headers: {
    '< header name >': '< header value >'
  }
}*/

webPush.sendNotification(
  pushSubscription,
  payload,
).then(result => {
  console.log(result)
}).catch(error =>{
  console.log(error)
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  User settings Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/userSettings', isAuthenticated, (req, res) => {
  var username = req.username;
  userSettings.getSettings(username)
  .then((result) => {
    res.status(200).send(result);
  });
});

app.post('/userSettings', isAuthenticated, (req, res) => {
  var username = req.username;
  var data = req.body;
  userSettings.createSettings(username, data)
  .then((result) => {
    res.status(200).send(result);
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

apiRoutes.get('/merchant', apiAuth.authenticateToken, (req, res) => {
  res.send("Yay, you successfully accessed the restricted resource!")
});

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