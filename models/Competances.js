const mongoose = require('mongoose')

const competanceShema = new mongoose.Schema({
    name: String,
    image: String,
})

const Competances = mongoose.models.Competances || mongoose.model('Competances', competanceShema)

module.exports = Competances