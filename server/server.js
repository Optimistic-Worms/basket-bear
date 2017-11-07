const express = require('express')
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();


const path = require('path');
const port = process.env.PORT || 3000;

let config;
(port === 3000)? config = require('../webpack.dev.js') : config = require('../webpack.prod.js');
const compiler = webpack(config);


app.use(express.static(__dirname));

app.use(webpackDevMiddleware( compiler, {
  publicPath: config.output.publicPath
}));

const server = app.listen(port || 3000);
console.log('server is listening on port ' + port);

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
  API Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/', (req,res)=>{
  res.sendStatus(200);
})


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



module.exports.server = server;
module.exports.app = app;