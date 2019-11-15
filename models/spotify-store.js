'use strict';

const _ = require('lodash');
const spotifyApi = require('../spotifyapi');

const spotifyStore = {

    getSpotifyArtist(artistId) {
        return spotifyApi.getArtist(artistId).then(data => {return data.body } ).catch(function(error) { console.error(error); });
    },

    getArtistTopTracks(artistId) {
        return spotifyApi.getArtistTopTracks(artistId, "NL").then(data => {return data.body } ).catch(function(error) { console.error(error); });
    },

    getArtistAlbums(artistId) {
        return spotifyApi.getArtistAlbums(artistId, { include_groups: "album"}).then(data => {return data.body } ).catch(function(error) { console.error(error); });
    },

    getRelatedArtists(artistId) {
        return spotifyApi.getArtistRelatedArtists(artistId).then(data => {return data.body } ).catch(function(error) { console.error(error); });
    }
};

module.exports = spotifyStore;