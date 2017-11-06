const express = require('express')
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const signup = require('./authroutes.js').signup;
const manualSignIn = require('./authroutes.js').manualSignIn;
const manualLogout = require('./authroutes.js').manualLogout;


let config;
(port === 3000)? config = require('../webpack.dev.js') : config = require('../webpack.prod.js');
const compiler = webpack(config);


console.log('server is running');

app.use(express.static(__dirname));

app.use(webpackDevMiddleware( compiler, {
  publicPath: config.output.publicPath
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));

app.listen(port || 3000)

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  API Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/', (req,res)=>{
  res.sendStatus(200);
})

app.get('/signup',signup)
app.get('/login',manualSignIn)
app.get('/logout',manualLogout)


/************** fallback route **************************/

/* Compression to g-zip*/
app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('*', (req,res) =>{
  res.sendFile(path.resolve(__dirname, './index.html'))
});

module.exports = app;