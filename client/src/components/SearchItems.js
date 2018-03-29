import React, { Component } from 'react';
import Cassette from './Cassette'

class SearchItems extends Component {

  componentDidMount(){
    console.log(this.props.albums);
  }

  render(){
    return(
      //TODO: refresh render function to only return current albums
      <div key={"collection"}>
        { this.props.albums.map(album => {
          //console.log(album.album);
            return(
              <Cassette key={album.id} id={album.id} title={album.name} artist={album.artists[0].name}
              albumArt={album.images[1].url}/>
            );
        })}
      </div>
    );
  }
}

export default SearchItems;
