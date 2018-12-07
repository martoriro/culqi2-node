const Culqi = require('../lib/culqi');
const Chai = require('chai');
const Should = Chai.should();

const Settings = {    
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY
};

const culqi = new Culqi(Settings.privateKey, Settings.publicKey);

describe('Charges', () => {
    var tokenId = '';
    var chargeId = '';

    describe('createCharge', (done) => {
        it('Should create token', (done) => {
            culqi.createToken({
                'card_number':      '4111111111111111',
                'cvv':              '123',
                'expiration_month':  '09',
                'expiration_year':  '2020',
                'email':            'jgodoy1@godoy.com'
            }).then((response) => {
                response.statusCode.should.equal(201);
                tokenId = response.body.id;
                done();
            }).catch((error) => {
                done(error);
            });
        });

        it('Should create charge', (done) => {
            culqi.createCharge({
                'amount':           '500',
                'currency_code':    'PEN',
                'email':            'jgodoy1@godoy.com',
                'source_id':        tokenId,
                'capture':          false
            }).then((response) => {
                response.statusCode.should.equal(201);
                chargeId = response.body.id;
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('getCharge', (done) => {
        it('Should get created charge', (done) => {
            culqi.getCharge({
                id: chargeId
            }).then((response) => {
                response.statusCode.should.equal(200);
                done();  
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('getCharges', (done) => {
        it('Should get all charges', (done) => {
            culqi.getCharges().then((response) => {
                response.statusCode.should.equal(200);
                done();  
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('updateCharge', (done) => {
        it('Should update charge data', (done) => {
            culqi.updateCharge({
                'id':           chargeId,
                'metadata': {
                    'test':    'completed'
                }
            }).then((response) => {
                response.statusCode.should.equal(200);
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });

    describe('captureCharge', (done) => {
        it('Should capture charge', (done) => {
            culqi.captureCharge({
                'id': chargeId
            }).then((response) => {
                response.statusCode.should.equal(201);
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });
});