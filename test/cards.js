const Culqi = require('../lib/culqi');
const Chai = require('chai');
const Should = Chai.should();

const Settings = {    
    commerceKey: process.env.COMMERCE_KEY
};

const culqi = new Culqi(Settings.commerceKey);

describe('Cards', () => {
    var tokenId = '';
    var customerId = '';
    var cardId = '';

    describe('createCard', (done) => {
        it('Should create customer', (done) => {
            culqi.createCustomer({
                'first_name':   'Juan',
                'last_name':    'Godoy',
                'email':        'juan2@godoy.com',
                'address':      'La Calle De Juan 312',
                'address_city': 'Ciudad de Juanes',
                'country_code': 'PE',
                'phone_number': '12345678'
            }).then((response) => {
                response.statusCode.should.equal(201);
                customerId = response.body.id;
                done();
            }).catch((error) => {
                done(error.message);
            });
        });

        it('Should create token', (done) => {
            culqi.createToken({
                'card_number':      '4444333322221111',
                'cvv':              '123',
                'expiration_month':  '09',
                'expiration_year':  '2020',
                'email':            'juan@godoy.com'
            }).then((response) => {
                response.statusCode.should.equal(201);
                tokenId = response.body.id;
                done();
            }).catch((error) => {
                done(error.message);
            });
        });

        it('Should create card', (done) => {
            culqi.createCard({
                'customer_id': customerId,
                'token_id': tokenId
            }).then((response) => {
                response.statusCode.should.equal(201);
                cardId = response.body.id;
                done();
            }).catch((error) => {
                done(error.message);
            });
        });
    });

    describe('getCard', (done) => {
        it('Should get created card', (done) => {
            culqi.getCard({
                id: cardId
            }).then((response) => {
                response.statusCode.should.equal(200);
                done();  
            }).catch((error) => {
                done(error.message);
            });
        });
    });

    describe('getCards', (done) => {
        it('Should get all cards', (done) => {
            culqi.getCards().then((response) => {
                response.statusCode.should.equal(200);
                done();  
            }).catch((error) => {
                done(error.message);
            });
        });
    });

    describe('updateCard', (done) => {
        it('Should create new token', (done) => {
            culqi.createToken({
                'card_number':      '4444333322221111',
                'cvv':              '123',
                'expiration_month':  '09',
                'expiration_year':  '2020',
                'email':            'juan@godoy.com'
            }).then((response) => {
                response.statusCode.should.equal(201);
                token = response.body.id;
                done();
            }).catch((error) => {
                done(error.message);
            });
        });

        it('Should update card data', (done) => {
            culqi.updateCard({
                'id':       cardId,
                'token_id': tokenId
            }).then((response) => {
                response.statusCode.should.equal(200);
                done();
            }).catch((error) => {
                done(error.message);
            });
        });
    });

    describe('deleteCard', (done) => {
        it('Should delete created card', (done) => {
            culqi.deleteCard({
                'id': cardId
            }).then((response) => {
                response.statusCode.should.equal(200);
                done();
            }).catch((error) => {
                done(error.message);
            });
        });

        it('Should delete created customer', (done) => {
            culqi.deleteCustomer({
                'id': customerId
            }).then((response) => {
                response.statusCode.should.equal(200);
                done()
            }).catch((error) => {
                done(error.message);
            })
        });
    });
});