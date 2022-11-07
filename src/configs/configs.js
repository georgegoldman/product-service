'use strict'

module.exports = () => ({
    app: {
        name: process.env.APP_NAME,
        port: process.env.PORT || 4545,
        environment: process.APPLICATION_ENV,
        logpath: process.env.LOG_PATH,
        secret: process.env.APP_SECRET
    },
    application_logging: {
        file: process.env.LOG_PATH,
        level: process.env.LOG_LEVEL || 'info',
        console: process.env.LOG_ENABLE_CONSOLE,
    }

})