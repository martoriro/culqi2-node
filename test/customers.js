const Culqi = require('../lib/culqi');
const Chai = require('chai');
const Should = Chai.should();

const Settings = {    
    commerceKey: process.env.COMMERCE_KEY
};

const culqi = new Culqi(Settings.commerceKey);

describe('Customers', () => {
    var customerId = '';

    describe('createCustomer', (done) => {
        it('Should delete previous customer', (done) => {
            culqi.deleteCustomer({id: 'cus_test_crGCdb8OGw1vJucV'}).then((response) => {
                response.statusCode.should.equal(200);
                done();
            }).catch((error) => {
                done(error.message);
            });
        })

        it('Should create customer', (done) => {
            culqi.createCustomer({
                'first_name':   "Juan",
                'last_name':    "Godoy",
                'email':        "juan@godoy.com",
                'address':      "La Calle De Juan 312",
                'address_city': "Ciudad de Juanes",
                'country_code': "PE",
                'phone_number': "12345678"
            }).then((response) => {
                response.statusCode.should.equal(201);
                customerId = response.body.id;
                done();
            }).catch((error) => {
                done(error.message);
            });
        });
    });

    describe('getCustomer', (done) => {
        it('Should get created customer', (done) => {
            culqi.getCustomer({
                id: customerId
            }).then((response) => {
                response.statusCode.should.equal(200);
                done();  
            }).catch((error) => {
                done(error.message);
            });
        });
    });

    describe('getCustomers', (done) => {
        it('Should get all customers', (done) => {
            culqi.getCustomers().then((response) => {
                response.statusCode.should.equal(200);
                done();  
            }).catch((error) => {
                done(error.message);
            });
        });
    });

    describe('updateCustomer', (done) => {
        it('Should update customer data', (done) => {
            culqi.updateCustomer({
                'id':           customerId,
                'first_name':   "John",
                'last_name':    "Godeer",
                'email':        "john@godeer.com",
                'address':      "John's Street 312",
                'address_city': "City of Juanes",
                'country_code': "USA",
                'phone_number': "87654321"
            }).then((response) => {
                response.statusCode.should.equal(200);
                done();
            }).catch((error) => {
                done(error.message);
            });
        });
    });

    describe('deleteCustomer', (done) => {
        it('Should delete created customer', (done) => {
            culqi.deleteCustomer({
                'id': customerId
            }).then((response) => {
                response.statusCode.should.equal(200);
                done();
            }).catch((error) => {
                done(error.message);
            });
        });
    });
});