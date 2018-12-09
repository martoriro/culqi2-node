const Culqi = require('../lib/culqi');
const Chai = require('chai');
const Should = Chai.should();

const Settings = {    
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY
};

const culqi = new Culqi(Settings.privateKey, Settings.publicKey);

describe('Cards', () => {
    var tokenId = '';
    var customerId = '';
    var cardId = '';

    describe('clean', (done) => {
        it('Should delete all customers', (done) => {
            culqi.getCustomers().then(async (response) => {
                response.statusCode.should.equal(200);
                for(let i = 0; i < response.body.data.length; i++){
                    await culqi.deleteCustomer({
                        'id': response.body.data[i].id
                    }).catch((error) => {
                        done(error);
                    });
                }
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('createCard', (done) => {
        it('Should create customer', (done) => {
            culqi.createCustomer({
                'first_name':   'Juan',
                'last_name':    'Godoy',
                'email':        'test@godoy.com',
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

        it('Should create token', (done) => {
            culqi.createToken({
                'card_number':      '4111111111111111',
                'cvv':              '123',
                'expiration_month':  '09',
                'expiration_year':   '2020',
                'email':            'jgodoy@godoy.com'
            }).then((response) => {
                response.statusCode.should.equal(201);
                tokenId = response.body.id;
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('Should create card', (done) => {
            culqi.getCards().then((response) => {
                response.statusCode.should.equal(200);
                if(response.body.data.length > 0){
                    cardId = response.body.data[0].id;
                    done();
                }else{                    
                    culqi.createCard({
                        'customer_id': customerId,
                        'token_id': tokenId
                    }).then((creationResponse) => {
                        creationResponse.statusCode.should.equal(201);
                        cardId = creationResponse.body.id;
                        done();
                    }).catch((error) => {
                        done(error);
                    });
                }
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('getCard', (done) => {
        it('Should get created card', (done) => {
            culqi.getCard({
                'id': cardId
            }).then((response) => {
                response.statusCode.should.equal(200);
                done();  
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('getCards', (done) => {
        it('Should get all cards', (done) => {
            culqi.getCards().then((response) => {
                response.statusCode.should.equal(200);
                done();  
            }).catch((error) => {
                done(error);
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
                'email':            'jgodoy@godoy.com'
            }).then((response) => {
                response.statusCode.should.equal(201);
                tokenId = response.body.id;
                done();
            }).catch((error) => {
                done(error);
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
                done(error);
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
                done(error);
            });
        });

        it('Should delete created customer', (done) => {
            culqi.deleteCustomer({
                'id': customerId
            }).then((response) => {
                response.statusCode.should.equal(200);
                done()
            }).catch((error) => {
                done(error);
            })
        });
    });

});