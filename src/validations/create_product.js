'use strict'

const joi = require('joi')

module.exports = joi.object().keys({
    amount: joi.number()
        .required(),
})
