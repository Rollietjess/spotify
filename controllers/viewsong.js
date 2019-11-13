'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');

const spotifyApi = require('../spotifyapi');

const viewsong = {
  index(request, response) {
    const songId = request.params.id;
    let track = {};
    spotifyApi.getTrack(songId)
      .then(function(data) {
        track = data.body
    }).then(function(){
      console.log(track)
      const viewData = {
        title: 'viewsong',
        track: track
      };
      response.render('viewsong', viewData);
    })
    .catch(function(error) {
      console.error(error);
    });
  },
};

module.exports = viewsong;