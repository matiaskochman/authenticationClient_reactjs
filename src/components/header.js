import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component{

  renderLinks(){
    let links = [];
    links.push(
      <li key="signout" className="nav-item">
        <Link to={`/`} className="nav-link">Redux Auth</Link>
      </li>
    )
    if(this.props.authenticated){
      links.push(
        <li key="signin" className="nav-item">
          <Link to={`/signout`} className="nav-link">Sign Out</Link>
        </li>
      );

      return links;
    }else{

      links.push(
        <li key="signin" className="nav-item">
          <Link to={`/signin`} className="nav-link">SignIn</Link>
        </li>);
        links.push(
          <li key="signup" className="nav-item">
            <Link to={`/signUp`} className="nav-link">SignUp</Link>
          </li>
        );

      return links;

    }
  }

  render(){
    return(
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
