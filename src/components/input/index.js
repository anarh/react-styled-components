import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledInputContainer = styled.div`
  padding-bottom: 1.3em;

  > input {
    background-color: var(--hiq-input-background-color, white);
    border-radius: var(--hiq-input-border-radius, var(--hiq-border-radius, 0.2rem));
    border: var(--hiq-input-border-width, 1px) solid var(--hiq-input-border-color, var(--hiq-gray-lighter, hsl(220, 10%, 90%)));
    color: var(--hiq-input-text-color, var(--hiq-text-color, var(--hiq-gray-darker, hsl(220, 10%, 10%))));
    display: block;
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--hiq-font-weight-base, 400);
    height: var(--hiq-input-height, 2.5rem);
    line-height: inherit;
    margin: 0;
    padding: var(--hiq-input-padding-vertical, 0) var(--hiq-input-padding-horizontal, 0.75rem);
    transition: border-color var(--hiq-speed, 0.1s) var(--hiq-easing, ease-out), color var(--hiq-speed, 0.1s) var(--hiq-easing, ease-out), background-color var(--hiq-speed, 0.1s) var(--hiq-easing, ease-out);
    width: 100%;
    

    &[type='search'] {
      outline-offset: -2px;
      -webkit-appearance: none;
    }

    &::placeholder {
      color: var(--hiq-input-placeholder-color, var(--hiq-gray, hsl(220, 10%, 40%)));
    }

    &:hover {
      border-color: var(--hiq-input-hover-border-color, var(--hiq-input-border-color, var(--hiq-gray-lighter, hsl(220, 10%, 90%))));
      background-color: var(--hiq-input-hover-background-color, var(--hiq-input-background-color, white));
      color: var(--hiq-input-hover-text-color, var(--hiq-input-text-color, var(--hiq-text-color, var(--hiq-gray-darker, hsl(220, 10%, 10%)))));
      
      &::placeholder {
        color: var(--hiq-input-hover-placeholder-color, var(--hiq-input-placeholder-color, var(--hiq-gray, hsl(220, 10%, 40%))));
      }
    }

    &:focus {
      background-color: var(--hiq-input-focus-background-color, var(--hiq-input-background-color, white));
      border-color: var(--hiq-input-focus-border-color, var(--hiq-color-primary, hsl(210, 100%, 50%)));
      box-shadow: 0 0 0 var(--hiq-outline-width, 0.2rem) var(--hiq-outline-color, hsl(210, 100%, 85%));
      color: var(--hiq-input-focus-text-color, var(--hiq-input-text-color, var(--hiq-text-color, var(--hiq-gray-darker, hsl(220, 10%, 10%)))));
      
      &::placeholder {
        color: var(--hiq-input-focus-placeholder-color, var(--hiq-input-placeholder-color, var(--hiq-gray, hsl(220, 10%, 40%))));
      }
    }

    &:disabled,
    &[aria-disabled],
    &[readonly] {
      border-color: var(--hiq-disabled-border-color, var(--hiq-gray-lighter, hsl(220, 10%, 90%)));
      background-color: var(--hiq-disabled-background-color, var(--hiq-gray-lightest, hsl(220, 10%, 95%)));
      color: var(--hiq-disabled-text-color, var(--hiq-gray-light, hsl(220, 10%, 60%)));
      
      &::placeholder {
        color: var(--hiq-disabled-text-color, var(--hiq-gray-light, hsl(220, 10%, 60%)));
      }
    }

    &:disabled {
      cursor: not-allowed;
    }
/*
    &:required:invalid:not(:focus) {
      border-color: var(--hiq-input-invalid-border-color, var(--hiq-color-danger, hsl(352, 95%, 61%)));
    }
*/
    &:required:invalid {
      border: var(--hiq-input-border-width,1px) solid var(--hiq-input-border-color,var(--hiq-gray-lighter,#e3e5e8));
    }

    &:required:valid:not(:focus) {
      border-color: var(--hiq-input-valid-border-color, var(--hiq-color-success, hsl(158, 73%, 48%)));
    }

    ${props => props.isValid && css`
      border-color: var(--hiq-color-success);
    `}
  }
`;

const StyledLabel = styled.label`
  display: block;
  font-weight: var(--hiq-label-font-weight,var(--hiq-font-weight-medium,500));
  margin: 0 0 var(--hiq-label-margin-bottom,.25rem);
  padding: 0;
`;

const StyledError = styled.small`
  display: none;

  ${props => !props.isValid && css`
    color: var(--hiq-color-danger);
    display: block;
    position: absolute;
  `}
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

  componentDidMount = () => {
    if (this.props.defaultValue) {
      this.setState({
        focused: true
      });
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.checkValidity) {
      this.setValidity();
    }
  };

  handleFocus = (e) => {
    e.preventDefault();
    this.setState({
      focused: true
    });
  };

  handleBlur = (e) => {
    e.preventDefault();
    this.setValidity(e.target);
    this.props.onBlur(e);
  };

  handleChange = (e) => {
    e.preventDefault();

    this.setState({
      value: e.target.value,
      filled: !!e.target.value
    });

    if (!this.state.valid) {
      this.setValidity(e.target);
    }

    this.props.onChange(e);
  };

  setValidity = () => {
    const input = this.input;

    if (this.state.focused &&
        (!input.checkValidity() ||
          (input.required && !input.value.trim().length)
        )
      ) {
      this.setState({valid: false});
      input.setAttribute('aria-invalid', true);
      return;
    }

    this.setState({valid: true});
    input.setAttribute('aria-invalid', false);
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

    return <StyledInputContainer
      onChange={this.handleChange}
      onFocus={this.handleFocus}
      onBlur={this.handleBlur} 
      isValid={this.state.valid}>
      <StyledLabel htmlFor={id}>
        {label}
      </StyledLabel>
      <input
        aria-required={required}
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
      {title &&
        <StyledError
          role='alert'
          aria-atomic='true'
          isValid={this.state.valid}>
          {title}
        </StyledError>
      }
    </StyledInputContainer>;
  }
}

Input.propTypes = {
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
