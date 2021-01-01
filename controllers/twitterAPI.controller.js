require('dotenv').config()
const User = require("../models/user.model")
const axios = require('axios')

//my attempts to implement Oauth 1.0 to get access to Twitter API. Postman generates signatures properly automatically, but for some reason I keep getting errors. Moving on for now
const nonceGen = (length) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// const twitterSignature = (httpMethod, requestUrl) => {
//     let method = httpMethod 
//     let url = requestUrl
//     let oauth_consumer_key = "ZWF5tM05jaC39AjejfRAaPjcg"
//     let oauth_nonce = nonceGen(15)
//     let oauth_signature_method = 'HMAC-SHA1'
//     let oauth_timestamp = Date.now()
//     let oauth_token = "1043472200-eefO2E2NV4ga1YTspnTp2faUfLFJJ24Mh9ajRmC"
//     let oauth_version = "1.0"
// }


//Current user's country should be sent as param
const assignLocationId = (data, country, userId) => {
    // console.log(data)
    for (let i = 0; i < data.length; i++){
        if (data[i].country.toUpperCase() === country.toUpperCase()){
            User.findById(userId, (err, user) => {
                if (err) {
                    console.log(err)
                }
                user.locationId = data[i].woeid
                console.log("User's woeid set to " + user.locationId)
            })
            return
        }
    }
    console.log('Location not found')
}

exports.locationId = (req, res) => {
    let header = generateHeader()
    axios.get('https://api.twitter.com/1.1/trends/available.json', {
        headers: header 
    }).then(async (response) => {
        await assignLocationId(response.data, req.params.country, req.params.userId)
        res.redirect('/')
    }).catch((err) => {
        console.log('there was an error')
    })
}

exports.getTopics = (req, res) => {
    let header = generateHeader()
    console.log(header)
    axios.get(`https://api.twitter.com/1.1/trends/place.json?id=${req.params.locationId}`, {
        headers: header
    }).then((response) => {
        console.log(response.data[0].trends)
    }).catch((err) => {
        console.log('there was an error')
    })
}



// const oauthSignature = require('oauth-signature')

// var nonceGen = (length) => {
//     let text = "";
//     let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     for(var i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
// }

// const generateHeader = () => {
//     let httpMethod = 'GET'
//     let url = 'https://api.twitter.com/1.1/trends/place.json'
//     let parameters = {
//         oauth_consumer_key: "ZWF5tM05jaC39AjejfRAaPjcg",
//         oauth_token: "1043472200-eefO2E2NV4ga1YTspnTp2faUfLFJJ24Mh9ajRmC",
//         oauth_nonce: `${nonceGen(11)}`,
//         oauth_timestamp: `${Date.now()}`,
//         oauth_signature_method: "HMAC-SHA1",
//         oauth_version: '1.0'
//     }
//     let consumerSecret = '5pK7VpxNwqWe8XrDybmOTjFDjv9jDY8zFvj2QsWdAn90MCf4cx'
//     let tokenSecret = 'CPrw5BEcY0WprDfPytlKoLCWC7xpQyqXd8kObrwObTh7p'

//     // let encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret)
//     let signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,
//         { encodeSignature: false});

//     const authHeader = {
//         'Authorization': `OAuth oauth_consumer_key="ZWF5tM05jaC39AjejfRAaPjcg",oauth_token="1043472200-eefO2E2NV4ga1YTspnTp2faUfLFJJ24Mh9ajRmC",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${parameters.oauth_timestamp}",oauth_nonce="${parameters.oauth_nonce}",oauth_version="1.0",oauth_signature="${signature}"`, 
//         'Cookie': 'personalization_id="v1_0ybBaQ6Fr0zwx0cqjJD5sQ=="; guest_id=v1%3A160942221443757390; lang=en'
//     }
//     console.log(authHeader)
//     return authHeader
// }
