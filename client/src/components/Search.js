import React, { Component } from 'react';

class Search extends Component{
  constructor(){
    super();
    this.state= {
      query: ''
    };
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  handleSearch(event){
    alert('Query: ' + this.state.query);
    event.preventDefault();
  }

  render(){
    return(
      <div className="Search">
        <h1>Search</h1>
        <form onSubmit={this.handleSearch} onChange={this.handChange}>
          <input type="search" name="query" placeholder="Search..." />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

export default Search
