const mongoose = require('mongoose')

const categorieSchema = new mongoose.Schema({
    name: String,
    image: String,
    content: [],
})

const Categories = mongoose.models.Categories || mongoose.model('Categories', categorieSchema)

module.exports = Categories