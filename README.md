## Culqi2-node

[![npm version](https://badge.fury.io/js/culqi2-node.svg)](https://badge.fury.io/js/culqi2-node)
[![Build Status](https://travis-ci.org/martoriro/culqi2-node.svg?branch=master)](https://travis-ci.org/martoriro/culqi2-node)
[![Coverage Status](https://coveralls.io/repos/github/martoriro/culqi2-node/badge.svg?branch=master)](https://coveralls.io/github/martoriro/culqi2-node?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/npm.svg)]()

<a href="https://www.culqi.com/">Culqi</a> API v2 wrapper for Node.js based in <a href="https://www.npmjs.com/package/culqi-node">Culqi API v1.2 wrapper</a> by <a href="https://github.com/giwiro">giwiro</a>

### Installing
```sh
$ npm install culqi2-node
```

### Usage
```javascript
const Culqi = require('culqi2-node');
const culqi = new Culqi(commerceKey);

culqi.getCards();
```

`commerceKey: Private key given by Culqi`

### Currently available methods

**Customers**

* createCustomer()
* getCustomer()
* getCustomers()
* updateCustomer()
* deleteCustomer()

**Tokens**

* createToken()

**Cards**

* createCard()
* getCard()
* getCards()
* updateCard()
* deleteCard()

**Charges**

* createCharge()
* getCharge()
* getCharges()
* updateCharge()
* captureCharge()

**Events**

* getEvent()
* getEvents()

For more info about method attributes visit <a href="https://www.culqi.com/api/">Culqi API Docs</a>. You could also see the tests on `test` folder.

### Tests

```sh
npm test
```

### Contributing

Fork this and do whatever you want.