'use strict';

const express = require('express');
const service = express();
const ServiceRegistry = require('./ServiceRegistry');

module.exports = (config) => {
    
    const log = config.log();
    const serviceRegistry = new ServiceRegistry(config.serviceTimeout, log);
    
    // Save data on service object
    service.set('serviceRegistry', serviceRegistry);

    service.get('/', (req, res) => {
        return res.json({
            hello: 'world'
        });
    });

    service.put('/service/:intent/:port', (req, res) => {
        const serviceIntent = req.params.intent;
        const servicePort = req.params.port;

        // IPv6?
        const serviceIp = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

          // Actually add
          serviceRegistry.add(serviceIntent, serviceIp, servicePort);

          return res.json({
            result: `${serviceIntent} at ${serviceIp}:${servicePort}` 
          });
    });

    return service;
}
