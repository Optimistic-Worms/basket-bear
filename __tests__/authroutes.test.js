const signup = require('../server/authroutes.js').signup
const firebasemock = require('firebase-mock');
const mockdatabase = new firebasemock.MockFirebase();
const mockauth = new firebasemock.MockFirebase();
const mocksdk = new firebasemock.MockFirebaseSdk(path => {
  return path ? mockdatabase.child(path) : mockdatabase;
}, () => {
  return mockauth;
});


const firebase = mocksdk.initializeApp(); // can take a path arg to database url

describe('(Container) App', () => {
  it('should', () => {
    const actual = mapStateToProps({ui: {}}, {firebase});

    // ** expect firebase here to be mocked **
    expect(actual.addTodo).not.toBeUndefined();
    // ...
  })
})


