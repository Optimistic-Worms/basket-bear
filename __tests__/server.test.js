const request = require('supertest');
const appServer = require('../server/server');

beforeEach(function() {
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

afterEach(function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});

// afterAll(() => {
//   console.log('closing server');
//   appServer.server.close();
// });

test('should get index page', () => {

  return request(appServer).get('/').expect(200);
  // console.log(response.statusCode);
  //    expect(response.statusCode).toBe(400);
  //    done();
  // });

  //expect(4).toBe(4);
});

