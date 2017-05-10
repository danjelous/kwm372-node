'use strict';

const config = require('../config');
const http = require('http');
const log = config.log();

// Commit config object
const service = require('../server/service')(config);
const SlackClient = require('../server/SlackClient');
const WitClient = require('../server/WitClient');
const server = http.createServer(service);

const serviceRegistry = require('../server/ServiceRegistry')

const witClient = new WitClient(config.witToken);
const slackClient = new SlackClient(config.slackToken, witClient, config.botName, 'info', config.log(), serviceRegistry);

slackClient.start(() => {

    // Start server only when connection to slack has been established!
    server.listen(process.env.PORT || 3000);
});

// Emit on listening event
server.on('listening', function(){
    log.info(`Slackbot is listening on ${server.address().port} in ${service.get('env')} mode.`);
});