const BaseService = require('./base_service');

module.exports =  class ProductService extends BaseService {
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

        async createProduct(req, res) {
                
                try {
			const Product = this.mongoose.model('Product')
			const { amount } = req.body
                        let newProduct = new Product({amount});
                        const createProduct = await newProduct.save()
                        res.json(createProduct);
                        return;
                } catch (error) {
                        console.log(error)
                        res.json(error)
                        return;
                }

        }

        async getProduct(req, res) {
                
                try {
			const Product = this.mongoose.model('Product')
			const { id } = req.params
                        const _id = id
			const product = await Product.findOne({ _id })
			if (product) {
				res.json(product)
                                return;
			}
                        res.json('product does not exit');
                        return;
                } catch (error) {
                        console.log(error)
                        res.json(error)
                        return;
                }

        }

        async upateProduct(req, res) {
                
                try {
			const Product = this.mongoose.model('Product')
			const { id } = req.params
                        const { amount } = req.body
                        const _id = id
			const product = await Product.findOne({ _id })
			if (product) {
                                const productUpdate = await Product.findOneAndUpdate(
                                        {"_id": _id},
                                        { $set:  { "amount" : `${amount}`} },
                                        {returnNewDocument: true}
                                    )
				res.json(productUpdate)
                                return;
			}
                        console.log('pk');
                        res.json('can\'t update product that does not exit');
                        return;
                } catch (error) {
                        console.log(error)
                        res.json(error)
                        return;
                }

        }

        async deleteProduct(req, res) {
                
                try {
			const Product = this.mongoose.model('Product')
			const { id } = req.params
                        const _id = id
			const product = await Product.findOne({ _id })
			if (product) {
                                const productUpdate = await Product.deleteOne(
                                        {"_id": _id},
                                    )
				res.json(productUpdate)
                                return;
			}
                        res.json('can\'t delete product that does not exit');
                        return;
                } catch (error) {
                        console.log(error)
                        res.json(error)
                        return;
                }

        }

}
