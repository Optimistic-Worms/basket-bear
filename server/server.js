if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  require('dotenv').config();
}

console.log('AMAZON_PUBLIC_KEY', process.env.AMAZON_PUBLIC_KEY)

const express = require('express')
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const requestHandlers = require('./request-handlers');
const path = require('path');
const port = process.env.PORT || 3000;
<<<<<<< HEAD
=======
const signup = require('./authroutes.js').signup;
const manualSignIn = require('./authroutes.js').manualSignIn;
const manualLogout = require('./authroutes.js').manualLogout;
>>>>>>> d9d6e9d... merging
const isAuthenticated = require('./authroutes.js').isAuthenticated;
const axios = require('axios')
const EBAYKEY = process.env.EBAY_KEY;
const moment = require('moment')
const tz = require('moment-timezone-all');
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");
const CryptoJS = require("crypto-js");
<<<<<<< HEAD
/*const AMZPRKEY = require("./amazonConfig").PrivateKey
const ASSCTAG = require("./amazonConfig").AssociateTag
const AMZPUKEY = require("./amazonConfig").PublicKey*/
const parseString = require('xml2js').parseString;
const getToken = require('./authroutes.js').getToken;

=======
const parseString = require('xml2js').parseString;
>>>>>>> d9d6e9d... merging


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

<<<<<<< HEAD
app.get('/thing', isAuthenticated, (req, res) =>{
 // console.log(res)
  res.sendStatus(200);
});


=======
app.get('/thing', isAuthenticated, (req,res) =>{
  console.log('hit the 200')
  res.sendStatus(200);
});

>>>>>>> d9d6e9d... merging
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
    var results = JSON.parse(response.data.slice(28, -1));
    var items = results.findItemsByKeywordsResponse[0].searchResult[0].item;
    res.send(JSON.stringify(parseEbayResults(items)));
  })
  .catch(function (error) {
    console.log("ERROR: GET request from Ebay Failing " + error);
  });

});


var parseEbayResults = function(searchResults) {
  var items = [];

  for (var i = 0 ; i < searchResults.length ; i++) {
    var product = {
      id: searchResults[i].itemId[0],
      name: searchResults[i].title[0],
      imageUrl: searchResults[i].galleryURL[0],
      merchant: 'eBay',
      price: searchResults[i].sellingStatus[0].currentPrice[0].__value__,
      link: searchResults[i].viewItemURL[0]
    }
    items.push(product);
  }
  return items;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Amazon API Calls
* * * * * * * * * * * * * * * * * * * * * * * * * * */

<<<<<<< HEAD
/*app.get('/searchAmazon', (req, res) => {
  let date = moment().tz('Europe/London').format("YYYY-MM-DDTHH:mm:ss.000") + 'Z'
  console.log(date);*/

  /** Wrapper to sign and stamp Amazon GET Request **/
/*  const getAmazonItemInfo = (keywords) => {
=======
app.get('/searchAmazon', (req, res) => {
  let date = moment().tz('Europe/London').format("YYYY-MM-DDTHH:mm:ss.000") + 'Z'
  console.log(date);

  /** Wrapper to sign and stamp Amazon GET Request **/
  const getAmazonItemInfo = (keywords) => {
>>>>>>> d9d6e9d... merging

    const {AMAZON_PUBLIC_KEY, AMAZON_PRIVATE_KEY, AMAZON_ASSOCIATE_TAG} = process.env;
    let parameters = [];
    let url = 'webservices.amazon.com' // US account

    parameters.push("AWSAccessKeyId=" + AMAZON_PUBLIC_KEY);
    parameters.push("Keywords=" + keywords);
    parameters.push("Operation=ItemSearch");
    parameters.push("SearchIndex=All");
    parameters.push("ResponseGroup=" + encodeURIComponent('Images,ItemAttributes,Offers'));
    parameters.push("Service=AWSECommerceService");
    parameters.push("Timestamp=" + encodeURIComponent(date));
    parameters.push("AssociateTag=" + AMAZON_ASSOCIATE_TAG);
    parameters.sort();

    let paramString = parameters.join('&');
    let string_to_sign = "GET\n" + url + "\n" + "/onca/xml\n" + paramString

    let signature = CryptoJS.HmacSHA256(string_to_sign, AMAZON_PRIVATE_KEY);
    signature = CryptoJS.enc.Base64.stringify(signature);

    let amazonUrl = "http://" + url + "/onca/xml?" + paramString + "&Signature=" + signature;
    console.log('SEND TO URL:', amazonUrl);
    return amazonUrl;
  }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  let keywords = 'iphone'*/
  /** Callback to Get Response **/
/*  axios.get(getAmazonItemInfo(keywords), {params: {}}).then(function(response) {
=======
  let keywords = 'iphone'
=======
  //let keywords = 'iphone'
  var keywords = req.query.keyword;
>>>>>>> cf05bd1... client searches amazon using search query instead of default.  client clears search results when switching search merchants
=======
  //let keywords = 'iphone'
=======
>>>>>>> 922c07c... add button to add item to shopping list
  var keywords = req.query.keyword;
>>>>>>> 01b3bbb... client searches amazon using search query instead of default.  client clears search results when switching search merchants
  /** Callback to Get Response **/
<<<<<<< HEAD
  axios.get(getAmazonItemInfo(keywords), {params: {}}).then(function(response) {
>>>>>>> d9d6e9d... merging
    console.log("😵😵😵😵😵😵: ", response.data, " 😵😵😵😵😵😵")
=======
  var sendToUrl = getAmazonItemInfo(keywords);
  axios.get(sendToUrl, {params: {}}).then(function(response) {
<<<<<<< HEAD
    //console.log('SENDING TO URL', sendToUrl);
    //console.log('response:', response.data);
>>>>>>> ebbff0b... add amazon search to client
=======
>>>>>>> 922c07c... add button to add item to shopping list
    parseString(response.data, function (err, result) {
        console.dir(result);
        res.send(result);
    });

  }).catch(function(error) {
    console.log("ERROR: GET request from Amazon Failing " + error);
    res.sendStatus(404);
  });

<<<<<<< HEAD
});*/
=======
});
>>>>>>> d9d6e9d... merging

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Busisness API Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */
const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
  res.send('Welcome to the Budget Basket API!')
});

