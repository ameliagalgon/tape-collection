import React, { Component } from 'react';

class Cassette extends Component{
  constructor(){
    super();
    this.state = {

    }
  }


  render(){
    return(
      <div className="Cassette">
        <img src={this.props.albumArt} alt={this.props.title}/>
        <h1>{this.props.title}</h1>
        <h3>{this.props.artist}</h3>
      </div>
    );
  }
}

export default Cassette
