'use strict'

const serviceLocator = require('../lib/service_locator'), config = require('./configs')();

serviceLocator.register('logger', ()=> {
    const logger = require('../lib/logger').create(config.application_logging)
    return logger
})

serviceLocator.register('httpStatus', () => {
    return require('http-status')
})

serviceLocator.register('shortid', () => {
    return require('shortid')
})

serviceLocator.register('errs', () => {
    return require('restify-errors')
})

serviceLocator.register('customerController', (serviceLocator) => {
    const log = serviceLocator.get('logger')
    const httpStatus = serviceLocator.get('httpStatus')
    const customerController = require('../controllers/customer')

    return new customerController(log, httpStatus)
})

module.exports = serviceLocator