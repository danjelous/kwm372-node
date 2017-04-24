"use strict";

const request = require('superagent');

class WitClient {

    constructor(token) {
        this._token = token;
    }

    // Cb for async operation
    ask(message, cb) {

        request.get('https://api.wit.ai/message')
               .set('Authorization', 'Bearer ' + this._token)
               .query({v: '20170424'})
               .query({q: message})
               .end((err, res) => {

                    // If an error occurs, return the error code to the given callback
                    if(err) return cb(err);

                    if(res.statusCode !== 200) return cb('Expected 200 but got ' + res.statusCode);

                    const witResponse = res.body.entities;

                    // Return no error object, but the actual response
                    return cb(null, witResponse);
               });
    }
}

module.exports = WitClient;