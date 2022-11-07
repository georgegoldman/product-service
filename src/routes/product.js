const express = require('express')
const router = express.Router()
const 
    serviceLocator = require('../configs/dependancy_injector'),
    productValidator = require('../validations/create_product'),
    validator = require('../middlewares/validator');

// define the customer endpoint
module.exports = router
    .get("/:id", [], async (req, res) => {
        await serviceLocator.get('productService').getProduct(req, res)
    })
    .put("/update/:id", [],async (req, res) => {
        await serviceLocator.get('productService').upateProduct(req, res)
    })
    .post("/create", validator.validate(productValidator), async(req, res) => {
        await serviceLocator.get('productService').createProduct(req, res)
    }).delete("/delete/:id", [], async (req, res) => {
        await serviceLocator.get('productService').deleteProduct(req, res);
    });


