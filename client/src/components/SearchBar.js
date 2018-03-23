import React, { Component } from 'react';

var throttle = require('throttle-debounce/throttle');

var debounce = require('throttle-debounce/debounce');


class SearchBar extends Component{
  constructor(props){
    super(props);
    /*
    this.state = {
      query: '',
      returnItems: []
    }
    */
    this.handleChange = this.handleChange.bind(this);
    this.throttleChange = throttle(2000, false, this.handleChange);
  }

  handleChange(event) {
    /*
    this.setState({
      query: event.target.value
    });
    */
    this.props.searchFunc(this.refs.query.value);
    console.log(this.refs.query.value)
    //throttle(2000, () => { this.props.searchFunc(this.state.query) })();
  }

  render(){
    return(
      <div className="SearchBar">
        <h1>Search</h1>
        <form onChange={this.throttleChange}>
          <input ref="query" type="text" name="query" placeholder="Search..." />
        </form>
      </div>
    );
  }
}

export default SearchBar
