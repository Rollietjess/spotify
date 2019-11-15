'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');

const SpotifyStore = require('../models/spotify-store');

const album = {
  index(request, response) {
    const albumId = request.params.id;
    let album = {};
        
    (async () => {
      album = await SpotifyStore.getAlbum(albumId);

      await createData(response, album);
    }) ();
  },
  
};

module.exports = album;


function createData(response, album){
console.log(album)
  const viewData = {
    title: 'album',
    album: album
  };
  response.render('album', viewData);
}