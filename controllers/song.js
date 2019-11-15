'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');

const SpotifyStore = require('../models/spotify-store');
const playlistStore = require('../models/playlist-store');
const accounts = require ('./accounts.js');

const song = {
  index(request, response) {
    const songId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    let track = {};
    // const getUserPlaylists = playlistStore.getUserPlaylists();

    (async () => {
      track = await SpotifyStore.getTrack(songId);

      await createData(response, track, loggedInUser);
    }) ();
    
  },
  
  addPlaylist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newPlayList = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      songs: [],
    };
    logger.debug('Creating a new Playlist', newPlayList);
    playlistStore.addPlaylist(newPlayList);
    response.redirect('/playlists');
  },
};

module.exports = song;


function createData(response, track, loggedInUser){
  console.log(loggedInUser)
  
  const viewData = {
    title: 'song',
    track: track,
    playlists: playlistStore.getUserPlaylists(loggedInUser.id),
  };
  response.render('song', viewData);
}