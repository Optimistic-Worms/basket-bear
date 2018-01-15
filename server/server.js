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
const webpackHotMiddleware = require('webpack-hot-middleware');

const path = require('path');
const port = process.env.PORT || 3000;

/* controllers */
const isAuthenticated = require('./controllers/authroutes.js').isAuthenticated;
const isCronAuthenticated = require('./controllers/authroutes.js').isCronAuthenticated;

/* dev controllers */
const passport = require('passport');

/* Routes */
const { apiRouter } = require('./routes/apiRoutes.js')
const { shoppingListRouter } = require('./routes/shoppingListRoutes.js');
const { amazonRouter } = require('./routes/amazonRoutes.js');
const { ebayRouter } = require('./routes/ebayRoutes.js');
const { settingsRouter } = require('./routes/settings.js');
const { watchedItemsRouter } = require('./routes/watchedItemsRoutes.js');

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
/* Amazon mailer */
const amazonMail = require('./controllers/emailNotifications');


let config;
(port === 3000)? config = require('../webpack.dev.js') : config = require('../webpack.prod.js');
const compiler = webpack(config);

app.use(passport.initialize());

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
Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.use('/shoppingList', shoppingListRouter);
app.use('/amazon', amazonRouter);
app.use('/ebay', ebayRouter);
app.use('/userSettings', settingsRouter);
app.use('/watchedItems', watchedItemsRouter);

app.use('/api', apiRouter);

app.get('/thing', isAuthenticated, (req,res) =>{
  console.log('hit the 200')
  res.sendStatus(200);
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Amazon mailer
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/amazonmail', amazonMail.sendMail)

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