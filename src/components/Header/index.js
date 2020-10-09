import React, { Component } from 'react';
import logo from './../../img/logo-actual-star-wars.png';
import './styles.css';

class Header extends Component {
  render() {
    return (
      <div id="header-primary">
        <img src={logo} className="img-responsive" alt="logo Star Wars" />
      </div>
    )
  }
}

export default Header;