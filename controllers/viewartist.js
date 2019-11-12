'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const spotifyApi = require('../server.js');

const viewartist = {
  index(request, response) {
    const artistId = request.params.id;
    const artist = null;
    console.log(spotifyApi);
    // server.app.get('/artist', function (request, response) {
    //   console.log(request.query)
    //     const artistId = request.query.artistID;

        // console.log("artist " + artistId);
      // Get information about an artist
      spotifyApi.getArtist(artistId)
        .then(function(data) {

          // Send the list of tracks
          // response.send(data.body);
        artist = data.body;

        }, function(err) {
          console.error(err);
        });
    // });
    
    // console.log("artist " + artistId);
    const viewData = {
      title: 'artist',
      artistId: artistId,
      artist: artist
    };
    response.render('viewartist', viewData);
  },
};

module.exports = viewartist;