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



describe('Test Generic Routes', () => {
  test('should get index page', () => {
    return request(appServer.app).get('/').expect(200);
  });
});


describe('Test Shopping List Routes', () => {
  test('should get request to /shoppingList', () => {
    return request(appServer.app).get('/shoppingList').expect(200);
  });

  test('should post to /shoppingList', () => {
    return request(appServer.app).post('/shoppingList').expect(200);
  });

  test('should put to /shoppingList', () => {
    return request(appServer.app).put('/shoppingList').expect(200);
  });

  test('should delete to /shoppingList', () => {
    return request(appServer.app).delete('/shoppingList').expect(200);
  });
});


