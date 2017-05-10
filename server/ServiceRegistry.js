"use-strict";

class ServiceRegistry {

    constructor(timeout, log) {
        this._services = [];
        this._timeout = timeout;
        this._log = log;
    }

    add(intent, ip, port) {

        const key = intent + ip + port;

        // Register if no service
        if (!this._services[key]) {
            this._services[key] = {};

            // Time in seconds
            this._services[key].timestamp = Math.floor(new Date() / 1000);
            this._services[key].ip = ip;
            this._services[key].port = port;
            this._services[key].intent = intent;

            // Some logging
            this._log(`Added service for intent ${intent} on ${ip}:${port}`);

            // Cleanp - remove unused services
            this._cleanup();

            return;
        }

        // Existing service
        this._services[key].timestamp = Math.floor(new Date() / 1000);
        this._log(`Updated service for intent ${intent} on ${ip}:${port}`);
        this._cleanup();
    }

    remove(intent, ip, port) {

        const key = intent + ip + port;
        delete this._services[key];
    }

    get(intent){

        // Be sure to only get current intents
        this._cleanup();

        for(let key in this._services) {
            if(this._services[key].intent == intent) 
                return this._services[key];
        }
    }

    // Remove timed out services
    _cleanup() {
        const now = Math.floor(new Date() / 1000);

        for (let key in this._services) {

            // Over timeout?
            if (this._services[key].timestamp + this.timeout < now) {
                this._log(`Remove service for intent ${intent}`);

                // Remove property
                delete this._services[key];
            }
        }
    }
}

module.exports = ServiceRegistry;