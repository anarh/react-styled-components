import React, { Component, Fragment } from 'react';

class Header extends Component {
  render () {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    return <Fragment>
      <ul className='hiq-account-links'>
        <li>
          <small><a href={`${baseUrl}/login/forgot-username`}>Forgot Username</a></small>
        </li>
        <li>
          <small><a href={`${baseUrl}/login/forgot-password`}>Forgot Password</a></small>
        </li>
      </ul>
      <ul className='hiq-account-links'>
        <li>
          <small><a href={`${baseUrl}/create-account`}>Create Account</a></small>
        </li>
      </ul>
    </Fragment>;
  }
}

Header.propTypes = {
};

export default Header;