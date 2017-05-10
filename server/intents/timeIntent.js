'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, log, cb) {

    if (intentData.intent[0].value !== 'time') {

        // Give back the callback with an error object
        return cb(new Error('Expected time intent but got ' + intentData.intent[0].value));
    }

    const location = intentData.location[0].value;
    request.get('http://localhost:3001/service/' + location)
        .then((res) => {

            if (!res.body.result) return cb('Error with time service');


            // Error is null --> err, res
            return cb(null, `In ${location} it is now ${res.body.result}.`);
        })
}