'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const spotifyApi = require('../spotifyapi');

const SpotifyStore = require('../models/spotify-store');

const spotify = {
  index(request, response) {

    let viewData = {
        title: "spotify",
    };
    response.render("spotify", viewData);
    
  }
};

module.exports = spotify;
