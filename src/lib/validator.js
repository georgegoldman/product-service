'use strict'

let httpStatus = require('http-status')
let errors = require('restify-errors')

module.exports.headerValidation = function(log) {
    return (req, res, next) => {
        let headerValidation = req.route.accept

        if(!headerValidation) {
            return next()
        }

        if(req.header['content-type'].indexOf(req.route.accept) === 0) {
            log.debug('request content-type correct - ', req.headers['content-type'])

            return next()
        } else {
            log.error('request content-type incorect - ', req.headers['content-type'])

            res.send(
                httpStatus.BAD_REQUEST,
                new errors.InvalidContentError(
                    'Invalid content-type - expecting ' + req.route.accept
                )
            )
        }
    }
}

/**
 * Route Parameter validation middleware
 * 
 * @param log an instance of the console logger
 * @param joi an instance of joi schema validator
 * @return {Function}
 */
module.exports.paramValidation = (log, joi) => {
    return (req, res, next) => {
        // always allow validation to allow unknown fields by default.
        let option = {
            allowUnknown: true
        }

        let validation = req.route.spec.validation //validation object in route
        if(!validation) {
            return next() //skip validation if not set
        }
        let validProperties = ['body', 'query', 'params']

        for (let i in validation) {
            if(validProperties.indexOf(i) < 0) {
                log.debug('Route contains unsupported validation key')
                throw new Error('An unsupported validation key set in route')
            } else {
                if (req[i] === undefined) {
                    log.debug('Empty request ' + i + ' was sent')

                    res.send(
                        httpStatus.BAD_REQUEST,
                        new errors.InvalidParamError('Missing request ' + i)
                    )

                    return
                }

                let result = joi.validate(req[i], validation[i], options)

                if(result.error) {
                    log.debug('validation error - %s', result.error.message)

                    res.send(
                        httpStatus.BAD_REQUEST,
                        new errors.InvalidParamError(
                            'Invalid request ' + i + ' - ' + result.error.details[0].message
                        )
                    )
                    return
                } else {
                    log.info('Successfully validated request parameters')
                }
            }
        }
        next ()
    }
}