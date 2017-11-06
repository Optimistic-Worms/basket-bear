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
app.use(bodyParser.json({ type: 'application/*+json' }));



/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  API Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */


app.get('/', (req,res)=>{
  res.sendStatus(200);
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Shopping List Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.post('/shoppingList', (req, res) => {
  requestHandlers.createShoppingList(req, res);
});

app.get('/shoppingList', (req, res) => {
  requestHandlers.getShoppingList(req, res);
});

app.put('/shoppingList', (req, res) => {
  requestHandlers.addItemToShoppingList(req, res);
});

app.delete('/shoppingList', (req, res) => {
  requestHandlers.removeItemFromShoppingList(req, res);
})


/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Product Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/signup',signup)
app.get('/login',manualSignIn)
app.get('/logout',manualLogout)





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