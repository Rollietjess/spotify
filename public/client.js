// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  let hashRemember = ""
  $('#login').click(function() {
    // Call the authorize endpoint, which will return an authorize URL, then redirect to that URL
    $.get('/authorize', function(data) {
      console.log(data)
      window.location = data;
    });
  });
  
  const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
    window.location.hash = '';
    hashRemember = hash.access_token
    console.log(hashRemember)
  if (hash.access_token) {
    $.get({url: '/myendpoint', headers: {"Authorization": `Bearer ${hash.access_token}`}}, function(data) {
      // "Data" is the array of track objects we get from the API. See server.js for the function that returns it.
      // console.log(data)

      var title = $('<h3>Your top tracks on Spotify</h3>');
      title.prependTo('#data-container1 .card_top');

      // For each of the tracks, create an element
      data.items.forEach(function(track) {
        var trackDiv = $('<div class="card_option flex_thing"></div>');
        trackDiv.text(track.name + " / " + track.artists[0].name);
        trackDiv.appendTo('#data-container1 .card_body');
      });

    });

    $.get({url: '/myendpoint2', headers: {"Authorization": `Bearer ${hash.access_token}`}}, function(data) {
      // "Data" is the array of track objects we get from the API. See server.js for the function that returns it.


      var title = $('<h3>Recently played tracks on Spotify</h3>');
      title.prependTo('#data-container2 .card_top');

      // For each of the tracks, create an element
      data.items.forEach(function(track) {
        
        var trackDiv = $('<div class="card_option flex_thing"></div>');
        trackDiv.text(track.track.name + " / " + track.track.artists[0].name);
        // trackDiv.text(track.track.name);
        trackDiv.appendTo('#data-container2 .card_body');
      });

    });

    $.get({url: '/myendpoint3', headers: {"Authorization": `Bearer ${hash.access_token}`}}, function(data) {
      // "Data" is the array of track objects we get from the API. See server.js for the function that returns it.
      console.log("track!")
      console.log(data)

      var title = $('<h3>User playlists</h3>');
      title.prependTo('#data-container3 .card_top');

      // For each of the tracks, create an element
      data.items.forEach(function(track) {
        var trackDiv = $('<div class="card_option flex_thing"></div>');
        // trackDiv.text(track.track.name + " / " + track.artists[0].name);
        trackDiv.text(track.name);
        trackDiv.appendTo('#data-container3 .card_body');
      });

    });
  }

});
