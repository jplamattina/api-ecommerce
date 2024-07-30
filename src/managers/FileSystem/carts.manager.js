const fs = require('fs')
const path = './dbjson/cartsDb.json'

class CartManagerFs {
    constructor() {
        this.path
    }

    readCart = async () => {
        try {
            if(fs.existsSync(path)) {
                const cartsJson = await fs.promises.readFile(path, 'utf-8')
                const carts = JSON.parse(cartsJson)
                return carts
            }
            return []
        } catch (error) {
            return []
          }
    }

    createCart = async (cartProducts) => {
        try {
            const cart = await this.readCart()
            // console.log('cart length', cart.products.length)
            const newCart = {
                id: cart.length === 0 ? 1 : cart[cart.length - 1].id + 1,
                products: cartProducts.map(item => ({
                    productId: item.id,
                    quantity: item.stock
                }))
            };
            cart.push(newCart)
            console.log('cart', cart)
            await fs.promises.writeFile(path, JSON.stringify(cart, null, '\t'))
            return newCart
        } catch (error) {
            console.log('error', error)
        }
    }
    getCartById = async (cid) => {
        try {
            const cart = await this.readCart()
            console.log('cart', cart)
            const filterProducts = cart.filter(product => product.id == parseInt(cid))
            console.log('filterProducts', filterProducts)
            return filterProducts
        } catch (error) {
            console.error('error de productos', error)
        }
    }
    createProductToCart = async (cid, pid, data) => {
        try {
            const cart = await this.readCart()
            const currentCart = cart.find(product => product.id == parseInt(cid))
            if (!currentCart) {
                return [];
            }
            const productIndex = currentCart.products.find(product => product.productId == parseInt(pid));
            if (!productIndex){
                const newProductId = currentCart.products.length > 0 ? currentCart.products[currentCart.products.length - 1].productId + 1 : 1;
                const addProductToCart = { productId: newProductId, quantity: data.stock };
                currentCart.products.push(addProductToCart);
            } else {
                currentCart.products = currentCart.products.map(item => {
                    if (item.productId === parseInt(pid)) {
                        return {
                            ...item,
                            quantity: data.stock
                        };
                    }
                   return item;
                });
            }
            await fs.promises.writeFile(path, JSON.stringify(cart, null, '\t'))
            return currentCart;
        } catch (error) {
            
        }
    }
}

module.exports = CartManagerFs

//el formato tiene que quedar asi {id: '', products: [{productId: '', quantity: 1}]}