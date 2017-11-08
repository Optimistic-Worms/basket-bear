const requestHandlers = require('../server/request-handlers');



var request = (url, method, postdata) => {
  this.url = url;
  this.method = method;
  this.postData = postdata;
  this.addListener = this.on = function(type, callback) {
    if (type === 'data') {
      callback(JSON.stringify(this._postData));
    }

    if (type === 'end') {
      callback();
    }

  }.bind(this);
}

var response = () => {
  this._ended = false;
  this._responseCode = null;
  this._headers = null;
  this._data = null;

  this.status = (responseCode) => {
    this._responseCode = responseCode;
  }

  this.send = (data) => {
    this._data = data;
    this._ended = true;
  }

}



describe('Create Shopping List Function', () => {

  test('Should Receive Username in Request Data', () => {

  });
  test('Should Create a Shopping List Document', () => {

  });
  test('Should Add Shopping List Document to Shopping List Collection', () => {

  });
  test('Should Return Confirmation After Successfully Adding to DB', () => {

  });
  test('Should return Error if a user shopping List already exists', () => {

  });
  test('Should ', () => {

  });

});

describe('Get Shopping List Function', () => {

  test('Should Receive Username in Request Data', () => {

  });
  test('Should Get the Shopping List from the Database', () => {

  });
  test('Should send the Items Array back in the response', () => {

  });

});

describe('Add Item to Shopping List Function', () => {

  test('Should Receive the Username and Product Object in the Request Data', () => {

  });
  test('Should Query the Database for the Users Shopping List', () => {

  });
  test('Should Push the new product to the Shopping List Items Array', () => {

  });
  test('Should send the new Items Array back in the Response', () => {

  });

});

describe('Remove Item from Shopping List Function', () => {

  test('Should Receive the Username and Product ID in the Request Data', () => {

  });
  test('Should get the users shopping list', () => {

  });
  test('Should remove the product from the Shopping List Items Array', () => {

  });
  test('Should send the new Items Array Back in the Response', () => {

  });

});