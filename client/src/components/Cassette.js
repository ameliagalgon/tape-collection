import React, { Component } from 'react';

class Cassette extends Component{
  constructor(){
    super();
    this.state = {
      title: '',
      albumArt: '',
      artist: '',
      albumID: ''
    }
  }

  componentWillMount(){
    this.props.title.then(title => {
      this.setState({title});
    });
  }
}

export default Cassette
