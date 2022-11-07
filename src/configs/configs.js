'use strict'

module.exports = () => ({
    app: {
        name: process.env.APP_NAME,
        port: process.env.APP_PORT,
        environment: process.APPLICATION_ENV,
        logpath: process.env.LOG_PATH,
        secret: process.env.APP_SECRET
    },
    application_logging: {
        file: process.env.LOG_PATH,
        level: process.env.LOG_LEVEL || 'info',
        console: process.env.LOG_ENABLE_CONSOLE,
    },
    api:{
        url: process.env.API_GATEWAY,
        timeout: parseInt(process.env.PROTON_SERVICE_TIMEOUT),
        retry: {
            count: parseInt(process.env.PROTON_SERVICE_RETRY_COUNT),
            delay: parseInt(process.env.PROTON_SERVICE_RETRY_DELAY)
        }
    },
    mongo: {
        URI: process.env.DB_URI,
    },


})