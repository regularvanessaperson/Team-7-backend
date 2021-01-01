const mongoose = require("mongoose")

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        followed: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        favoritePosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        reposts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        location: String,
        locationId: String,
        birthday: Date,
        dateRegistered: Date,
        // profilePic: [],
        // bannerPic: [],
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    })
)

module.exports = User