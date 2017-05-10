'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, registry, log, cb) {

    if (intentData.intent[0].value !== 'time') {

        // Give back the callback with an error object
        return cb(new Error('Expected time intent but got ' + intentData.intent[0].value));
    }

    const location = intentData.location[0].value.replace(/,.?bot\-danjelous/i, '');
    const service = registry.get('time');

    if(service) { return `Service is now available`; }

    request.get(`http://${service.ip}:${service.port}/service/${location}`)
        .then((res) => {

            if (!res.body.result) return cb('Error with time service');


            // Error is null --> err, res
            return cb(null, `In ${location} it is now ${res.body.result}.`);
        })
}