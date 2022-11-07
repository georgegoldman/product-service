'use strict';

const request = require('requestretry');

const CONTENT_TYPE_FORM_DATA = 'multipart/form-data';

class BaseService {
    /**
     * Send a get request
     * @param url Request URL.
     * @param conf Request configuration settings.
     * @returns {Promise.<*>}
     */
    get(url, conf) {
        const config = BaseService.getConfig(url, 'GET', undefined, conf);
        return Promise.resolve(request(config));
    }

    /**
     * Send a POST request
     * @param url Request URL.
     * @param body Request body.
     * @param conf Request configuration settings.
     * @returns {Promise.<*>}
     */
    post(url, body, conf) {
        const config = BaseService.getConfig(url, 'POST', undefined || body, conf);
        return Promise.resolve(request(config));
    }

    /**
     * Send a PUT request
     * @param url Request URL.
     * @param body Request body.
     * @param conf Request configuration settings.
     * @returns {Promise.<*>}
     */
    put(url, body, conf) {
        const config = BaseService.getConfig(url, 'PUT', body, conf);
        return Promise.resolve(request(config));
    }

    /**
     * Send a DELETE request
     * @param url Request URL.
     * @param conf Request configuration settings.
     * @returns {Promise.<*>}
     */
    delete(url, conf) {
        const config = BaseService.getConfig(url, 'DELETE', null, conf);
        return Promise.resolve(request(config));
    }

    /**
     * Build the configuration object for a request
     * @param url Request URL.
     * @param body Request body.
     * @param conf Request configuration settings.
     * @param method HTTP method for the request
     * @returns {object}
     */
    static getConfig(url, method, body, conf) {
        const config = {
            json: true,
            gzip: true,
            timeout: conf.timeout || 50*1000,
            maxAttempts: conf.retry.count || 3,
            retryDelay: conf.retry.delay || 100,
            retryStrategy: request.RetryStrategies.HTTPOrNetworkError,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': conf.token,
                // 'X-App-Source': (conf.headers && conf.headers.app_source) || 'unknown',
                // 'X-App-Version': (conf.headers && conf.headers.app_version) || 'unknown'
            },
            method: method,
            url: url,
            body: body
        };
        if (conf.headers && conf.headers.authorization) {
            config.headers.authorization = conf.headers.authorization;
        }

        // If the request requires that the content-type be multipart/form-data
        // if (conf.content_type && conf.content_type === CONTENT_TYPE_FORM_DATA) {
        //     config.formData = body;
        //     config.headers = {
        //         'Content-Type': conf.content_type
        //     };

        //     // Remove the body field from the request object
        //     delete (config.body);
        // }

        const basicAuth = conf.basicAuth;

        let auth = {};

        if (basicAuth) {
            auth = {
                user: basicAuth.user,
                pass: basicAuth.pass
            };

            config.auth = auth;
        }

        return config;
    }

    /**
     * Adds header config to the existing config
     * @param {object} conf default config object
     * @param {object} headers
     */
    addHeaderConfig(conf, headers = {}) {
        const config = conf;
        // config.headers.app_source = headers.appSource;
        // config.headers.app_version = headers.appVersion;
        return config;
    }

    /**
     * Adds header config to the existing config
     * @param {object} conf default config object
     * @param {object} headers
     */
    // addHeaderAuthorizationConfig(conf, headers = {}) {
    //     const config = conf;
    //     config.headers.authorization = headers.authorization;
    //     return config;
    // }
}

module.exports = BaseService;
