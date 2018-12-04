## Culqi2-node <img src="https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_120,w_120,f_auto,b_white,q_auto:eco/v1502140249/a3l1su1psxnfhzs5hcf0.jpg" alt="culqi_logo">

<a href="https://www.culqi.com/">Culqi</a> API v2 wrapper for Node.js

[![Build Status](https://travis-ci.org/martoriro/culqi2-node.svg?branch=master)](https://travis-ci.org/martoriro/culqi2-node)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/npm.svg)]()

### Installing
```sh
$ npm install culqi2-node
```

### Usage
```javascript
const Culqi = require('culqi2-node');
const culqi = new Culqi(commerceCode, commerceKey);

culqi.getCards();
```

**commerceCode:** Commerce code given by Culqi
**commerceKey:** Commerce key given by Culqi

### Currently available methods

**Customers**

* createCustomer()
* getCustomer()
* getCustomers()
* updateCustomer()
* deleteCustomer()

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