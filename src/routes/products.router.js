const { Router } = require('express')
const { ProductManagerMongo } = require('../daos/mongo/productsMongo.manager')

const router = Router()
const productService = new ProductManagerMongo

router.get('/', async (req, res) => {
    try {
        const pagination = await productService.getPagination(limit, page)
        // const productsDb = await productService.getProduct()
        res.send({status: 'success', payload: pagination})
    } catch (error) {
        console.error(error)
    }
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const productsDb = await productService.getProduct(pid)
        res.status(200).send(productsDb)
    } catch (error) {
        console.error(error)
    }
})


router.post('/', async (req, res) => {
    try {
        const { body } = req
        const response = await productService.createProduct(body)
        console.log('responde', response)
        res.send({status: 'success', payload: response})
    } catch (error) {
        console.error(error)
    }
})

router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const {title, description, code, price, status, stock, category} = req.body
    try {
        const productFilter = await productService.getProduct(pid)
        if(productFilter) {
            const updatedProduct = {
                ...productFilter,
                title: title !== undefined ? title : productFilter.title,
                description: description !== undefined ? description : productFilter.description,
                code: code !== undefined ? code : productFilter.code,
                price: price !== undefined ? price : productFilter.price,
                status: status !== undefined ? status : productFilter.status,
                stock: stock !== undefined ? stock : productFilter.stock,
                category: category !== undefined ? category : productFilter.category
            }
            await productService.updateProduct(pid, updatedProduct);
            res.status(200).json({
                status: 'success',
                data: updatedProduct
              })
        } else {
            res.status(404).json({
                status: 'failed',
                message: 'the item is not found in the coderhouse database'
              })
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error)
        res.status(500).json({ message: 'Error del servidor' })
    }
})

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const productFilter = await productService.deleteProduct(pid)
        if (productFilter) { 
            res.status(200).json({
            status: 'success',
            message: 'data deleted'
          })
        }
        res.status(404).json({
              status: 'failed',
              message: 'item not found'
            })
    } catch (error) {
    }
})

module.exports = router
//export default router