import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import PropTypes from 'prop-types';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: var(--hiq-button-height, 2.25rem);
  margin: 0;
  padding: var(--hiq-button-vertical-padding, 0) var(--hiq-button-horizontal-padding, 1rem);
  border: var(--hiq-button-border-width, 1px) solid var(--hiq-button-border-color, var(--hiq-color-primary, hsl(210, 100%, 50%)));
  border-radius: var(--hiq-button-border-radius, 0.2rem);
  background-color: var(--hiq-button-background-color, var(--hiq-color-primary, hsl(210, 100%, 50%)));
  font-family: inherit;
  font-size: inherit;
  font-weight: var(--hiq-button-font-weight, var(--hiq-font-weight-medium, 500));
  line-height: inherit;
  text-decoration: none;
  color: var(--hiq-button-text-color, white);
  transition: border-color var(--hiq-speed, 0.1s) var(--hiq-easing, ease-out), color var(--hiq-speed, 0.1s) var(--hiq-easing, ease-out), background-color var(--hiq-speed, 0.1s) var(--hiq-easing, ease-out);
  cursor: pointer;

  &:hover {
    border-color: var(--hiq-button-hover-border-color, hsl(210, 100%, 40%));
    background-color: var(--hiq-button-hover-background-color, hsl(210, 100%, 40%));
    color: var(--hiq-button-hover-text-color, white);
  }

  &:focus,
  &:active {
    box-shadow: 0 0 0 var(--hiq-outline-width, 0.2rem) var(--hiq-outline-color, hsl(210, 100%, 85%));
  }

  &:focus {
    border-color: var(--hiq-button-focus-border-color, hsl(210, 100%, 50%));
    background-color: var(--hiq-button-focus-background-color, hsl(210, 100%, 50%));
    color: var(--hiq-button-focus-text-color, white);
  }

  &:active {
    border-color: var(--hiq-button-active-border-color, hsl(210, 100%, 30%));
    background-color: var(--hiq-button-active-background-color, hsl(210, 100%, 30%));
    color: var(--hiq-button-active-text-color, white);
  }

  &:visited {
    color: var(--hiq-button-text-color, white);
  }

  &:disabled,
  &[aria-disabled] {
    border-color: var(--hiq-disabled-border-color, transparent);
    background-color: var(--hiq-disabled-background-color, var(--hiq-gray-lightest, hsl(220, 10%, 95%)));
    color: var(--hiq-disabled-text-color, var(--hiq-gray-light, hsl(220, 10%, 60%)));
    cursor: not-allowed;
  }


  ${props => props.isFullWidth && css`
    margin-top: 1rem;
    width: 100%;
  `}
`;

class Button extends Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    this.props.onClick(e);
  }

  render () {
    return <StyledButton onClick={this.handleClick}
      isFullWidth={this.props.isFullWidth}
      disabled={this.props.disabled}
      type={this.props.type}
      className={this.props.className}
      aria-label={this.props.label}
      ref={(input) => { this.input = input; }}>
      <span>{this.props.label}</span>
    </StyledButton>;
  }
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  store: PropTypes.object,
  type: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  label: 'Submit',
  onClick: () => {},
  role: 'button',
  type: 'submit'
};

export default Button;
