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

/* controllers */
const shoppingList = require('./controllers/shoppingList');
const amazonApiCalls = require('./controllers/amazonApiCalls');
const ebayApiCalls = require('./controllers/ebayApiCalls');

/* dev controllers */
const apiUser = require('./controllers/developer/apiUser.js');
const apiAuth = require('./controllers/developer/auth/apiAuth.js');
const oauth = require('./controllers/developer/auth/oauth2.js');
const passport = require('passport');
const expressValidator = require('express-validator');


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
  Shopping List Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

  //call the request handler
  //send the response after request handler returns a value

app.post('/shoppingList', (req, res) => {
  var username = req.body.username;
  shoppingList.createShoppingList(username)
  .then((data) => {
    res.status(200).send(data);
  });
});

app.get('/shoppingList', isAuthenticated , (req, res) => {
  var username = req.username;
  console.log('username:', username);
  shoppingList.getShoppingList(username)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(200).send(data);
  })
});

app.put('/shoppingList', (req, res) => {
  var username = req.body.username;
  var product = req.body.product;
  shoppingList.addItemToShoppingList(username, product)
  .then((data) => {
    res.status(200).send(data);
  });
});

app.delete('/shoppingList', (req, res) => {
  var username = req.query.username;
  var productId = req.query.productId;
  shoppingList.removeItemFromShoppingList(username, productId)
  .then((data) => {
    res.status(200).send(data);
  });
})

app.put('/updateShoppingList', (req, res) => {
  var username = req.body.username;
  var list = req.body.list;
  shoppingList.updateShoppingList(username, list)
  .then((data) => {
    res.status(200).send(data);
  })
});



/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Product Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */



/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Ebay API Calls
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/searchEbay', (req, res)=> {
  var keyword = req.query.keyword;
  console.log('searching for ', keyword);

  ebayApiCalls.searchEbay(keyword)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(400).send(data);
  })
});

app.get('/lookupEbay', (req, res) => {
  var itemIds = req.query.itemIds;
  ebayApiCalls.lookupEbay(itemIds)
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
  amazonApiCalls.searchAmazon(searchQuery)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(400).send(data);
  })
});

app.get('/lookupAmazon', (req, res) => {
  var itemIds = req.query.itemIds;
  amazonApiCalls.lookupAmazon(itemIds)
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((data) => {
    res.status(400).send(data);
  })
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Business API Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */
const apiRoutes = express.Router();
app.use('/api', apiRoutes);

apiRoutes.get('/', apiAuth.authenticateToken, (req, res) => {
  res.send('Welcome to the Budget Basket API!')
});

apiRoutes.post('/usertoken', apiAuth.authenticateUser, oauth.server.token());

apiRoutes.post('/token', apiAuth.authenticateClient, oauth.server.token());

apiRoutes.post('/signup', apiUser.addUser);

apiRoutes.get('/user', apiAuth.authenticateToken, apiUser.getClientData);

apiRoutes.get('/product', apiAuth.authenticateToken, (req, res) => {
  res.send("Yay, you successfully accessed the restricted resource!")
});

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