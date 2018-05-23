import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ButtonLink extends Component {
  render () {
    return <Link to={`${this.props.href}`}
      className={this.props.className}
      aria-label={this.props.label}>
      <span>{this.props.label}</span>
    </Link>;
  }
}

ButtonLink.propTypes = {
  store: PropTypes.object.isRequired,
  label: PropTypes.string,
  href: PropTypes.string
};

ButtonLink.defaultProps = {
  label: 'Button Link',
  href: ''
};

export default ButtonLink;
