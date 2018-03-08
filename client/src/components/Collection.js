import React, { Component } from 'react';

class Collection extends Component{

  constructor(props){
    super(props);
    this.state = {
      albums: ['Hello']
    }
  }

  render(){
    return (
      <div className="Collection">
        <p>{ this.state.albums }</p>
      </div>
    )
  }

}

export default Collection
