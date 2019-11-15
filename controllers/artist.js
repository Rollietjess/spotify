'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const spotifyApi = require('../spotifyapi');

const SpotifyStore = require('../models/spotify-store');



const artist = {
  index(request, response) {
    const artistId = request.params.id;
    let artist = {};
    let artistTopTracks = {};
    let artistAlbums= {};
    let relatedArtists = {};
  
    (async () => {
      artist = await SpotifyStore.getSpotifyArtist(artistId);
      artistTopTracks = await SpotifyStore.getArtistTopTracks(artistId);
      artistAlbums = await SpotifyStore.getArtistAlbums(artistId);
      relatedArtists = await SpotifyStore.getRelatedArtists(artistId);

      await createData(artist, artistId, artistTopTracks, artistAlbums, relatedArtists, response);
    }) ();

  },
  
};

module.exports = artist;

function createData(artist, artistId, artistTopTracks, artistAlbums, relatedArtists, response){
  
  const viewData = {
    title: 'artist',
    artistId: artistId,
    artist: artist,
    artistTopTracks: artistTopTracks,
    artistAlbums: artistAlbums,
    relatedArtists: relatedArtists
  };

  response.render('artist', viewData);
}