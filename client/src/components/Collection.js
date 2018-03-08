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
        //TODO: FIX ERROR: Cannot read property 'album' of undefined
        <Cassette title={ this.state.albums[0].album.name} />
      </div>
    )
  }

}

export default Collection
