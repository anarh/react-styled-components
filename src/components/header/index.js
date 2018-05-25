import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import logo from '../../logo.svg';

const StyledHeader = styled.header`
  box-sizing: border-box;
  background-color: var(--hiq-color-primary);
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  align-items: center;
  width: 100%;
  height: var(--navbar-height);
  padding: 0 var(--hiq-container-horizontal-gap);
`;

const Logo = styled.img`
  height: var(--logo-height);
  margin-bottom: 0;
  vertical-align: middle;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  height: 100%;
  ${props => props.isFluid && css`
    max-width: none;
  `}
`;

const Link = styled.a`
  transision: color var(--hiq-speed, 0.1s) var(--hiq-easing, ease-out);
`;

class Header extends Component {
  render () {
    return <StyledHeader>
      <Container isFluid='true'>
        <Link href={process.env.REACT_APP_BASE_URL}>
          <Logo src={logo} alt='V' />
        </Link>
      </Container>
    </StyledHeader>;
  }
}

Header.propTypes = {
};

export default Header;
