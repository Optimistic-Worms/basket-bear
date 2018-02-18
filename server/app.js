if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
 require('dotenv').config();
}

if(process.env.NODE_ENV !== 'test'){
  const webPush = require('web-push');
  const emailAuth = process.env.EMAIL_AUTH
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
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const passport = require('passport');

/* Check disposable email*/
const checkEmail = require('./controllers/disposableEmailList');
/* Amazon mailer */
const amazonMail = require('./controllers/emailNotifications');


/* Routes */
const { apiRouter } = require('./routes/apiRoutes.js')
const { shoppingListRouter } = require('./routes/shoppingListRoutes.js');
const { amazonRouter } = require('./routes/amazonRoutes.js');
const { ebayRouter } = require('./routes/ebayRoutes.js');
const { settingsRouter } = require('./routes/settingsRoutes.js');
const { watchedItemsRouter } = require('./routes/watchedItemsRoutes.js');
const { subscribeRouter } = require('./routes/subscribeRoutes.js');
const { notificationsRouter } = require('./routes/notificationsRoutes.js');

/* Initialize Express */
const port = process.env.PORT || 3000;
const app = express();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(__dirname));

/* Initialize Webpack */
if (process.env.NODE_ENV !== 'test') {
  let config;
  (port === 3000)? config = require('../webpack.dev.js') : config = require('../webpack.prod.js');
  const compiler = webpack(config);

  const webpackDevMiddlewareInstance = webpackDevMiddleware( compiler, {
    publicPath: config.output.publicPath
  });

  app.use(webpackDevMiddlewareInstance);

  if (process.env.HOT) {
    app.use(webpackHotMiddleware(compiler));
  }

  module.exports.webpackDevMiddlewareInstance = webpackDevMiddlewareInstance;
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * *
Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.use('/shoppingList', shoppingListRouter);
app.use('/amazon', amazonRouter);
app.use('/ebay', ebayRouter);
app.use('/userSettings', settingsRouter);
app.use('/watchedItems', watchedItemsRouter);
app.use('/subscribe', subscribeRouter);
app.use('/runnotifications', notificationsRouter);
app.use('/api', apiRouter);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Amazon mailer
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/amazonmail', amazonMail.sendMail)

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  Check for disposable email
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/checkemail', checkEmail.check)

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

module.exports.app = app;
module.exports.port = port;