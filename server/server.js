const { NODE_ENV, PORT } = process.env;

if (NODE_ENV !== 'production' && NODE_ENV !== 'test') {
 require('dotenv').config();
}

if (NODE_ENV !== 'test'){
  const webPush = require('web-push');
  const { VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY , } = process.env;
  const emailAuth = process.env.EMAIL_AUTH;
  webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}
/* Initialize Express */
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

app.use(express.static(__dirname));

/* Initialize Webpack */
const webpack = require('webpack');
const config = require(NODE_ENV === 'production' ? '../webpack.prod.js' : '../webpack.dev.js');

const compiler = webpack(config);

if (NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackDevMiddlewareInstance = webpackDevMiddleware( compiler, {
    publicPath: config.output.publicPath
  });

  app.use(webpackDevMiddlewareInstance);
  exports.webpackDevMiddlewareInstance = webpackDevMiddlewareInstance;

  if (process.env.HOT) {
    app.use(webpackHotMiddleware(compiler));
  }
}

/* Initialize Passport */
const passport = require('passport');
app.use(passport.initialize());

/* Check disposable email*/
const checkEmail = require('./controllers/disposableEmailList');
/* Amazon mailer */
const amazonMail = require('./controllers/emailNotifications');


/* Routers */
const { apiRouter } = require('./routes/apiRoutes.js')
const { shoppingListRouter } = require('./routes/shoppingListRoutes.js');
const { amazonRouter } = require('./routes/amazonRoutes.js');
const { ebayRouter } = require('./routes/ebayRoutes.js');
const { settingsRouter } = require('./routes/settingsRoutes.js');
const { watchedItemsRouter } = require('./routes/watchedItemsRoutes.js');
const { subscribeRouter } = require('./routes/subscribeRoutes.js');
const { notificationsRouter } = require('./routes/notificationsRoutes.js');
const { fallbackRouter } = require('./routes/fallbackRoutes.js');

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

/* Compression to g-zip*/
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});
app.use('/*', fallbackRouter);
const port = PORT || 3000;
const server = app.listen(port || 3000);
console.log('server is listening on port ' + port);

module.exports.server = server;