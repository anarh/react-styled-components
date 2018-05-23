import React, { Component } from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const Inpt = styled.input`
  display: block;
  box-shadow: none;
  outline: none;
  font-size: inherit;
  border: var(--hiq-input-border-width, 1px) solid var(--hiq-input-border-color, var(--hiq-gray-lighter, #e3e5e8));
  width: 100%;
  font-weight: var(--hiq-font-weight-base, 400);
  color: var(--hiq-input-text-color, var(--hiq-text-color, var(--hiq-gray-darker, #17191c)));
  background-color: var(--hiq-input-background-color, white);
  border-radius: var(--hiq-input-border-radius, var(--hiq-border-radius, 0.2rem));
  height: var(--hiq-input-height, 2.5rem);
  padding: var(--hiq-input-padding-vertical, 0) var(--hiq-input-padding-horizontal, 0.75rem);
`;

class Input extends Component {
  constructor (props) {
    super(props);

    this.state = {
      focused: false,
      filled: false,
      valid: true,
      value: props.defaultValue
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    if (this.props.defaultValue) {
      this.setState({focused: true});
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.checkValidity) {
      this.setValidity();
    }
  }

  handleFocus (e) {
    e.preventDefault();
    this.setState({focused: true});
  }

  handleBlur (e) {
    e.preventDefault();
    // if (e.target.value) {
    //   this.setState({focused: true});
    // } else {
    //   this.setState({focused: false});
    // }

    this.setValidity();
    this.props.onBlur(e);
  }

  handleChange (e) {
    e.preventDefault();

    this.setState({value: e.target.value});

    // if (e.target.value) {
    //   this.setState({filled: true});
    // } else {
    //   this.setState({filled: false});
    // }

    if (!this.state.valid) {
      this.setValidity();
    }

    this.props.onChange(e);
  }

  setValidity () {
    const input = this.input;

    // input.oninvalid = function (e) {
    //   e.preventDefault();
    //   // console.log('hide default browser tooltip');
    // };

    // if (this.state.focused &&
    //     (!input.checkValidity() ||
    //       (input.required && !input.value.trim().length)
    //     )
    //   ) {
    //   this.setState({valid: false});
    //   input.setAttribute('aria-invalid', true);
    //   return;
    // }

    // this.setState({valid: true});
    // input.setAttribute('aria-invalid', false);
  }

  render () {
    let {
      autoCapitalize,
      autoComplete,
      autoCorrect,
      autoFocus,
      className,
      disabled,
      id,
      label,
      max,
      maxLength,
      min,
      minLength,
      name,
      pattern,
      placeholder,
      readOnly,
      required,
      step,
      title,
      type,
      value,
      defaultValue
    } = this.props;

    let errorTitle = null;

    if (title) {
      errorTitle = <small className={`is-alert-message ${this.state.valid ? 'is-success' : 'is-error'}`} role='alert' aria-atomic='true'>{title}</small>;
    }

    return <div
      className={`${className}`}
      onChange={this.handleChange}
      onFocus={this.handleFocus}
      onBlur={this.handleBlur} >
      <label htmlFor={id}>{label}</label>
      <Inpt
        aria-required={required}
        className={this.state.valid ? 'is-success' : 'is-error'}
        type={type}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        name={name}
        disabled={disabled}
        min={min}
        max={max}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        step={step}
        value={value}
        id={id}
        ref={(input) => { this.input = input; }}
      />
      {errorTitle}
    </div>;
  }
}

Input.propTypes = {
  store: PropTypes.object,
  autoCapitalize: PropTypes.string,
  autoComplete: PropTypes.string,
  autoCorrect: PropTypes.string,
  autoFocus: PropTypes.bool,
  checkValidity: PropTypes.bool,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  max: PropTypes.string,
  maxLength: PropTypes.string,
  min: PropTypes.string,
  minLength: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  step: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string
};

Input.defaultProps = {
  autoCapitalize: 'none',
  autoComplete: '',
  autoCorrect: null,
  autoFocus: false,
  checkValidity: false,
  className: '',
  defaultValue: '',
  disabled: false,
  id: null,
  label: 'Input',
  max: null,
  maxLength: null,
  min: null,
  minLength: null,
  name: null,
  onChange: () => {},
  onBlur: () => {},
  pattern: null,
  placeholder: null,
  readOnly: false,
  required: false,
  step: null,
  title: null,
  type: 'text'
};

export default Input;
