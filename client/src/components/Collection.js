import React, { Component } from 'react';
import Cassette from './Cassette'

class Collection extends Component{

  constructor(props){
    super(props);
    this.state = {
      //TODO: Need to store cassette objects in the albums array
      albums: []
    }
  }

  componentDidMount(){
    this.props.albums.then(albums => {
      this.setState({
        albums
      });
    })
  }

  render(){
    return (
      <div className="Collection">
        <h2>Tape Collection</h2>
        { this.state.albums.map(album => {
          //console.log(album.album);
          return(
            <Cassette id={album.album.id} title={album.album.name} artist={album.album.artists[0].name}
            albumArt={album.album.images[0].url}/>
          );
        })}
      </div>
    )
  }

}

export default Collection
