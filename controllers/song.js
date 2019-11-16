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
    console.log(request.body.playlist)
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
    
    
    // const playlist = playlistStore.getPlaylist(playlistId); 
    // const loggedInUser = accounts.getCurrentUser(request);

    // let songId = "";
    // let artistId = "";


    // spotifyApi.searchTracks(request.body.title + " "+ request.body.artist, {limit: 1})
    // .then(function(data) {
    //   songId = data.body.tracks.items[0].id
    //   artistId = data.body.tracks.items[0].artists[0].id
      
    // }).then(function(){

    //   const newSong = {
    //     id: songId,
    //     title: request.body.title,
    //     artist: request.body.artist,
    //     artistid: artistId,
    //     duration: Number(request.body.duration),
    //   };

    //   const userPlaylists = playlistStore.getUserPlaylists(loggedInUser.id);
    //   let boolSong = false;
    //   userPlaylists.forEach(element => {
    //     if(element.id == playlistId){
    //       element.songs.forEach(song => {
    //         if(song.id == songId){
    //           boolSong = true;
    //         }
    //       });
    //     }
    //   });
    //   const viewData = {
    //     boolSong: boolSong
    //   };
    //   if(!boolSong){
    //     playlistStore.addSong(playlistId, newSong); 
    //     response.redirect('/playlist/' + playlistId); 
    //   } else {
    //     response.redirect('/playlist/' + playlistId); 
    //   }
        
    // }).catch(function(error) {
    //   console.error(error);
    // });



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