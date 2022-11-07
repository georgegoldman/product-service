'use strict'

const
    serviceLocator = require('../configs/dependancy_injector'),
    mongoose = serviceLocator.get('mongoose');

const { Schema, model } = mongoose

const productSchema = Schema({
    amount: {
        type: Number,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
}, {
    timestamps: true
})

module.exports = model("Product", productSchema)
