import React, { Component } from 'react';
import Cassette from './Cassette'

class RelatedArtist extends Component {

  getArtistAlbums(id){
    console.log(id)
    
  }

  render(){
    return(
      //TODO: refresh render function to only return current albums
      <div>
        <h1>Albums by { this.props.artist.name }</h1>
        { this.getArtistAlbums(this.props.artist) }
      </div>
    );
  }
}

export default RelatedArtist;
