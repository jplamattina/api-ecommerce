const express = require('express');
const productRouter = require('./routes/products.router.js')
const cartRouter = require('./routes/cart.router.js')
const logger = require('morgan');
const { uploader } = require('./utils/multer.js');

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public'))
app.use(logger('dev'))


app.post('/', uploader.single('myFile'), (req, res) => {
    res.send('file uploaded')
})
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

app.use((error, req, res, next) => {
    console.log('error: ', error.stack)
    res.status(500).send('error de server')
})

app.listen(PORT, () => {
    console.log('estoy escuchando el servidor en el puerto: ', PORT)
})