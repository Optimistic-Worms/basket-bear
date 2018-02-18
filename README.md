# Basket Bear

> An open source web application that provides the lowest prices for products from Amazon and Ebay. Users can can easily search for products and add them to a watch list to receive notifications for price drops and set a target price to wait for. A service worker checks prices regularly and updates the user’s watch list.

The application also provides a public REST API for using the search engine and for retrieving requested price information for products and other marketing data like most popular products. Merchants, businesses, and developers can sign up for free access to our API through the Developers page and learn how to use it by reading our documentation.


## Team

  - __Product Owner__: Jason
  - __Scrum Master__: Diana
  - __Git Workflow__: Nick
  - __Software Engineering__: Candice, Jason, Diana, Nick

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

- [UI](https://basketbear.com/) is for getting notification when the price of a requested item drops
- [Buisness API](https://basketbear.com/dev) is used for scanning customers requests, and accessing Amazon and Ebay's advertising APIs.

## Requirements

- Node.js
- Express
- React
- Firestore
- Amazon/Ebay APIs
- Apps Script or Amazon SMPT API - For mail


## Development
npm scripts are provided for running tests and launching dev middleware locally

runs test all suites using Jest
```sh
npm run test
```

start the server with nodemon and webpack-dev-middleware:
```sh
npm run server
```

start the server with nodemon, webpack-dev middleware,-and webpack-hot-middleware:
```sh
npm run hot
```



### Installing Dependencies

From within the root directory:

```sh
npm install
```

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
