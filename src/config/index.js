const { connect } = require('mongoose')

module.exports.connectDB = async () => {
    console.log('Base de datos conectada')
    return await connect('mongodb+srv://jplamattina:asdasd11@coderclustertest.dg4ee.mongodb.net/ecommerceCoder?retryWrites=true&w=majority&appName=CoderClusterTest')
}