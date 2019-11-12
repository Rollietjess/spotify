const dotenv = require('dotenv');
dotenv.config();

var SpotifyWebApi = require('spotify-web-api-node');

// The object we'll use to interact with the API
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// console.log(spotifyApi);

// Using the Client Credentials auth flow, authenticate our app
spotifyApi.clientCredentialsGrant()
  .then(function (data) {
    // console.log('The access token is ' + data.body['access_token']);
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(function (err) {
    console.log('Something went wrong!', err);
  });

module.exports = spotifyApi;