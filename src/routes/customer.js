const express = require('express')
const router = express.Router()
const 
    serviceLocator = require('../configs/di'),
    customerValidator = require('../validations/create_customer'),
    validator = require('../middlewares/validator');

// define the customer endpoint
module.exports = router
    .get("/:id", [], async (req, res) => {
        await serviceLocator.get('customerController').getCustomerController(req, res)
    })
    .patch("/update", [],async (req, res) => {
        await serviceLocator.get('customerController').updateCustomerController(req, res)
    })
    .post("/create", validator.validate(customerValidator), async(req, res) => {
        await serviceLocator.get('customerController').createCustomerController(req, res)
    }).delete("/delete", [], async (req, res) => {
        await serviceLocator.get('customerController').deleteCustomerController(req, res);
    });


