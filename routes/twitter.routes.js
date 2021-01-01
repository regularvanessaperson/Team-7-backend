const controller = require('../controllers/twitterAPI.controller') 

module.exports = function(app) {
    //Make a post request to receive bearer token
    // app.post('/api/twitter/requestToken', controller.requestToken)
    //get the location Id of a user's country from twitter API
    app.get('/api/twitter/locationId/:userId/:country', controller.locationId)
    //get the trending topics from a user's location
    //locationId as contained in a user document
    app.get('/api/twitter/trending/:locationId', controller.getTopics)
}