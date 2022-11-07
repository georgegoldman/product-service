'use strict'

const
    { createLogger, format, transports } = require('winston'),
    { combine, timestamp, label, prettyPrint } = format

var fs = require('fs')

try {
    const createTransports = function(config) {
        const customTransports = []

        if (config.file) {
            customTransports.push(
                new transports.File({
                    filename: config.file,
                    level: config.level
                })
            )
        }
        
        if(config.console) {
            customTransports.push(
                new transports.Console({
                    level: config.level
                })
            )
        }

        return customTransports
    }

    module.exports = {
        create: function (config) {
            return createLogger({
                transports: createTransports(config),
                format: combine(
                    label({label: 'Project product service script'}),
                    timestamp(),
                    prettyPrint()
                )
            })
        }
    }
    
} catch (error) {
    console.log(error)
}