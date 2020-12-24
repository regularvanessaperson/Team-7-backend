const db = require('../models/index')
//Access to our db thorugh User and Role variable
const User = db.user
const Post = db.post

//make a post
exports.makePost = (req, res) => {

    console.log(req.body)

    const post = new Post({
        creator: req.body.user, 
        body: req.body.text,
        favorites: 0,
        favoritedBy: [],
        reposts: 0,
        repostedBy: [],
        replies: [],
        hashtags: req.body.hashtags,
        isRepost: false,
        isReply: false,
        parentPost: null
    })

    post.save((err) => {
        if (err) {
            res.status(500).send({message: err})
        } 

        
        res.send("Post created successfully.")
    })
    console.log(req.body.user)
    console.log(req.body.hashtags)
    
    res.send(post)
}