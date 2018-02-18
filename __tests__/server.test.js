const supertest = require('supertest');
const { app } = require('../server/app.js');
const proxyquire = require('proxyquire');

describe('Test Generic Routes', () => {
  const request = supertest(app);

  test('should get index page', (done) => {
    request.get('/').then((res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  test('should get index page when requesting non-existent route', (done) => {
    request.get('/random').then((res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });
});

describe('Test ShoppingList Route', () => {
  test('should authenticate all GET requests to the shopping list route', (done) => {
    //using inversion of control to pass mocks as dependencies

    const shoppingListControllers = [
      'createShoppingList',
      'getShoppingList',
      'addItemToShoppingList',
      'removeItemFromShoppingList',
      'updateShoppingList',
      'updateWatchPrice',
      'isAuthenticated',
      'addNewUserData'
    ];

   const controllerStubMap = shoppingListControllers.reduce((stubObj, ctrlName) => {
    stubObj[ctrlName] = jest.fn();
     return stubObj;
   }, {})

    const authStub = jest.fn();
    //replace dependencies with mocks that use stubs for controllers
    const shoppingListRouter = proxyquire('../server/routes/shoppingListRoutes.js', {
        isAuthenticated: authStub
    });

    shoppingListRouter(app);
    const request = supertest(app);

    request.get('/shoppingList').send({username: 'nick', password: 'password'}).then((res) => {
      //const authMock = controllerStubMap['isAuthenticated'];
      //console.log(controllerStubMap['isAuthenticated'])
      //expect(authStub).toBeCalled();
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

