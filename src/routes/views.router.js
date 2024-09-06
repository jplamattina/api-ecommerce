const { Router } = require('express')
const ProductsManagerFs = require('../managers/FileSystem/products.manager')
const { ProductManagerMongo } = require('../daos/mongo/productsMongo.manager')

const viewsRouter = Router()

const { getProducts } = new ProductsManagerFs()
const productService = new ProductManagerMongo


viewsRouter.get('/products', async (req, res) => {
    const { limit , pageNum } =  req.query
    console.log(limit)
    console.log(pageNum)
    try {
        const {
            docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page
        } = await productService.getPagination({limit, page: pageNum})

        console.log('hasNextPage', hasNextPage)
            res.render('products', {
                products: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                page
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