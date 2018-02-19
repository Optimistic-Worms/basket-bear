const { app, port } = require('./app.js');

const server = app.listen((port || 3000), () => {
  console.log('server is listening on port ' + port);
});