const mongoose = require('mongoose')
mongoose.Promise = global.Promise
//Allow us to use useFindByIdAndModify
mongoose.set('useFindAndModify', false)

const db = {}

db.mongoose= mongoose
db.user = require('./user.model')
db.role = require('./role.model')
db.post = require('./post.model')

db.Roles = ['users', 'admin']

module.exports = db