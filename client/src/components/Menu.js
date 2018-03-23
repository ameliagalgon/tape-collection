import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Menu extends Component{

  render(){
    return(
        <div className="Menu">
          <Link to="/">Home</Link>
          <Link to="/collection">Collection</Link>
          <Link to="/search">Search</Link>
          <Link to="/recommendations">Recommendations</Link>
        </div>
    );
  }
}

export default Menu
