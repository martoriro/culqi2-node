const Culqi = require('../lib/culqi');
const Chai = require('chai');
const Should = Chai.should();

const Settings = {    
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY
};

const culqi = new Culqi(Settings.privateKey, Settings.publicKey);

describe('Customers', () => {
    var customerId = '';
    describe('createCustomer', (done) => {
        it('Should create customer', (done) => {
            culqi.createCustomer({
                'first_name':   'Juan',
                'last_name':    'Godoy',
                'email':        'jgodoy2@godoy.com',
                'address':      'La Calle De Juan 312',
                'address_city': 'Ciudad de Juanes',
                'country_code': 'PE',
                'phone_number': '12345678'
            }).then((response) => {
                response.statusCode.should.equal(201);
                customerId = response.body.id;
                done(); 
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('getCustomer', (done) => {
        it('Should get created customer', (done) => {
            culqi.getCustomer({
                'id': customerId
            }).then((response) => {
                response.statusCode.should.equal(200);
                done();  
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('getCustomers', (done) => {
        it('Should get all customers', (done) => {
            culqi.getCustomers().then((response) => {
                response.statusCode.should.equal(200);
                done();  
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('updateCustomer', (done) => {
        it('Should update customer data', (done) => {
            culqi.updateCustomer({
                'id':           customerId,
                'first_name':   "John",
                'last_name':    "Godeer",
                'email':        "jgodeer@godeer.com",
                'address':      "John's Street 312",
                'address_city': "City of Juanes",
                'country_code': "US",
                'phone_number': "87654321"
            }).then((response) => {
                response.statusCode.should.equal(200);
                done();
            }).catch((error) => {
                done(error);
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
                done(error);
            });
        });
    });
});