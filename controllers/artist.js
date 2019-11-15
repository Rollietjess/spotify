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

      console.log("1");
      await createData(artist, artistId, artistTopTracks, artistAlbums, relatedArtists, response);
    }) ();

    

    
    // spotifyApi.getArtist(artistId)
    //   .then(function(data) {
    //     artist = data.body
    //   })
    //   .then(function() {
    //     spotifyApi.getArtistTopTracks(artistId, "NL")
    //     .then(function(data){
    //       console.log("1")
    //       artistTopTracks = data.body
    //     }).then(function() {
    //       spotifyApi.getArtistAlbums(artistId, { include_groups: "album"})
    //       .then(function(data) {
    //         artistAlbums = data.body;
    //       }).then(function() {
    //         spotifyApi.getArtistRelatedArtists(artistId)
    //         .then(function(data){
    //           relatedArtists = data.body;
    //         }).then(function() {
    //           console.log(relatedArtists)
    //           const viewData = {
    //                 title: 'artist',
    //                 artistId: artistId,
    //                 artist: artist,
    //                 artistTopTracks: artistTopTracks,
    //                 artistAlbums: artistAlbums,
    //                 relatedArtists: relatedArtists
    //               };
    //               response.render('artist', viewData);
    //         })

    //       })
    //     })
    //   })
    //   .catch(function(error) {
    //     console.error(error);
    //   });
  },
  
};

module.exports = artist;

function createData(artist, artistId, artistTopTracks, artistAlbums, relatedArtists, response){
  console.log("2")
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