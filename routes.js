'use strict';

const express = require('express');
const router = express.Router();

const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const playlist = require('./controllers/playlist.js');
const accounts = require('./controllers/accounts.js');
const playlists = require('./controllers/playlists.js');
const song = require('./controllers/song.js');
const artist = require('./controllers/artist.js');

// GET
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/playlist/:id', playlist.index);
router.get('/playlist/:id/deletesong/:songid', playlist.deleteSong);
router.get('/playlists/deleteplaylist/:id', playlists.deletePlaylist);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/playlists', playlists.index);
// router.get('/', playlists.index);
router.get('/song/:id', song.index);
router.get('/artist/:id', artist.index);

// POST
router.post('/playlist/:id/addsong', playlist.addSong);
router.post('/playlists/addplaylist', playlists.addPlaylist);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

module.exports = router;
