/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

require('dotenv').config();
const path = require('path');

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = process.env.REDIRECT_URI; // Your redirect uri
var port = process.env.PORT;
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(path.join(__dirname, '../../client/build')))
   .use(cookieParser());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.get('/login', function(req, res) {
  console.log("IN /login");
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-birthdate user-read-private user-read-email user-read-playback-state user-library-read playlist-read-private playlist-read-collaborative';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    })
  );
});

app.get('/callback', function(req, res) {
  console.log("IN /callback")

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        console.log("ACCESS_TOKEN: ", access_token)

        //search for tracks using the query 'hello'
        var options = {
          url: 'https://api.spotify.com/v1/search?q=hello&type=track',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
          if(response.statusCode !== 200){
            console.log("HTTP Status code: ");
            console.log(response.statusCode);
          }
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3000/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token/:refresh_token', function(req, res) {
  console.log("in /refresh_token");

  // requesting access token from refresh token
  var refresh_token = req.params.refresh_token;
  console.log('refresh_token: '+ refresh_token);
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      console.log("HTTP Status code:");
      console.log(response.statusCode);
      console.log("access_token: " + access_token);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send({
        'access_token': access_token
      });
    }
    else{
      console.log(error);
    }
  });
});

app.get('/discover_playlist', function(req, res) {
  console.log("IN RECOMMENDATIONS");
  //console.log('Cookies: ', req.cookies)

  var authOptions = {
    url: 'https://api.spotify.com/v1/users/ameliagalgon/playlists',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + req.cookies['access_token']
    },
    json: true
  };

  request.get(authOptions, function(error, response, body) {
    if (response.statusCode === 200) {
      console.log("HTTP Status code:");
      console.log(response.statusCode);

      var playlist = body.items.find(playlist => {
        if(playlist.name === "Discover Weekly"){
          return playlist
        }
      });
      var playlist_id = playlist.id
      console.log(playlist);
      res.send({
        'id': playlist_id
      });
    }
    else{
      console.log("ERROR: "+ error);
    }
  });

});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

console.log('Listening on ' + port);
app.listen(port);
