import React, { Component } from 'react';
//import gear from './images/gear.png';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import Request from 'superagent'
import Request from 'axios'
import Cookies from 'js-cookie';

//components
import Welcome from './components/Welcome'
import User from './components/User'
import Collection from './components/Collection'
import Menu from './components/Menu'
import SearchBar from './components/SearchBar'
import SearchItems from './components/SearchItems'
//import Sportify


const spotifyApi = new SpotifyWebApi();

class App extends Component {

  constructor(){
    super();
    var token = Cookies.get('access_token');
    if (token){
      spotifyApi.setAccessToken(token);
      //spotifyApi.setRefreshToken(refresh_token);
    } else {
      var params = this.getHashParams();
      token = params.access_token;
      if (token){
        spotifyApi.setAccessToken(token);
        Cookies.set('access_token', token);
        Cookies.set('refresh_token', params.refresh_token);
      }
    }

    this.state = {
      loggedIn : token ? true : false
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  getHashParams(){
    //window.location.hash = '';
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  refreshAccessToken(){
    var refresh_token = Cookies.get('refresh_token');
    Request.get('http://localhost:8888/refresh_token/' + refresh_token).then( result => {
      console.log("REFRESH REQUEST PASSED");
      var access_token = result.data['access_token'];
      Cookies.set('access_token', access_token);
      console.log(Cookies.get('access_token'));
      spotifyApi.setAccessToken(access_token);
    }).catch(error => {
      console.log(error.message);
    });

  }

  getCurrentUser(){
    console.log("Getting currentUser");
    return spotifyApi.getMe().then( response => {return response} )
      .catch(() => {
        console.log("Error in getCurrentUser. Need to refresh access token");
        this.refreshAccessToken();
      });
  }

  getSavedAlbums(){
    var savedAlbums = spotifyApi.getMySavedAlbums({
      limit: 50,
      offset: 0
    })
    .then(function(data) {
      // Output items
      console.log(data);
      return data.items;
    }).catch(error => {
      console.log(error.message);
      this.refreshAccessToken();
    });
    return savedAlbums;
  }

  handleSearch(query){
    return spotifyApi.searchTracks(query).then((data) => {
      //TODO: do not map duplicates
      var albumIDs = data.tracks.items.map(item => item.album.id);
      console.log(albumIDs);
      var uniqueAlbums = [];
      var uniqueIDs = []
      for(var i = 0; i < albumIDs.length; i++){
        if(uniqueIDs.indexOf(albumIDs[i]) == -1){
          uniqueAlbums.push(data.tracks.items[i]);
          uniqueIDs.push(albumIDs[i]);
        }
      }
      uniqueAlbums = uniqueAlbums.map(item => item.album);
      console.log(uniqueIDs);
      //var albums = uniqueAlbums.map(item => item.album);
      this.setState({
        albums: uniqueAlbums
      });
      console.log(this.state.albums);
    }, function(err) {
      console.error(err);
    });
  }


  render() {
    return (
      <Router>
        <div className='App'>
          { !this.state.loggedIn &&
            <div>
            <Welcome />
            <div className="login">
              <a href="http://localhost:8888/login">Login to Spotify</a>
            </div>
            </div>
          }
          { this.state.loggedIn &&
            <div className="App-content">
              <User user={ this.getCurrentUser() } />
              <Menu />
              <Route exact={true} path="/" render={() => (
                <h1>Home</h1>
              )} />
              <Route path="/collection" render={() =>(
                <Collection albums={ this.getSavedAlbums() } />
              )} />
              <Route path="/search" render={() =>(
                <div className="Search">
                  <SearchBar searchFunc={ this.handleSearch }/>
                  { this.state.albums &&
                    <SearchItems albums={ this.state.albums } />
                  }
                </div>
              )} />
            </div>

          }
        </div>
      </Router>
    );
  }
    /*
    return (
      <div className="content">
        <div className="tape-player">
          <div className="tape-body">
            <div className="tape-content">
              <div className="tape-label">
                <div className="artist">Artist name</div>
                <div className="album">Album name</div>
              </div>
              <div className="tape-gears">
                <div className="gear"><img src={gear} alt="gear"/></div>
                <div className="gear"><img src={gear} alt="gear"/></div>
              </div>
            </div>
            <div id="trapezoid"></div>
          </div>
          <div className="playback-controls">
            <div className="button" id="play">
              <div className="triangle-forward"></div>
            </div>
            <div className="button" id="pause">
              <div className="pause-rectangle"></div>
              <div className="pause-rectangle"></div>
            </div>
            <div className="button" id="skip-back">
              <div className="triangle-backward"></div><div className="triangle-backward"></div>
            </div>
            <div className="button" id="skip-forward">
              <div className="triangle-forward"></div><div className="triangle-forward"></div>
            </div>
          </div>
        </div>

        <div className="menu">
          <div className="menu-content">
            <div className="ion-home">
              <div className="label">Home</div>
            </div>
            <div className="ion-ios-recording">
              <div className="label">Collection</div>
            </div>
            <div className="ion-search">
              <div className="label">Search</div>
            </div>
            <div className="ion-checkmark">
              <div className="label">Recommendations</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  */
}

export default App;
