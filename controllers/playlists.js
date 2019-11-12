"use strict";

const uuid = require('uuid');
const logger = require("../utils/logger");
const playlistStore = require('../models/playlist-store');
const accounts = require ('./accounts.js');

const playlists = {
  index(request, response) {
    logger.info('Playlists rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Playlists',
      playlists: playlistStore.getUserPlaylists(loggedInUser.id),
    };
    logger.info('about to render', playlistStore.getAllPlaylists());
    response.render('playlists', viewData);
  },
  
  deletePlaylist(request, response) {
    // console.log("test");
    logger.debug(`Delete playlist ${request.params.id}`);
    playlistStore.removePlaylist(request.params.id);
    response.redirect('/playlists/');
    // const playlistId = request.params.id;
    // const songId = request.params.songid;
    // logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    // playlistStore.removeSong(playlistId, songId);
    // response.redirect('/playlist/' + playlistId);
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

module.exports = playlists;