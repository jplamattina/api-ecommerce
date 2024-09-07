const express = require('express')
const productRouter = require('./routes/api/products.router.js')
const cartRouter = require('./routes/api/cart.router.js')
const viewsRouter = require('./routes/views.router.js')
const logger = require('morgan')
const { uploader } = require('./utils/multer.js')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const ProductsManagerFs = require('../src/managers/FileSystem/products.manager.js')
const { connectDB } = require('./config/index.js')

const app = express()
const PORT = 8080

const { getProducts, createProduct, deleteProducts } = new ProductsManagerFs()
const httpServer = app.listen(PORT, () => {
    console.log('escuchando puerto: ', PORT)
})
const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(logger('dev'))

connectDB()

//configuracion del motor de plantillas - handlebars
app.engine('handlebars', handlebars.engine())
//congfigurar la carpeta donde debe tomar las plantillas
app.set('views', __dirname + '/views')
// extencion de la plantillas
app.set('view engine', 'handlebars')

app.post('/', uploader.single('myFile'), (req, res) => {
    res.send('file uploaded')
})

app.use('/', viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

app.use((error, req, res, next) => {
    console.log('error: ', error.stack)
    res.status(500).send('error de server')
})

//socket
io.on('connection', async (socket) => {
    console.log('Cliente conectado')

    const products = await getProducts()
    socket.emit('products', products)
    socket.on('createProduct', async newProduct => {
        await createProduct(newProduct)
        const addProduct = await getProducts()
        io.emit('products', addProduct)
    })
    socket.on('deleteProduct', async deleteProduct => {
        await deleteProducts(deleteProduct)
        const newList = await getProducts()
        io.emit('products', newList)
    })
})