apiRoutes.get('/login', (req, res) => {
  //todo
});

apiRoutes.get('/signup', (req, res) => {
  //todo
});

apiRoutes.get('/logout', (req, res) => {
  //todo
});

apiRoutes.get('/product', (req, res) => {
  //todo
});

apiRoutes.get('/merchant', (req, res) => {
  //todo
});

app.use('/api', apiRoutes)
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
<<<<<<< HEAD
=======
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  require('dotenv').config();
}

const express = require('express')
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const requestHandlers = require('./request-handlers');
const path = require('path');
const port = process.env.PORT || 3000;
const isAuthenticated = require('./authroutes.js').isAuthenticated;
const axios = require('axios')
const EBAYKEY = process.env.EBAY_KEY;
const moment = require('moment')
const tz = require('moment-timezone-all');
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");
const CryptoJS = require("crypto-js");
const AMZPRKEY = require("./amazonConfig").PrivateKey
const ASSCTAG = require("./amazonConfig").AssociateTag
const AMZPUKEY = require("./amazonConfig").PublicKey
const parseString = require('xml2js').parseString;
const getToken = require('./authroutes.js').getToken;



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

app.get('/thing', isAuthenticated, (req, res) =>{
 // console.log(res)
  res.sendStatus(200);
});


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
    var results = JSON.parse(response.data.slice(28, -1));
    var items = results.findItemsByKeywordsResponse[0].searchResult[0].item;
    res.send(JSON.stringify(parseEbayResults(items)));
  })
  .catch(function (error) {
    console.log("ERROR: GET request from Ebay Failing " + error);
  });

});


var parseEbayResults = function(searchResults) {
  var items = [];

  for (var i = 0 ; i < searchResults.length ; i++) {
    var product = {
      id: searchResults[i].itemId,
      name: searchResults[i].title,
      imageUrl: searchResults[i].galleryURL,
      merchant: 'eBay',
      price: searchResults[i].sellingStatus[0].currentPrice[0].__value__,
      link: searchResults[i].viewItemURL
    }
    items.push(product);
  }
  return items;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Amazon API Calls
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/searchAmazon', (req, res) => {
  let date = moment().tz('Europe/London').format("YYYY-MM-DDTHH:mm:ss.000") + 'Z'
  console.log(date);

  /** Wrapper to sign and stamp Amazon GET Request **/
  const getAmazonItemInfo = (keywords) => {

    let PrivateKey = AMZPRKEY;
    let PublicKey = AMZPUKEY;
    let AssociateTag = ASSCTAG;
    let parameters = [];
    let url = 'webservices.amazon.com' // US account

    parameters.push("AWSAccessKeyId=" + PublicKey);
    parameters.push("Keywords=" + keywords);
    parameters.push("Operation=ItemSearch");
    parameters.push("SearchIndex=All");
    parameters.push("ResponseGroup=" + encodeURIComponent('Images,ItemAttributes,Offers'));
    parameters.push("Service=AWSECommerceService");
    parameters.push("Timestamp=" + encodeURIComponent(date));
    parameters.push("AssociateTag=" + AssociateTag);
    parameters.sort();

    let paramString = parameters.join('&');
    let string_to_sign = "GET\n" + url + "\n" + "/onca/xml\n" + paramString

    let signature = CryptoJS.HmacSHA256(string_to_sign, PrivateKey);
    signature = CryptoJS.enc.Base64.stringify(signature);

    let amazonUrl = "http://" + url + "/onca/xml?" + paramString + "&Signature=" + signature;
    console.log(amazonUrl);
    return amazonUrl;
  }

  let keywords = 'iphone'
  /** Callback to Get Response **/
  axios.get(getAmazonItemInfo(keywords), {params: {}}).then(function(response) {
    console.log("😵😵😵😵😵😵: ", response.data, " 😵😵😵😵😵😵")

    var amazonData = parseString(response.data, function (err, result) {
        console.dir(result);
        return result;
    });
    res.send(amazonData);
  }).catch(function(error) {
    console.log("ERROR: GET request from Amazon Failing " + error);
  });

});

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Busisness API Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */
const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
  res.send('Welcome to the Budget Basket API!')
});

apiRoutes.get('/login', (req, res) => {
  //todo
});

apiRoutes.get('/logout', (req, res) => {
  //todo
});

apiRoutes.get('/product', (req, res) => {
  //todo
});

apiRoutes.get('/merchant', (req, res) => {
  //todo
});

app.use('/api', apiRoutes)
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
=======
>>>>>>> d9d6e9d... merging
