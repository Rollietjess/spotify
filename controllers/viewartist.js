'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const spotifyApi = require('../spotifyapi');



const viewartist = {
  index(request, response) {
    const artistId = request.params.id;
  
    let artist = {};
    const result = spotifyApi.getArtist(artistId)
    .then(function (data) {
      artist = data.body;
     
    }, function (err) {
      console.error(err);
    }).then(function() { 
      console.log(artist)
      const viewData = {
        title: 'artist',
        artistId: artistId,
        artist: artist
      };
      response.render('viewartist', viewData);
    });     
  },
};

module.exports = viewartist;