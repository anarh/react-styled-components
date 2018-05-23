import React, { Component } from 'react';
import styled from 'styled-components';

import logo from '../../logo.svg';

const Headr = styled.header`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  font-size: 16px;
  font-weight: 400;
  height: 60px;
  letter-spacing: normal;
  line-height: 24px;
  margin-left: 0;
  margin-right: 0;
  text-align: left;
  background-color: rgb(30, 35, 126);
`;

class Header extends Component {
  render () {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    return <Headr>
      <div>
        <a href={baseUrl}>
          <img src={logo} alt='logo text' />
        </a>
      </div>
    </Headr>;
  }
}

Header.propTypes = {
};

export default Header;
