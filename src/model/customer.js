'use strict'

const
    serviceLocator = require('../configs/dependancy_injector'),
    mongoose = serviceLocator.get('mongoose');

const { Schema, model } = mongoose

const customerSchema = Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    }
}, {
    timestamps: true
})

module.exports = model("Customer", customerSchema)
