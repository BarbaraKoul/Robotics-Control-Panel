//We read Port and MongoDB URL from .env file

require('dotenv').config()

const PORT = process.env.PORT
const mongoUrl= process.env.MONGO_URI

module.exports = { mongoUrl, PORT }