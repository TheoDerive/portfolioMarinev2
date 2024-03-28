const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    categoryName: String,
    projetName: String,
    projetImage: String,
    projetDescription: String,
    projetDate: String,
    isLarge: Boolean,
    isTall: Boolean
})

const Projects = mongoose.models.Projects || mongoose.model('Projects', projectSchema)

module.exports = Projects