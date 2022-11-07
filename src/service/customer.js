const BaseService = require('./base_service');

module.exports =  class CustomerService extends BaseService {
        /**
         * @constructor  Instance of our logger.
         * @param  {object}  config  Service config
         */

        constructor(log, util, errorHandler, request, config, mongoose) {
                super();
                this.log = log
                this.util = util
                this.errorHandler = errorHandler
                this.request = request
                this.config = config
                this.mongoose = mongoose
        }

        async createCustomer(req, res) {
                
                try {
			const Customer = this.mongoose.model('Customer')
			const { email } = req.body
			const customer = await Customer.findOne({ email })
			if (customer) {
				res.json('customer already exist')
                                return;
			}
                        let newCustomer = new Customer({email});
                        const createUser = await newCustomer.save()
                        res.json(createUser);
                        return;
                } catch (error) {
                        console.log(error)
                        res.json(error)
                        return;
                }

        }

        async getCustomer(req, res) {
                
                try {
			const Customer = this.mongoose.model('Customer')
			const { id } = req.params
                        const _id = id
			const customer = await Customer.findOne({ _id })
			if (customer) {
				res.json(customer)
                                return;
			}
                        res.json('customer does not exit');
                        return;
                } catch (error) {
                        console.log(error)
                        res.json(error)
                        return;
                }

        }

        async upateCustomer(req, res) {
                
                try {
			const Customer = this.mongoose.model('Customer')
			const { id } = req.params
                        const {email } = req.body
                        const _id = id
			const customer = await Customer.findOne({ _id })
			if (customer) {
                                const customerUpdate = await Customer.findOneAndUpdate(
                                        {"_id": _id},
                                        { $set:  { "email" : `${email}`} },
                                        {returnNewDocument: true}
                                    )
				res.json(customerUpdate)
                                return;
			}
                        console.log('pk');
                        res.json('can\'t update customer that does not exit');
                        return;
                } catch (error) {
                        console.log(error)
                        res.json(error)
                        return;
                }

        }

        async deleteCustomer(req, res) {
                
                try {
			const Customer = this.mongoose.model('Customer')
			const { id } = req.params
                        const _id = id
			const customer = await Customer.findOne({ _id })
			if (customer) {
                                const customerUpdate = await Customer.deleteOne(
                                        {"_id": _id},
                                    )
				res.json(customerUpdate)
                                return;
			}
                        res.json('can\'t delete customer that does not exit');
                        return;
                } catch (error) {
                        console.log(error)
                        res.json(error)
                        return;
                }

        }

}
