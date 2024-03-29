'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const playlistStore = require('../models/playlist-store');
const spotifyApi = require('../spotifyapi');
const accounts = require ('./accounts.js');

const playlist = {
  index(request, response) {
    const playlistId = request.params.id;
    const error = request.cookies.error;
    const success = request.cookies.success;
    logger.debug('Playlist id = ', playlistId);
    const viewData = {
      title: 'Playlist',
      playlist: playlistStore.getPlaylist(playlistId),
      error: error,
      success: success
    };
    response.cookie('success', "");
    response.cookie('error', "");
    response.render('playlist', viewData);
  },
  
  deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId, songId);
    response.redirect('/playlist/' + playlistId);
  },
  
  addSong(request, response) { 
    const playlistId = request.params.id; 
    const playlist = playlistStore.getPlaylist(playlistId); 
    const loggedInUser = accounts.getCurrentUser(request);

    let songId = "";
    let artistId = "";


    spotifyApi.searchTracks(request.body.title + " "+ request.body.artist, {limit: 1})
    .then(function(data) {
      songId = data.body.tracks.items[0].id
      artistId = data.body.tracks.items[0].artists[0].id
      
    }).then(function(){

      const newSong = {
        id: songId,
        title: request.body.title,
        artist: request.body.artist,
        artistid: artistId,
        duration: Number(request.body.duration),
      };

      const userPlaylists = playlistStore.getUserPlaylists(loggedInUser.id);
      let boolSong = false;
      userPlaylists.forEach(element => {
        if(element.id == playlistId){
          element.songs.forEach(song => {
            if(song.id == songId){
              boolSong = true;
            }
          });
        }
      });

      if(!boolSong){
        playlistStore.addSong(playlistId, newSong); 
        response.cookie('success', "new_song");
        response.redirect('/playlist/' + playlistId); 
      } else {
        response.cookie('error', "duplicate_song");
        response.redirect('/playlist/' + playlistId); 
      }
        
    }).catch(function(error) {
      console.error(error);
    });
  },

  addPlaylistSong(request, response){
    console.log(request.body)
    const loggedInUser = accounts.getCurrentUser(request);
    const playlistId = uuid();

    const newPlayList = {
      id: playlistId,
      userid: loggedInUser.id,
      title: request.body.playlistTitle,
      songs: [],
    };
    playlistStore.addPlaylist(newPlayList);

    const newSong = {
      id: request.body.playlistSongId,
      title: request.body.playlistSongName,
      artist: request.body.playlistArtistName,
      artistid: request.body.playlistArtistId,
      duration: 0,
    };

    const userPlaylists = playlistStore.getUserPlaylists(loggedInUser.id);
    let boolSong = false;
    userPlaylists.forEach(element => {
      if(element.id == playlistId){
        element.songs.forEach(song => {
          if(song.id == request.body.songId){
            boolSong = true;
          }
        });
      }
    });

    if(!boolSong){
      playlistStore.addSong(playlistId, newSong); 
      response.redirect('/playlist/' + playlistId); 
    } else {
      response.redirect('/dashboard/'); 
    }


    // response.redirect('/playlists');
  }
};

module.exports = playlist;