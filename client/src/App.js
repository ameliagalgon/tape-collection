import React, { Component } from 'react';
//import gear from './images/gear.png';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js'
import { BrowserRouter as Router, Route } from 'react-router-dom'

//components
import Welcome from './components/Welcome'
import User from './components/User'
import Collection from './components/Collection'
import Menu from './components/Menu'

const spotifyApi = new SpotifyWebApi();

class App extends Component {

  constructor(){
    super();
    var params = this.getHashParams();
    var token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn : token ? true : false
    }
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

  getCurrentUser(){
    var user = spotifyApi.getMe().then(function(response){
      console.log(response);
      return response;
    }).catch(function(){
      console.log("Error");
    });
    console.log(user);
    if(user){
      console.log("in if statement");
      console.log(user.value);
    }
    return user;
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
    }, function(err) {
      console.log('Something went wrong!', err);
    });
    return savedAlbums;
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
