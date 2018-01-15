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

const express = require('express');
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

/* Routes */
const { apiRouter } = require('./routes/apiRoutes.js')
const { shoppingListRouter } = require('./routes/shoppingListRoutes.js');
const { amazonRouter } = require('./routes/amazonRoutes.js');
const { ebayRouter } = require('./routes/ebayRoutes.js');
const { settingsRouter } = require('./routes/settings.js');

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

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  API Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */
app.use('/api', apiRouter);
app.use('/shoppingList', shoppingListRouter);
app.use('/amazon', amazonRouter);
app.use('/ebay', ebayRouter);
app.use('/userSettings', settingsRouter);

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

app.post('/watchedItems', isAuthenticated, watch.addToWatchList);
app.put('/watchedItems', isAuthenticated, watch.removeFromWatchList);
app.get('/watchedItemsWorker', isCronAuthenticated, watch.watchListWorker);

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