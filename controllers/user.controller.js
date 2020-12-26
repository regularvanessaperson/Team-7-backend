const db = require('../models/index')
//Access to our db thorugh User and Role variable
const User = db.user
const Post = db.post

exports.allAccess = (req, res)=>{
    res.status(200).send("public content")
}

exports.userBoard = (req, res) => {
    res.status(200).send("User content")
}

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin content")
}

exports.follow = (req, res) => {
     User.findOne({"_id": req.body.currentUser}, async function (err, user) {
        if (!user.followed.includes(req.body.otherUserId)){
            await user.followed.push(req.body.otherUserId)
            console.log(user)
        }
    })
     User.findOne({"_id": req.body.otherUserId}, async function (err, user) {
        if (!user.followers.includes(req.body.currentUser)){
            await user.followers.push(req.body.currentUser)
            console.log(user)
        }
    })
    res.send("Follow successful")
}

exports.unfollow = (req, res) => {
    User.findOne({"_id": req.body.currentUser}, async function (err, user) {
        await user.followed.pull(req.body.otherUserId)
        console.log(user)
    })
    User.findOne({"_id": req.body.otherUserId}, async function (err, user) {
        await user.followers.pull(req.body.currentUser)
        console.log(user)
    })
    res.send("Unfollow successful")
}
