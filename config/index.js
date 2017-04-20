'use strict';

require('dotenv').config();
const bunyan = require('bunyan');

const log = {
    development: () => {
        return bunyan.createLogger({
            name: 'slackbot-main-dev',
            level: 'debug'
        });
    },
    test: () => {
        return bunyan.createLogger({
            name: 'slackbot-main-test',
            level: 'fatal'
        });
    },
    production: () => {
        return bunyan.createLogger({
            name: 'slackbot-main-prod',
            level: 'info'
        });
    }
}

module.exports = {
    log: (env) => {

        // Return property when already present
        if(env) return log[env]();
        return log[process.env.NODE_ENV || 'development']();
    }
}