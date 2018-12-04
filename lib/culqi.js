const request = require('request');

const culqiAPI = 'https://api.culqi.com/v2';
const paths = {
    customers: '/customers/',
    cards: '/cards/',
    charges: '/charges/',
    events: '/events/'
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
    });
};

class Culqi {
    constructor(commerceKey) {
        this.commerceKey = commerceKey;
        this.baseUrl = culqiAPI;

        this.headers = {
            Authorization: 'Bearer ' + this.commerceKey,
            'Content-Type': 'application/json',
            'User-Agent': 'Culqi-NodeJS-Request',
            Accept: 'application/json'
        };
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
        return createPromise(url, 'POST', this.headers, params, fields);
    }

    getCustomer(params){
        const url = this.baseUrl + paths.customers + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'GET', this.headers, params, fields);
    }

    getCustomers(){
        const url = this.baseUrl + paths.customers;
        return createPromise(url, 'GET', this.headers);
    }

    updateCustomer(params){
        const url = this.baseUrl + paths.customers + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'PATCH', this.headers, params, fields);
    }

    deleteCustomer(params){
        const url = this.baseUrl + paths.customers + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'DELETE', this.headers, params, fields);
    }

    createCard(params){
        const url = this.baseUrl + paths.cards;
        const fields = [
            'customer_id',
            'token_id'
        ];
        return createPromise(url, 'POST', this.headers, params, fields);
    }

    getCard(params){
        const url = this.baseUrl + paths.cards + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'GET', this.headers, params, fields);
    }

    getCards(){
        const url = this.baseUrl + paths.cards;
        return createPromise(url, 'GET', this.headers, params);
    }

    updateCard(params){
        const url = this.baseUrl + paths.cards + params.id;
        const fields = [
            'id',
            'token_id'
        ];
        return createPromise(url, 'PATCH', this.headers, params, fields);
    }

    deleteCard(params){
        const url = this.baseUrl + paths.cards + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'DELETE', this.headers, params, fields);
    }

    createCharge(params){
        const url = this.baseUrl + paths.charges;
        const fields = [
            'amount',
            'currency_code',
            'email',
            'source_id'
        ];
        return createPromise(url, 'POST', this.headers, params, fields);
    }

    getCharge(params){
        const url = this.baseUrl + paths.charges + params.id;
        const field = [
            'id'
        ];
        return createPromise(url, 'GET', this.headers, params, fields);
    }

    getCharges(){
        const url = this.baseUrl + paths.charges;
        return createPromise(url, 'GET', this.headers, params);
    }

    updateCharge(params){
        const url = this.baseUrl + paths.charges + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'PATCH', this.headers, params, fields);
    }

    captureCharge(params){
        const url = this.baseUrl + paths.charges + params.id + '/capture';
        const fields = [
            'id'
        ];
        return createPromise(url, 'POST', this.headers, params, fields);
    }

    getEvent(params){
        const url = this.baseUrl + paths.events + params.id;
        const fields = [
            'id'
        ];
        return createPromise(url, 'GET', this.headers, params, fields);
    }

    getEvents(){
        const url = this.baseUrl + paths.events;
        return createPromise(url, 'GET', this.headers, params, fields);
    }
}


// Compat mode
module.exports = Culqi;
