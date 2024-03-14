const mongoose = require('mongoose')
require('dotenv').config()

let isConnected = false

const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(!isConnected){
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName: "MarinePortfolio"
            })

            isConnected = true
        } catch (error) {
            console.error('Il y a eu une erreur', error)
        }
    }
}

module.exports = {
    connectToDB
}