const request = require('supertest');
const appServer = require('../server/server');

beforeEach(function() {
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
});

afterEach(function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});

afterAll(() => {
  console.log('close server');
  appServer.server.close();
  console.log('close webpack instance');
  appServer.webpackDevMiddlewareInstance.close();
});


test('should get index page', () => {
  return request(appServer.app).get('/').expect(200);
});

test('should test that it fails too', () => {
  return request(appServer.app).get('/').expect(400);
});




