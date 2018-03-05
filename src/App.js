import React, { Component } from 'react';
import gear from './images/gear.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div class="content">
        <div class="tape-player">
          <div class="tape-body">
            <div class="tape-content">
              <div class="tape-label">
                <div class="artist">Artist name</div>
                <div class="album">Album name</div>
              </div>
              <div class="tape-gears">
                <div class="gear"><img src={gear} /></div>
                <div class="gear"><img src={gear} /></div>
              </div>
            </div>
            <div id="trapezoid"></div>
          </div>
          <div class="playback-controls">
            <div class="button" id="play">
              <div class="triangle-forward"></div>
            </div>
            <div class="button" id="pause">
              <div class="pause-rectangle"></div>
              <div class="pause-rectangle"></div>
            </div>
            <div class="button" id="skip-back">
              <div class="triangle-backward"></div><div class="triangle-backward"></div>
            </div>
            <div class="button" id="skip-forward">
              <div class="triangle-forward"></div><div class="triangle-forward"></div>
            </div>
          </div>
        </div>

        <div class="menu">
          <div class="menu-content">
            <div class="ion-home">
              <div class="label">Home</div>
            </div>
            <div class="ion-ios-recording">
              <div class="label">Collection</div>
            </div>
            <div class="ion-search">
              <div class="label">Search</div>
            </div>
            <div class="ion-checkmark">
              <div class="label">Recommendations</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
