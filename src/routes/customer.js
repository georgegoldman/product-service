const express = require('express')
const router = express.Router()
const 
    serviceLocator = require('../configs/dependancy_injector'),
    customerValidator = require('../validations/create_customer'),
    validator = require('../middlewares/validator');

// define the customer endpoint
module.exports = router
    .get("/:id", [], async (req, res) => {
        await serviceLocator.get('customerService').getCustomer(req, res)
    })
    .put("/update/:id", [],async (req, res) => {
        await serviceLocator.get('customerService').upateCustomer(req, res)
    })
    .post("/create", validator.validate(customerValidator), async(req, res) => {
        await serviceLocator.get('customerService').createCustomer(req, res)
    }).delete("/delete/:id", [], async (req, res) => {
        await serviceLocator.get('customerService').deleteCustomer(req, res);
    });


