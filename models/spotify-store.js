'use strict';

const _ = require('lodash');
const spotifyApi = require('../spotifyapi');
const lyricist = require('../geniusapi');

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
    },

    getTrack(songId) {
        return spotifyApi.getTrack(songId).then(data => {return data.body } ).catch(function(error) { console.error(error); });
    },

    searchTracks(value) {
        return spotifyApi.searchTracks(value).then(data => {return data.body.tracks.items } ).catch(function(error) { console.error(error); });
    },

    searchArtists(value) {
        return spotifyApi.searchArtists(value).then(data => {return data.body.artists.items } ).catch(function(error) { console.error(error); });
    },

    getAlbum(albumId) {
        return spotifyApi.getAlbum(albumId).then(data => {return data.body } ).catch(function(error) { console.error(error); });
    },

    getRecommendations(){
        return spotifyApi.getRecommendations({limit: 10 ,market: "NL", seed_genres: ["indie", "rock"]} ).then(data => {return data.body } ).catch(function(error) { console.error(error); });
    },

    getGenius(song) {
        return lyricist.song(song, { fetchLyrics: true, textFormat: 'html' }).then(song => {return song }).catch(function(error) { console.error(error); });
    },
    
    getGeniusSearch(query) {
        return lyricist.search(query, { page: 1 }).then(song => {return song }).catch(function(error) { console.error(error); });
    }
};

module.exports = spotifyStore;