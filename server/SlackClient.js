'use-strict';

// Real time messaging client from slack
const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

class SlackClient {

    // log == custom logger
    constructor(token, logLevel, log) {
        this._rtm = new RtmClient(token, {logLevel: logLevel});
        this._log = log;
    }

    _handleOnAuthenticated(rtmStartData) {
        this._log.info(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}.`);
    }

    _addAuthenticatedHandler(handler) {
        this._rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler.bind(this));
    }

    start(handler) {
        this._addAuthenticatedHandler(handler);
        this._addAuthenticatedHandler(this._handleOnAuthenticated);        
        this._rtm.start();
    }
}