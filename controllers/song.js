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
    let genius = {};
    let geniusSearch = {};
    let query = "";

    (async () => {
      track = await SpotifyStore.getTrack(songId);
      query = await getSearchTerm(track);
      geniusSearch = await SpotifyStore.getGeniusSearch(query);
      genius = await SpotifyStore.getGenius(geniusSearch[0].id);

      await createData(response, track, loggedInUser, genius);
    }) ();
    
  },
  
  addSong(request, response) { 
    const playlistId = request.body.playlist;
    const loggedInUser = accounts.getCurrentUser(request);

    const newSong = {
      id: request.body.songId,
      title: request.body.songName,
      artist: request.body.artistName,
      artistid: request.body.artistId,
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
      response.redirect('/song/' + request.body.songId); 
    }
  }
};

module.exports = song;


function createData(response, track, loggedInUser, genius){  
  let geniusYoutube = "";
  let lyrics = genius.lyrics.split(/\n/);

  genius.media.forEach(element => {
    if(element.provider == "youtube") {
      geniusYoutube = element.url.replace("watch?v=", "embed/");
    }
  });

  const viewData = {
    title: 'song',
    track: track,
    playlists: playlistStore.getUserPlaylists(loggedInUser.id),
    geniusYoutube: geniusYoutube,
    lyrics: lyrics
  };
  response.render('song', viewData);
}

function getSearchTerm(track) {
  let artistName = track.artists[0].name;
  let songName = track.name;
  let fullName = songName + " " + artistName;
  return fullName;
}