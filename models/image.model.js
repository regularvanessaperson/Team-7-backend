const mongoose = require('mongoose')

const Image = mongoose.model(
    'Image',
    new mongoose.Schema({
        img: { data: Buffer, contentType: String}
    })
)

module.exports = Image
