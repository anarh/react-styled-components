import React, { Component } from 'react';
import logo from '../../logo.svg';

class Header extends Component {
  render () {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    return <header className='header'>
      <div className={`container is-fluid`}>
        <a href={baseUrl}>
          <img src={logo} alt='logo text' className='logo' />
        </a>
      </div>
    </header>;
  }
}

Header.propTypes = {
};

export default Header;
