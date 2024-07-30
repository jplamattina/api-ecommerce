const { Router } = require('express')
const ProductsManagerFs = require('../managers/FileSystem/products.manager')
//import { Router } from 'express' -> type modules

const router = Router()

const { getProducts, createProduct, updateProducts, deleteProducts } = new ProductsManagerFs()

router.get('/', async (req, res) => {
    try {
        const productsDb = await getProducts()
        res.send({status: 'success', data: productsDb})
    } catch (error) {
        console.error(error)
    }
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const productsDb = await getProducts()
        const newProductList = productsDb.filter(product => product.id == parseInt(pid))
        res.status(200).send(newProductList)
    } catch (error) {
        console.error(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const { body } = req
        const response = await createProduct(body)
        res.send({status: 'success', data: response})
    } catch (error) {
        console.error(error)
    }
})

router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const {title, description, code, price, status, stock, category} = req.body
    try {
        const productsDb = await getProducts()
        const productFilter = productsDb.find(product => product.id == parseInt(pid))
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
            await updateProducts(updatedProduct)
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
    const productsDb = await getProducts()
    const productFilter = productsDb.find(product => product.id == parseInt(pid))
    try {
        await deleteProducts(pid)
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