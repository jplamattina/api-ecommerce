const { Router } = require('express')
const ProductsManagerFs = require('../managers/FileSystem/products.manager')
const { ProductManagerMongo } = require('../daos/mongo/productsMongo.manager')

const viewsRouter = Router()

const { getProducts } = new ProductsManagerFs()
const productService = new ProductManagerMongo


viewsRouter.get('/products', async (req, res) => {
    const { limit , pageNum, sort} =  req.query
    const validSort = sort == 1 ? 1 : -1;
    console.log(validSort)
    try {
        const {
            docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page,
        } = await productService.getPagination({limit, page: pageNum, sort: {price: validSort}})

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
    const products = await productService.getProducts()
    res.render('realTimeProducts', { products })
    } catch (err) {
    res.status(500).send('Error al obtener los productos.')
    }
    });



module.exports = viewsRouter