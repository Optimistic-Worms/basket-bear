# Basket Bear

An open source web application that provides the lowest prices for products from Amazon and Ebay. Users can can easily search for products and add them to a watch list to receive notifications for price drops and set a target price to wait for. A service worker checks prices regularly and updates the user’s watch list.

The application also provides a public REST API for using the search engine and for retrieving requested price information for products and other marketing data like most popular products. Merchants, businesses, and developers can sign up for free access to our API through the Developers page and learn how to use it by reading our documentation.

## Table of Contents

1. [Team](#Team)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [NPM Scripts](#npm-scripts)
    1. [Docker](#docker)
    1. [Environment](#environment)
1. [Contributing](#contributing)
1. [Public API](#public-api)

## Team

  - __Product Owner__: Jason
  - __Scrum Master__: Diana
  - __Git Workflow__: Nick
  - __Software Engineering__: Candice, Jason, Diana, Nick

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

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### NPM Scripts
npm scripts are provided for running tests and launching dev middleware locally

From within the root directory:

Run test all suites using Jest:
```sh
npm run test
```

Run server test suites using Jest:
```sh
npm run server-test
```

Start the server with nodemon and webpack-dev-middleware:
```sh
npm run server
```

Start the server with nodemon, webpack-dev-middleware, and webpack-hot-middleware:
```sh
npm run hot
```

### Docker
Docker 17.x must be installed to use the following npm scripts:
Container is mapped to local port 8000

Launch a local docker container and run all test suites inside:
```sh
npm run prod-test
```

Launch a local docker container and start the server with nodemon, webpack-dev middleware, and webpack-hot-middleware:
```sh
npm run container
```

### Environment
create a hidden file called .env in the root of the project that contains values for the environment variables below:

- EBAY_KEY
- AMAZON_PUBLIC_KEY
- AMAZON_PRIVATE_KEY
- AMAZON_ASSOCIATE_TAG
- VAPID_SUBJECT
- VAPID_PUBLIC_KEY
- VAPID_PRIVATE_KEY
- AUTH_SECRET
- CRON_AUTH
- CRON_TOKEN
- SMPT_USERNAME
- SMPT_PW

environment variables are not necessary to run tests
The .env file is ignored by git

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.

## Public API
see our [Developers Page](https://www.basketbear.com/dev) for instructions opn how to sign up and access the Basket Bear Web API

