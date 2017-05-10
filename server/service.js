'use strict';

const express = require('express');
const service = express();
const ServiceRegistry = require('./ServiceRegistry');

module.exports = (config) => {
    
    const log = config.log();
    const myServiceRegistry = new ServiceRegistry(config.serviceTimeout, config.serviceLog);
    
    service.get('/', (req, res) => {
        return res.json({
            hello: 'world'
        });
    });

    service.get('/service/:intent/:port', (req, res) => {
        const serviceIntent = req.params.intent;
        const servicePort = req.params.port;

        // IPv6?
        const serviceIp = req.connection.remoteAddress.includes('::')
          ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

          // Actually add
          ServiceRegistry.add(serviceIntent, serviceIp, servicePort);

          return res.json({
            result: `${serviceIntent} at ${serviceIp}:${servicePort}` 
          });
    });

    return service;
}
