'use strict';

const config = require('../config');
const http = require('http');

// Commit config object
const service = require('../server/service')(config);
const log = config.log();
const server = http.createServer(service);

server.listen(process.env.PORT || 3000);

// Emit on listening event
server.on('listening', function(){
    log.info(`Slackbot is listening on ${server.address().port} in ${service.get('env')} mode.`);
});