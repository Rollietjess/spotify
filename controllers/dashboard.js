"use strict";

const uuid = require('uuid');
const logger = require("../utils/logger");
const playlistStore = require('../models/playlist-store');
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Playlist Dashboard',
      playlists: playlistStore.getUserPlaylists(loggedInUser.id),
    };
    logger.info('about to render', playlistStore.getAllPlaylists());
    response.render('dashboard', viewData);
  },
  
  deletePlaylist(request, response) {
    // console.log("test");
    logger.debug(`Delete playlist ${request.params.id}`);
    playlistStore.removePlaylist(request.params.id);
    response.redirect('/dashboard/');
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
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;