const express = require('express')
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const requestHandlers = require('./request-handlers');
const path = require('path');
const port = process.env.PORT || 3000;
const signup = require('./authroutes.js').signup;
const manualSignIn = require('./authroutes.js').manualSignIn;
const manualLogout = require('./authroutes.js').manualLogout;
const isAuthenticated = require('./authroutes.js').isAuthenticated;
const axios = require('axios')
const EBAYKEY = require('./ebaykey').EBAYKEY



let config;
(port === 3000)? config = require('../webpack.dev.js') : config = require('../webpack.prod.js');
const compiler = webpack(config);



app.use(express.static(__dirname));

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

app.get('/signup',signup)
app.get('/login',manualSignIn)
app.get('/logout',manualLogout)

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Shopping List Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

  //call the request handler
  //send the response after request handler returns a value

app.post('/shoppingList', (req, res) => {
  var username = req.body.username;
  requestHandlers.createShoppingList(username);
  res.status(200).send('you made a new shopping list');
});

app.get('/shoppingList', (req, res) => {
  var username = req.body.username;
  requestHandlers.getShoppingList(username);
  res.status(200).send('here is the shopping list');
});

app.put('/shoppingList', (req, res) => {
  var username = req.body.username;
  var product = req.body.product;
  requestHandlers.addItemToShoppingList(username, product);
  res.status(200).send('adding item to shopping list');
});

app.delete('/shoppingList', (req, res) => {
  var username = req.body.username;
  var productId = req.body.productId;
  requestHandlers.removeItemFromShoppingList(username, productId);
  res.status(200).send('removed item from shopping list');
})


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Product Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */



/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Ebay API Calls
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/searchEbay', (req, res)=> {
  var keyword = req.query.keyword;
  console.log('searching for ', keyword);

  axios.get('https://svcs.ebay.com/services/search/FindingService/v1?', {
    params: {
      "OPERATION-NAME": "findItemsByKeywords",
      "SERVICE-VERSION": "1.0.0",
      "RESPONSE-DATA-FORMAT": "JSON",
      "callback": "_cb_findItemsByKeywords",
      "keywords": keyword,
      "paginationInput.entriesPerPage":"20",
      "GLOBAL-ID": "EBAY-US",
      "siteid": "0",
      "SECURITY-APPNAME": EBAYKEY
    }
  })
  .then(function (response) {
    var results = response.data.slice(28, -1);
    res.send(results);
  })
  .catch(function (error) {
    console.log("ERROR: GET request from Ebay Failing " + error);
  });

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
  res.sendFile(path.resolve(__dirname, './index.html'))
});




module.exports.server = server;
module.exports.app = app;
module.exports.webpackDevMiddlewareInstance = webpackDevMiddlewareInstance;


