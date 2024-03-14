const mongoose = require('mongoose')

const competenceShema = new mongoose.Schema({
    name: String,
    image: String,
})

const Competences = mongoose.models.Competences || mongoose.model('Competences', competenceShema)

module.exports = Competences