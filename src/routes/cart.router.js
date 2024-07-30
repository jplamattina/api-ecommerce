const { Router } = require('express')
const CartManagerFs = require('../managers/FileSystem/carts.manager')
const ProductsManagerFs = require('../managers/FileSystem/products.manager')

const router = Router()

const { getProducts } = new ProductsManagerFs()
const { getCartById, createCart, createProductToCart } = new CartManagerFs()

router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const productsDb = await getCartById(cid)
        res.send({status: 'success', data: productsDb})
    } catch (error) {
        console.error(error)
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid } = req.params
        const { pid } = req.params
        const data = req.body
        const productsDb = await getCartById(cid)
        if(productsDb.length > 0){
            const response = await createProductToCart(cid, pid, data)
            res.send({status: 'success', data: response})
        } 
        res.status(404).json({
            status: 'failed',
            message: 'cart not found'
            })
    } catch (error) {
        res.send({status: 'error', data: response})
        console.error('este es el error', error)
    }
})

router.post('/', async (req, res) => {
    try {
        const products = await getProducts()
        const response = await createCart(products)
        res.send({status: 'success', data: response})
    } catch (error) {
        console.error(error)
    }
})

module.exports = router
