const express = require('express');
const userRouter = require('./routes/users.router.js')
const productRouter = require('./routes/products.router.js')
const cartRouter = require('./routes/cart.router.js')
const logger = require('morgan');
const { uploader } = require('./utils/multer.js');

const app = express()
const PORT = 8080
//dirname() -> funcion que da la ruta padre es lo mismo __dirname
//entities for a crud: users, products, sessions, cart, message, tickets
//middleware(? --> Metodo, para procesar los json del clinte
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public')) // el dirname hace que no falle si esta en la nube
app.use(logger('dev')) //middleware de terceros


//endpoints
//se pueden subir archivos en un array en vez de single
app.post('/', uploader.single('myFile'), (req, res) => {
    res.send('file uploaded')
})
app.use('/api/user', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

//este middleware va aca para capturar todos los errores de la aplicacion
app.use((error, req, res, next) => {
    console.log('error: ', error.stack)
    res.status(500).send('error de server')
})

app.listen(PORT, () => {
    console.log('estoy escuchando el servidor en el puerto: ', PORT)
})