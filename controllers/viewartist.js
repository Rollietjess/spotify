'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const spotifyApi = require('../spotifyapi');



const viewartist = {
  index(request, response) {
    const artistId = request.params.id;
    let artistTopTracks = {};
    let artistAlbums= {};
  
    let artist = {};

    
    spotifyApi.getArtist(artistId)
      .then(function(data) {
        artist = data.body
      })
      .then(function() {
        spotifyApi.getArtistTopTracks(artistId, "NL")
        .then(function(data){
          console.log("1")
          artistTopTracks = data.body
        }).then(function() {
          spotifyApi.getArtistAlbums(artistId, { include_groups: "album"})
          .then(function(data) {
            artistAlbums = data.body;
          }).then(function() {
            console.log("2")
            console.log(artist)
            const viewData = {
                  title: 'artist',
                  artistId: artistId,
                  artist: artist,
                  artistTopTracks: artistTopTracks,
                  artistAlbums: artistAlbums
                };
                response.render('viewartist', viewData);
          })
        })
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  
};

module.exports = viewartist;