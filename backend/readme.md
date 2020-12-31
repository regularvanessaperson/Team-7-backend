# Project Overview
This repo is the backend for Billy, Nivedh, Ross, and Vanessa's group 3 project, Chirper. When thinking about what type of app we wanted to build, we quickly identified social media as an area of opportunity due to the general lack of trust with existing social media platforms.

This repo includes the models included in our app, the authentication our app uses, and the endpoints our app hits on the database we have set up.

# Link to Frontend Repo

# Link to Deployed API

# Installation Instructions
- Fork & clone this repo
- cd into local directory and `npm install` to install dependencies
- You will need to have mongoDB installed on your computer

# Approach and ERD
The core functionality of our app involves a user making a post, so we began by defining how we wanted to associate posts and models.

# Tech Stack
- React
- Mongoose
- MongoDB

# Routes
Methods | URLs | Actions
--------|------|---------
POST  | /api/auth/signup | register new users
POST  | /api/auth/signin | log in existing users
GET   | /api/test/all    | retrieve public content
GET   | /api/test/user   | access user's content
GET   | /api/test/admin  | access admin's content
POST  | api/posts/post   | publish a new post
PUT   | api/posts/post   | edit an existing post
DELETE| api/posts/post   | delete a tweet
POST  | api/posts/retweet| re-post an existing post
POST  | api/posts/reply  | reply to a post
GET   | api/posts/feed   | view all posts
GET   | api/posts/feed/follow | view all posts from users a user follows
POST  | api/users/follow | follow a user
PUT   | api/users/unfollow | un-follow a user 


# Challenges

