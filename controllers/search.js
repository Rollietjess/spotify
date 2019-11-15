'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');

const SpotifyStore = require('../models/spotify-store');

const search = {
  index(request, response) {
    let viewData = {};
    response.render("search", viewData);
    
  },

  result(request, response) {
    let searchValue = request.body.searchValue;
    let tracks = {};
    let artists = {};
        

    (async () => {
      tracks = await SpotifyStore.searchTracks(searchValue);
      artists = await SpotifyStore.searchArtists(searchValue);

      await createData(response, tracks, artists);
    }) ();
  }
};

module.exports = search;


function createData(response, tracks, artists){

  const viewData = {
    title: 'search',
    tracks: tracks,
    artists: artists
  };
  response.render('search', viewData);
}