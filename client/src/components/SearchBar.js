import React, { Component } from 'react';

class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      query: '',
      returnItems: []
    }

    this.handleChange = this.handleChange.bind(this);
    //this.props.callback = this.props.callback.bind(this)
  }


  handleChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  componentDidUpdate(){
    console.log(this.state.query);
    //perform a query search
    //handleSearch(this.state.query);
    /*
    this.props.searchFunc.then(function(){
      console.log("hello");
    })
    */
  }

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
