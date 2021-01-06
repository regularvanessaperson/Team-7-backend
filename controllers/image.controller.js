const db = require('../models/index')

const User = db.user

exports.uploadImage = (req, res) => {
    let newImage = new Image()
    newImage.img.data = fs.readFileSync(req.files.userPhoto.path)
    newImage.img.contentType = 'image/png'
    newImage.save((err) => {
        console.log('Image Saved!', newImage._id)
    })

    User.findById(req.body.userId, (err, user) => {
        user.profilePic.push(newImage._id)
        user.save((err) => {
            console.log('Image referenced by user!')
        })
    })
}