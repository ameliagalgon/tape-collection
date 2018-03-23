import React, { Component } from 'react';

var throttle = require('throttle-debounce/throttle');

//var debounce = require('throttle-debounce/debounce');


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
    //this.props.searchFunc(this.state.query);
  }


  componentDidUpdate(){

    /*
    throttle(300, function(){
      console.log(this.state.query);
      this.props.searchFunc(this.state.query);
    })();
    */
    throttle(1000, () => { this.props.searchFunc(this.state.query) })();
    //this.props.searchFunc(this.state.query);
  }

  //throttle = handleChange.throttle(300);

  render(){
    return(
      <div className="SearchBar">
        <h1>Search</h1>
        <form onChange={this.handleChange}>
          <input type="text" name="query" placeholder="Search..." />
        </form>
      </div>
    );
  }
}

export default SearchBar
