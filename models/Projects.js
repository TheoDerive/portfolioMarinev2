const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: string,
    image: string,
    description: string,
    date: string,
})

const Projects = mongoose.models.Projects || mongoose.model('Projects', projectSchema)

module.exports = Projects