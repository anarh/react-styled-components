import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    this.props.onClick(e);
  }

  render () {
    return <button onClick={this.handleClick}
      disabled={this.props.disabled}
      type={this.props.type}
      className={this.props.className}
      aria-label={this.props.label}
      ref={(input) => { this.input = input; }}>
      <span>{this.props.label}</span>
    </button>;
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
