const Culqi = require('../lib/culqi');
const Chai = require('chai');
const Should = Chai.should();

const Settings = {    
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY
};

const culqi = new Culqi(Settings.privateKey, Settings.publicKey);

describe('Tokens', () => {
    describe('createToken', (done) => {
        it('Should create token', (done) => {
            culqi.createToken({
                'card_number':      '4111111111111111',
                'cvv':              '123',
                'expiration_month':  '09',
                'expiration_year':  '2020',
                'email':            'juan@godoy.com'
            }).then((response) => {
                response.statusCode.should.equal(201);
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });
});