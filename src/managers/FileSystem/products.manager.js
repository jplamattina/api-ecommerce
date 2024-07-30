const fs = require('fs')
const path = './dbJson/productsDb.json'

class ProductsManagerFs {

    constructor() {
        this.path = path
    }
    
    readProducts = async () => {
        try {
            if(fs.existsSync(path)) {
                const productsJson = await fs.promises.readFile(path, 'utf-8')
                const products = JSON.parse(productsJson)
                return products
            }
            return []
        } catch (error) {
            console.error(error)
          }
    }

    //crud de productos
    getProducts = async () => {
        try {
            return await this.readProducts()
        } catch (error) {
            console.error('error de productos', error)
        }
    }
    getProduct = async () => {}

    createProduct = async newProduct => {
        try {
            const products = await this.readProducts()
            if (products.length == 0) {
                newProduct.id = 1
            } else {
                newProduct.id = products[products.length - 1].id + 1 
            }
            products.push(newProduct)
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
            return newProduct
        } catch (error) {
            console.log('error', error)
        }
    }

    updateProducts = async (updatedProduct) => {
        const newList = []
        try {
            const productsDb = await this.readProducts()
            console.log('products', products)
            productsDb.forEach(item =>
                {
                    if (item.id == updatedProduct.id){
                        newList.push(updatedProduct)
                    } else {
                        return newList.push(item)
                    }
                }
            )
            await fs.promises.writeFile(path, JSON.stringify(newList, null, '\t'))
        } catch (error) {
            console.log('error', error)
        }
    }

    deleteProducts = async (pid) => {
        const productsDb = await this.readProducts()
        const newProductList = productsDb.filter(product => product.id !== parseInt(pid))
        await fs.promises.writeFile(path, JSON.stringify(newProductList, null, '\t'))
    }
}

module.exports = ProductsManagerFs