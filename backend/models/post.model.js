const mongoose = require('mongoose')

const Post = mongoose.model(
    "Post",
    new mongoose.Schema({
        creator: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        // creatorThumbnail: [],
        // timestamp: Date,
        body: String,
        favorites: Number,
        favoritedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        reposts: Number,
        repostedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        // topics: []
        hashtags: [],
        isRepost: Boolean,
        isReply: Boolean,
        parentPost: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        // media: []
    })
)

module.exports = Post