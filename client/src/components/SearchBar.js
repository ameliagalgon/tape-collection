import React, { Component } from 'react';

class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      query: '',
      returnItems: []
    }

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  componentDidUpdate(){
    console.log(this.state.query);
    //perform a query search

  }

  render(){
    return(
      <div className="SearchBar">
        <h1>Search</h1>
        <form onChange={this.handleChange}>
          <input type="text" name="query" placeholder="Search..." />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

export default SearchBar
