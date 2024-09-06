const { Router } = require('express')
const CartManagerFs = require('../managers/FileSystem/carts.manager')
const ProductsManagerFs = require('../managers/FileSystem/products.manager')
const { ProductManagerMongo } = require('../daos/mongo/productsMongo.manager')
const { CartManagerMongo } = require('../daos/mongo/cartMongo.manager')

const router = Router()

// const { getProducts } = new ProductsManagerFs()
// const { getCartById, createCart, createProductToCart } = new CartManagerFs()
const productService = new ProductManagerMongo
const cartService = new CartManagerMongo

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const cartDb = await cartService.getCartById(cid)
        res.send({status: 'success', data: cartDb})
    } catch (error) {
        console.error(error)
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid } = req.params
        const { pid } = req.params
        const cartDb = await cartService.getCartById(cid);
        const productData = await productService.getProduct(pid);
        cartDb.products.push({productId: productData._id.toString(), quantity: productData.stock}) 
         if (cartDb.products.length > 0) {
            const response = await cartService.createProductToCart(cid, cartDb)
            return res.send({ status: 'success', payload: response })
        } 
        
        return res.status(404).json({
            status: 'failed',
            message: 'cart not found'
        });  // Y también aquí usamos return
    } catch (error) {
        console.error('este es el error', error)
        res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
})

router.post('/', async (req, res) => {
    try {
        const products = await productService.getProducts()
        const response = await cartService.createCart(products)
        res.send({status: 'success', data: response})
    } catch (error) {
        console.error(error)
    }
})

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const cartDb = await cartService.getCartById(cid);
        const productData = await productService.getProduct(pid);
        cartDb.products.push({productId: productData._id.toString(), quantity: productData.stock}) 
       
        if (cartDb.products.length > 0) {
            const response = await cartService.createProductToCart(cid, pid, cartDb);
            return res.send({ status: 'success', payload: response })
        } 
        
        return res.status(404).json({
            status: 'failed',
            message: 'cart not found'
        })
    } catch (error) {
        console.error('este es el error', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    try {
        const cartDb = await cartService.getCartById(cid);
        const updatedProducts = cartDb.products.filter(item => item.productId._id.toString() !== pid)
        if (updatedProducts.length < cartDb.products.length) {
            const response = await cartService.deleteProductInCart(cid, { products: updatedProducts })
            return res.send({ status: 'success', payload: response })
        }
        res.status(404).json({
            status: 'failed',
            message: 'Product not found in cart'
        });
    } catch (error) {
        console.error('Error en el servidor:', error)
        res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
});



module.exports = router
