const Culqi = require('../lib/culqi');
const Chai = require('chai');
const Should = Chai.should();

const Settings = {    
    commerceKey: process.env.COMMERCE_KEY
};

const culqi = new Culqi(Settings.commerceKey);

describe('Tokens', () => {
    describe('createToken', (done) => {
        it('Should create card', (done) => {
            culqi.createToken({
                'card_number':      '4444333322221111',
                'cvv':              '123',
                'expiration_month':  '09',
                'expiration_year':  '2020',
                'email':            'juan@godoy.com'
            }).then((response) => {
                response.statusCode.should.equal(201);
                done();
            }).catch((error) => {
                done(error.message);
            });
        });
    });
});