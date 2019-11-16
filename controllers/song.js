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


function createData(response, track, loggedInUser, genius){  
  let geniusYoutube = "";
  let lyrics = genius.lyrics.split(/\n/);

  genius.media.forEach(element => {
    if(element.provider == "youtube") {
      geniusYoutube = element.url.replace("watch?v=", "embed/");
    }
  });

  console.log(geniusYoutube)

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