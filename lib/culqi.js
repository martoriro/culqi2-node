const request = require('request');

const culqiAPI = 'https://api.culqi.com/v2';
const paths = {
    customers: '/customers/',
    cards: '/cards/',
    charges: '/charges/',
    events: '/events/',
    tokens: '/tokens/'
};

const createPromise = (url, method, headers, params, requiredParams) => {
    return new Promise((resolve, reject) => {
        if (requiredParams && params) {
            const keys = Object.keys(params);
            for (let i in requiredParams) {
                if (keys.indexOf(requiredParams[i]) === -1) {
                return reject({
                    type: 'error',
                    message: 'Missing parameters ' + requiredParams[i]
                });
                }
            }
        }

        if(method == 'GET'){
            return request({
                url: url,
                qs: params,
                method: method,
                headers: headers,
                json: true
            }, (error, response) => {
                if (error) {
                    return reject(error);
                }else if(response.statusCode !== 200 && response.statusCode !== 201){
                    return reject(response);
                }
                return resolve(response);
            });
        }else{
            return request({
                url: url,
                method: method,
                headers: headers,
                body: params,
                json: true
            }, (error, response) => {
                if (error) {
                    return reject(error);
                }else if(response.statusCode !== 200 && response.statusCode !== 201){
                    return reject(response);
                }
                return resolve(response);
            });
        }
    });
};

class Culqi {
    constructor(privateKey, publicKey) {
        this.privateKey = privateKey;
        this.publicKey = publicKey
        this.baseUrl = culqiAPI;

        this.privateHeaders = {
            Authorization: 'Bearer ' + this.privateKey,
            'Content-Type': 'application/json',
            'User-Agent': 'Culqi-NodeJS-Request',
            Accept: 'application/json'
        };

        this.publicHeaders = {
            Authorization: 'Bearer ' + this.publicKey,
            'Content-Type': 'application/json',
            'User-Agent': 'Culqi-NodeJS-Request',
            Accept: 'application/json'
        }
    }

    createCustomer(params) {
        const url = this.baseUrl + paths.customers;
        const fields = [
            'first_name',
            'last_name',
            'email',
            'address',
            'address_city',
            'country_code',
            'phone_number'
        ];

        return createPromise(url, 'POST', this.privateHeaders, params, fields);
    }

    getCustomer(params){
        const url = this.baseUrl + paths.customers + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'GET', this.privateHeaders, params, fields);
    }

    getCustomers(){
        const url = this.baseUrl + paths.customers;
        return createPromise(url, 'GET', this.privateHeaders);
    }

    updateCustomer(params){
        const url = this.baseUrl + paths.customers + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'PATCH', this.privateHeaders, params, fields);
    }

    deleteCustomer(params){
        const url = this.baseUrl + paths.customers + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'DELETE', this.privateHeaders, params, fields);
    }

    createCard(params){
        const url = this.baseUrl + paths.cards;
        const fields = [
            'customer_id',
            'token_id'
        ];
        return createPromise(url, 'POST', this.privateHeaders, params, fields);
    }

    getCard(params){
        const url = this.baseUrl + paths.cards + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'GET', this.privateHeaders, params, fields);
    }

    getCards(){
        const url = this.baseUrl + paths.cards;
        return createPromise(url, 'GET', this.privateHeaders);
    }

    updateCard(params){
        const url = this.baseUrl + paths.cards + params.id;
        const fields = [
            'id',
            'token_id'
        ];
        return createPromise(url, 'PATCH', this.privateHeaders, params, fields);
    }

    deleteCard(params){
        const url = this.baseUrl + paths.cards + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'DELETE', this.privateHeaders, params, fields);
    }

    createCharge(params){
        const url = this.baseUrl + paths.charges;
        const fields = [
            'amount',
            'currency_code',
            'email',
            'source_id'
        ];
        return createPromise(url, 'POST', this.privateHeaders, params, fields);
    }

    getCharge(params){
        const url = this.baseUrl + paths.charges + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'GET', this.privateHeaders, params, fields);
    }

    getCharges(){
        const url = this.baseUrl + paths.charges;
        return createPromise(url, 'GET', this.privateHeaders);
    }

    updateCharge(params){
        const url = this.baseUrl + paths.charges + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'PATCH', this.privateHeaders, params, fields);
    }

    captureCharge(params){
        const url = this.baseUrl + paths.charges + params.id + '/capture';
        const fields = [
            'id'
        ];
        return createPromise(url, 'POST', this.privateHeaders, params, fields);
    }

    getEvent(params){
        const url = this.baseUrl + paths.events + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'GET', this.privateHeaders, params, fields);
    }

    getEvents(){
        const url = this.baseUrl + paths.events;
        return createPromise(url, 'GET', this.privateHeaders);
    }

    createToken(params){
        const url = this.baseUrl + paths.tokens;
        const fields = [
            'card_number',
            'cvv',
            'expiration_month',
            'expiration_year',
            'email'
        ];
        return createPromise(url, 'POST', this.publicHeaders, params, fields);
    }

}

module.exports = Culqi;
