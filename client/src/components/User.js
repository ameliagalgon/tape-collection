import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {},
      profile_url: ''
    }
  }

  componentDidMount(){
    this.props.user.then(currentUser => {
      this.setState({
        currentUser,
        profile_url: currentUser.images[0].url
      });
    })
  }

  render(){
    return(
      <div className="User">
        <div>
          <img src={this.state.profile_url} alt={this.state.currentUser.display_name}/>
        </div>
        <h4>Welcome, {this.state.currentUser.display_name} </h4>
      </div>
    )
  }
}

export default User;
