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

serviceLocator.register('util', () => {
    return require('util');
})

serviceLocator.register('request', () => {
    return require('requestretry')
})

serviceLocator.register('config', ()=> {
    return require('./configs')()
})

serviceLocator.register('mongoose', () => {
    return require('mongoose')
})

serviceLocator.register('productService', (serviceLocator) => {
    const log = serviceLocator.get('logger')
    const util = serviceLocator.get('util')
    const errorHandler = serviceLocator.get('errs')
    const request = serviceLocator.get('request')
    const config = serviceLocator.get('config').customer
    const mongoose = serviceLocator.get('mongoose')
    const ProductService = require('../service/product')

    return new ProductService(log, util, errorHandler, request, config, mongoose)
})

module.exports = serviceLocator