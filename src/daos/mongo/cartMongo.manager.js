const { cartModel } = require("../../model/carts.model")

class CartManagerMongo {
    constructor() {
        this.model = cartModel
    }

    //crud de cart
    getCartPagination   = async ({limit=10, page=1}) => await this.model.paginate({}, {limit, page, lean: true})
    readCart            = async () => await this.model.find({})
    getCartById         = async (cid) => await this.model.findOne({ _id: cid }).lean() // filtro 
    createCart          = async (newProduct) => await this.model.create({productsId: [newProduct]})
    createProductToCart = async (cid, updatedProduct) => await this.model.findOneAndUpdate({_id: cid}, updatedProduct)
    // updateProduct   = async (pid, updatedProduct) => await this.model.findOneAndUpdate({_id: pid}, updatedProduct)
    deleteProductInCart  = async (cid, updatedProduct) => await this.model.findOneAndUpdate({_id: cid}, updatedProduct)
}

module.exports = {
    CartManagerMongo
}