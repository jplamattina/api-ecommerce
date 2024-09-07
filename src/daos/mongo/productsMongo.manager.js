const { productsModel } = require("../../model/products.model")

class ProductManagerMongo {
    constructor() {
        this.model = productsModel
    }

    //crud de productos
    getPagination   = async ({limit=5, page=1, sort={price: -1}}) => await this.model.paginate({}, {limit, page, sort, lean: true})
    getProducts     = async () => await this.model.find({})
    getProduct      = async (pid) => await this.model.findOne({ _id: pid }).lean() // filtro 
    createProduct   = async (newProduct) => await this.model.create(newProduct)
    updateProduct   = async (pid, updatedProduct) => await this.model.findOneAndUpdate({_id: pid}, updatedProduct)
    deleteProduct   = async (pid) => {await this.model.deleteOne({_id: pid}).lean()}
}

module.exports = {
    ProductManagerMongo
}