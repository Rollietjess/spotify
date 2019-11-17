'use strict';

const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cookieParser());
const exphbs = require('express-handlebars');
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(express.static('public'));
app.use(fileUpload());
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
}));
app.set('view engine', '.hbs');

const routes = require('./routes');
app.use('/', routes);

var SpotifyWebApi = require('spotify-web-api-node');


let redirectUri = 'http://localhost:4000/callback'
var scopes = ['user-top-read', 'user-read-recently-played'];
var showDialog = true;

// The object we'll use to interact with the API
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: redirectUri,
});

app.get("/authorize", function (request, response) {
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, null, showDialog);
  // console.log(authorizeURL)
  response.send(authorizeURL);
});

// Exchange Authorization Code for an Access Token
app.get("/callback", function (request, response) {
  var authorizationCode = request.query.code;
  
  spotifyApi.authorizationCodeGrant(authorizationCode)
  .then(function(data) {
    // console.log(data)
    response.redirect(`spotify/#access_token=${data.body['access_token']}&refresh_token=${data.body['refresh_token']}`)
  }, function(err) {
    console.log('Something went wrong when retrieving the access token!', err.message);
  });
});

app.get("/logout", function (request, response) {
  response.redirect('/'); 
});

app.get('/myendpoint', function (request, response) {
  var loggedInSpotifyApi = new SpotifyWebApi();
  console.log(request.headers['authorization'].split(' ')[1]);
  loggedInSpotifyApi.setAccessToken(request.headers['authorization'].split(' ')[1]);
  // Search for a track!
  loggedInSpotifyApi.getMyTopTracks()
    .then(function(data) {
      // console.log(data.body);
      response.send(data.body);
    }, function(err) {
      console.error(err);
    });
  
});

app.get('/myendpoint2', function (request, response) {
  var loggedInSpotifyApi = new SpotifyWebApi();
  console.log(request.headers['authorization'].split(' ')[1]);
  loggedInSpotifyApi.setAccessToken(request.headers['authorization'].split(' ')[1]);
  // Search for a track!
  loggedInSpotifyApi.getMyRecentlyPlayedTracks({type: "track"})
    .then(function(data) {
      console.log(data.body.items);
      response.send(data.body);
    }, function(err) {
      console.error(err);
    });
  
});

app.get('/myendpoint3', function (request, response) {
  var loggedInSpotifyApi = new SpotifyWebApi();
  console.log(request.headers['authorization'].split(' ')[1]);
  loggedInSpotifyApi.setAccessToken(request.headers['authorization'].split(' ')[1]);
  // Search for a track!
  loggedInSpotifyApi.getUserPlaylists()
    .then(function(data) {
      console.log(data.body.items);
      response.send(data.body);
    }, function(err) {
      console.error(err);
    });
  
});

const listener = app.listen(process.env.PORT || 4000, function () {
  logger.info(`glitch-template-1 started on port ${listener.address().port}`);
});