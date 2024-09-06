const { Schema, model } = require('mongoose')

const collections = 'carts'

const CartSchema = new Schema({
    //userId -> se agregaria el userId
    products: {
        type: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number
            }
        }]
    }
})

CartSchema.pre('findOne', function() {
    this.populate('products.productId')
})

const cartModel = model(collections, CartSchema)

module.exports = {
    cartModel
}