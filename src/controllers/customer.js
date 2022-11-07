'use strict'
/**
 * A Customer controller
 * used to create read update and delete customer logic control in a recursive manner.
 * @class CustomerController
 * @constructor
 */

module.exports = class CustomerController {
    constructor(log, httpStatus) {
        this.log = log
        this.httpStatus = httpStatus
    }

    /**
     * Call the create customer service.
     * @method createCustomerController
     * @param {Object}   req REST API request object
     * @param {Object}   res REST API response object
     * @return {Object} res  REST API response object
     */
    async createCustomerController(req, res) {
        try {
            const {body} = req
            // const result = await this.customerService.createcustomer(body)
            this.log.info('Customer Created Successfully ');
            res.sendStatus(200);
        } catch (error) {
            this.log.info('An error occured while creating customer ' + error)
            res.status(409).send(error.message)
        }
    }
    
    /**
     * Call the get Customer service.
     * @method createCustomerController
     * @param {Object}   req REST API request object
     * @param {Object}   res REST API response object
     * @return {Object} res REST API response object
     */
    async getCustomerController(req, res) {
        try {
            const { id } = req.params
            // const result = await this.customerService.getcustomer(id)
            this.log.info('Customer fetched Successfully')
            res.sendStatus(200);
        } catch (error) {
            this.log.info('An Error occured while fetching customer '+ error)
            res
               .status(404)
               .send(error)
        }
            
    }

    /**
     * Call the update customer service.
     * @method createCustomerController
     * @param {Object}   req REST API request object
     * @param {Object}   res REST API response object
     * @return {Object} res REST API response object
     */
    async updateCustomerController(req, res) {
        try {
            const {body} = req;
            // const response = await this.customerService.updatecustomerDetails(body, token);
            this.log.info('Customer updated Successfully')
            res.sendStatus(200);
        } catch (error) {
            this.log.info('An error occurred' + error);
            res.status(403).send(error);
        }
    }

    /**
     * Call the delete customer service.
     * @method createCustomerController
     * @param {Object}   req REST API request object
     * @param {Object}   res REST API response object
     * @return {Object} res REST API response object
     */
    async deleteCustomerController(req, res) {
        try {
            const {body} = req;
            // const response = await this.customerService.updatecustomerDetails(body, token);
            this.log.info('Customer deleted Successfully')
            res.sendStatus(200);
        } catch (error) {
            this.log.info('An error occurred' + error);
            res.status(403).send(error);
        }
    }
}