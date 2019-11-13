'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');

const spotifyApi = require('../spotifyapi');

const song = {
  index(request, response) {
    const songId = request.params.id;
    let track = {};
    spotifyApi.getTrack(songId)
      .then(function(data) {
        track = data.body
    }).then(function(){
      console.log("track:::")
      console.log(track)
      const viewData = {
        title: 'song',
        track: track
      };
      response.render('song', viewData);
    })
    .catch(function(error) {
      console.error(error);
    });
  },
};

module.exports = song;