const request = require('supertest');
const { app } = require('../server/app.js');

describe('Test Generic Routes', () => {
  test('should get index page', (done) => {
    request(app).get('/').then((res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  test('should get index page when requesting non-existent route', (done) => {
    request(app).get('/random').then((res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
});

describe('Test Autheticated Routes', () => {
  test('should authenticate all GET requests to the shopping list route', (done) => {
    request(app).get('/shoppingList').then((res) => {
      console.log(res.data);
      done();
    });
  });
});



//describe('Test Shopping List Routes', () => {
 // test('should accept GET requests to /shoppingList', () => {
    // var data = { username: 'Candice'};

    // return request(appServer.app)
    // .get('/shoppingList', data)
    // .send(data)
    // .expect(200);
  //});

  //test('should accept POST requests to /shoppingList', () => {
    // var data = { username : 'Candice'};

    // return request(appServer.app)
    // .post('/shoppingList')
    // .send(data)
    // .expect(200);
  //});

  //test('should accept PUT requests to /shoppingList', () => {
    // var data = {
    //   username: 'Candice',
    //   product: {
    //     id: 1,
    //     name: 'Table',
    //     imageUrl: 'table.jpg',
    //     description: 'Brown, rectanglar coffee table',
    //     merchant: 'Amazon',
    //     link: 'table.com',
    //     listedPrice: 56.99,
    //     requestedPrice: 40.00
    //   }
    // };

    // return request(appServer.app)
    // .put('/shoppingList')
    // .send(data)
    // .expect(200);
  //});

  //test('should accept DELETE requests to /shoppingList', () => {
    // var data = {
    //   username: 'Candice',
    //   productId: 1
    // };

    // return request(appServer.app)
    // .delete('/shoppingList')
    // .send(data)
    // .expect(200);
  //});

//});

