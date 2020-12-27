const db = require('../models/index')
//Access to our db thorugh User and Role variable
const User = db.user
const Post = db.post

//make a post
exports.makePost = (req, res) => {
    console.log(req.body)
    //creating post object
    const post = new Post({

        // creator: req.body.creator, 
        body: req.body.body,
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
    //Find the user and add user as creator to the post
    
        User.find({
            _id: { $in: req.body.creator }
        }, (err, users) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }
            //set the reference to the user as the creator of post
            post.creator = users.map(user => user._id)
            //save post to database
            post.save((err) => {
                if (err) {
                    res.status(500).send({message: err})
                } 
                res.send("Post created successfully.")
            })
            // console.log(req.body.user)
            // console.log(req.body.hashtags)
            console.log(post)
            //when testing is done we need to 
            // res.send(post)
        })
    
}

//edit post - to test add the _id of the post and update the post body
exports.editPost= (req, res) => {
    const id = req.body._id
    Post.updateOne({_id: id}, {
        body: req.body.body
    }).then((data)=> {
        if (!data)
        return res.status(400).send({message: "Unable to update post"})
        else res.send(data)
    })
}


//delete post
exports.deletePost = (req,res) => {
    const id = req.body._id
    Post.deleteOne({_id: id})
    .then((data)=>{
        if(!data)
        return res.status(400).send({message: "Unable to delete post"})
        else res.send(data)

    })
}

//route to get posts created by a user that current user follows
exports.userFollowing = (req, res) => {
    
    let userFollowingArray = []
    
    User.findById(req.body.creator, (err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }

        userFollowingArray = user.followed
        console.log(user)
        console.log('USER FOLLOWING ARRAY -->', userFollowingArray)
        console.log('USER FOLLOWING ARRAY LENGTH -->', userFollowingArray.length)
    
    }).then(() => {
    
    
    if(userFollowingArray.length > 0) {
        userFollowingArray.forEach(follower => 
        Post.find({
            creator: { $eq: follower }
        })
        )
        res.send({message: 'Posts retrieved'})
        //console.log(res)
    } else {
        console.log('USER FOLLOWING ARRAY LENGTH -->', userFollowingArray.length)
        res.send({ message: 'You are not following anyone' })
    }
    }
    )
    
}

//route to display all posts "/api/posts/feed" 
exports.allPosts = (req, res) => {
    Post.find()
    .then((data)=> {
        res.send(data)
    })
    .catch((err) => {
        res.status(500).send({
            message: err || "Some error occured while retreiving tutorials"
        })
    })
}

//route to display one post only "/api/posts/:id"
exports.onePost = (req, res) => {
    const id = req.params.idx
    console.log(id)
    Post.find({_id: id})
    .then((post)=>{
        if(!post)
        return res.status(400).send({message: "Cannot find this post"})
        else res.send(post)
    })
}

//route to create a retweet post
exports.retweetPost = (req, res) => {
    //res.send({message: "Retweet post created"})
    console.log(req.body)
    //create post object with isRepost set to true
    const post = new Post({

        creator: req.body.creator, 
        body: req.body.body,
        favorites: 0,
        favoritedBy: [],
        reposts: 0,
        repostedBy: [],
        replies: [],
        hashtags: req.body.hashtags,
        isRepost: true,
        isReply: false,
        parentPost: req.body.parentPost
    })
    //Find the user and add user as creator to the post
    
        User.find({
            _id: { $in: req.body.creator }
        }, (err, users) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }
            //set the reference to the user as the creator of post
            post.creator = users.map(user => user._id)
            //save post to database
            post.save((err) => {
                if (err) {
                    res.status(500).send({message: err})
                } 
                res.send("Post created successfully.")
            })
            //add post to user's post array on model
            
            users[0].posts.push(post._id)
            console.log('USER INFO', users[0], post._id)
            users[0].save()
            // console.log(req.body.user)
            // console.log(req.body.hashtags)
            console.log(post)
            
        })
}
