"use strict";

const uuid = require('uuid');
const logger = require("../utils/logger");
const playlistStore = require('../models/playlist-store');
const accounts = require ('./accounts.js');
const SpotifyStore = require('../models/spotify-store');

const dashboard = {
  index(request, response) {
    let recom = {};
    const loggedInUser = accounts.getCurrentUser(request);

    (async () => {
      recom = await SpotifyStore.getRecommendations();

      await createData(response, playlistStore, loggedInUser, recom);
    }) ();
  },
  
  deletePlaylist(request, response) {
    logger.debug(`Delete playlist ${request.params.id}`);
    playlistStore.removePlaylist(request.params.id);
    response.redirect('/dashboard/');
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


function createData(response, playlistStore, loggedInUser, recom){
  // console.log(playlistStore.getUserPlaylists(loggedInUser.id))
  const viewData = {
    title: 'Playlist Dashboard',
    playlists: playlistStore.getUserPlaylists(loggedInUser.id),
    recom: recom
  };
  response.render('dashboard', viewData);
}