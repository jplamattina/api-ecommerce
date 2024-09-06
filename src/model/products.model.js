const { Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productCollection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: String,
    code: String,
    price: {
        type: Number,
        required: true,
    },
    status: Number,
    stock: {
        type: Number,
        required: true,
    },
    category: String,
})

productSchema.plugin(mongoosePaginate)
const productsModel = model(productCollection, productSchema)

module.exports = {
    productsModel
}