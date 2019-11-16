// var api = require('genius-api');
// var genius = new api(process.env.GENIUS_CLIENT_ACCESS_TOKEN);
const dotenv = require('dotenv');
dotenv.config();

const Lyricist = require('lyricist/node6');
const lyricist = new Lyricist(process.env.GENIUS_CLIENT_ACCESS_TOKEN);

module.exports = lyricist;