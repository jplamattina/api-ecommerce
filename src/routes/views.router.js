const { Router } = require('express')
const ProductsManagerFs = require('../managers/FileSystem/products.manager')

const viewsRouter = Router()

const { getProducts, createProduct, updateProducts, deleteProducts } = new ProductsManagerFs()


viewsRouter.get('/products', async (req, res) => {
    try {
        const productsDb = await getProducts()
            res.render('products', {
                products: productsDb
        })
    } catch (error) {
        console.error(error)
    }
})

viewsRouter.get('/realtimeproducts', async (req, res) => {

    try {
    const products = await getProducts()
    res.render('realTimeProducts', { products })
    } catch (err) {
    res.status(500).send('Error al obtener los productos.')
    }
    });



module.exports = viewsRouter