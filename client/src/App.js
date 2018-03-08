import React, { Component } from 'react';
import gear from './images/gear.png';
import './App.css';
import Request from 'superagent';

import SpotifyWebApi from 'spotify-web-api-js'
//import User from './components/User';

const spotifyApi = new SpotifyWebApi();

class App extends Component {

  constructor(){
    super();
    const params = this.getHashParams();
    console.log(params);
    const token = params.access_token;
    if(token){
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: ''}
    }
  }

  getHashParams(){
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

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        })
      })
  }

  render() {
    return (
      <div className='App'>
        { !this.state.loggedIn &&
          <div className="welcome">
            <h4>Welcome to</h4>
            <h1 className="title">Tape Collection</h1>
            <p>Your virtual cassette collection</p>
            <div className="signin">
              <a href="http://localhost:8888">Login to Spotify</a>
            </div>
          </div>
        }
        { this.state.loggedIn &&
          <div className="App-content">
            <div>
              Now Playing: { this.state.nowPlaying.name }
            </div>
            <div>
              <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
            </div>
            <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button>
          </div>
        }
      </div>
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
