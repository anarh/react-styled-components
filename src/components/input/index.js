import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      this.setState({
        focused: true
      });
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.checkValidity) {
      this.setValidity();
    }
  }

  handleFocus (e) {
    e.preventDefault();
    this.setState({
      focused: true
    });
  }

  handleBlur (e) {
    e.preventDefault();
    this.setValidity();
    this.props.onBlur(e);
  }

  handleChange (e) {
    e.preventDefault();

    this.setState({
      value: e.target.value,
      filled: !!e.target.value
    });

    if (!this.state.valid) {
      this.setValidity();
    }

    this.props.onChange(e);
  }

  setValidity () {
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

    return <div
      className={`${className}`}
      onChange={this.handleChange}
      onFocus={this.handleFocus}
      onBlur={this.handleBlur} >
      <label htmlFor={id}>{label}</label>
      <input
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
      {title &&
        <small
          className={`is-alert-message ${this.state.valid ? 'is-success' : 'is-error'}`}
          role='alert'
          aria-atomic='true'>
          {title}
        </small>
      }
    </div>;
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
