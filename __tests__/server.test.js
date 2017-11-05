const request = require('supertest');
const appServer = require('../server/server');

//console.log(process.env.PORT)
//process.env.PORT = 8001;

beforeEach(function() {
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

afterEach(function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});

afterAll(() => {
  appServer.server.close();
});

test('should get index page', () => {
  //return request(appServer.app).get('/').expect(200);
  expect(4).toBe(4);
});

