'use strict'

const joi = require('joi')

module.exports = joi.object().keys({
    email: joi.string()
        .email({ minDomainSegment: 2, tlds: { allow: '*' } })
        .required(),
})
