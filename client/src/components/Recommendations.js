import React, { Component } from 'react';
import Cassette from './Cassette'

class Recommendations extends Component{
  constructor(){
    super();
    this.state = {
      albums: []
    }
  }

  componentDidMount(){
    this.props.albums.then(albums => {
      this.setState({
        albums
      });
    }).catch(error => {
      console.log(error);
    })
  }

  render(){
    return(
      <div className="Recommendations">
        <h2>Recommendations</h2>

        { this.state.albums.map(album => {
          //console.log(album.album);
          return(
            <Cassette key={album.id} id={album.id} title={album.name} artist={album.artists[0].name}
            albumArt={album.images[1].url}/>
          );
        })}
      </div>
    )
  }
}

export default Recommendations;
