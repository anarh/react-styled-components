import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';
import Input from '../../../components/input';
import validatePassword from './validate-password';

class CreatePassword extends Component {
  constructor (props) {
    super(props);

    this.state = {
      checkValidity: false,
      submitted: false,
      password: {
        containsUsername: false,
        containsUsernameReverse: false,
        hasEightChars: false,
        hasOneLetter: false,
        hasOneNumber: false,
        hasSpecialChars: false,
        repeatingChars: false,
        sameAsLastFive: false
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange (e) {
    this.setValidity();
  }

  setValidity () {
    const passwordElement = this.passwordInput.input;
    const password = passwordElement.value.trim();
    const repeatPasswordElement = this.repeatPasswordInput.input;
    const repeatPassword = repeatPasswordElement.value.trim();
    const t = this.props.locale;
    const {isValid, validatedFields} = validatePassword(password);

    this.setState((prevState) => ({
      password: Object.assign({}, prevState.password, validatedFields)
    }));

    if (isValid) {
      passwordElement.setCustomValidity('');
      passwordElement.setAttribute('aria-invalid', false);
    } else {
      passwordElement.setCustomValidity(t['password-format-invalid']);
      passwordElement.setAttribute('aria-invalid', true);
    }

    if (repeatPassword && repeatPassword !== password) {
      repeatPasswordElement.setCustomValidity(t['passwords-must-match']);
      repeatPasswordElement.setAttribute('aria-invalid', true);
    } else {
      repeatPasswordElement.setCustomValidity('');
      repeatPasswordElement.setAttribute('aria-invalid', false);
    }
  }

  async handleSubmit (e) {
    e.preventDefault();
    if (this.props.isAuthenticated) return this.setState({ redirectToReferrer: true });

    const password = e.target.elements.password.value.trim();

    this.setState({
      checkValidity: true,
      submitted: true
    });

    await this.props.actions.createPassword({ password });
    this.setState({ submitted: false });

    if (this.props.loginRecovery.isError) return;

    this.props.history.push('/login');
  }

  render () {
    const successBulletCss = 'success-bullet';
    const errorBulletCss = 'error-bullet';
    const store = this.props;
    const t = store.locale;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const checkValidity = this.state.checkValidity;
    const {
      containsUsername,
      containsUsernameReverse,
      hasEightChars,
      hasOneLetter,
      hasOneNumber,
      hasSpecialChars,
      repeatingChars,
      sameAsLastFive
    } = this.state.password;

    return <section className='doc-content'>
      <div className={'hiq-well hiq-login-well'}>
        <h1 className='login-form-header'>{t['create-new-password']}</h1>
        <form id='createPasswordForm' onSubmit={this.handleSubmit} className={`login-form card card-1 ${this.state.submitted ? 'form-submitted' : ''}`} method='POST' action='/'>
          <Input
            autoFocus
            checkValidity={checkValidity}
            className='input-container'
            id='createPassword'
            label={t['new-password']}
            name='password'
            onChange={this.handleInputChange}
            ref={(input) => { this.passwordInput = input; }}
            required
            store={store}
            type='password'
          />

          <ul className='custom-bullet is-size-6'>
            <li className={`${containsUsername ? errorBulletCss : 'is-hidden-element'}`}>
              {t['no-username-in-password']}
            </li>
            <li className={`${containsUsernameReverse ? errorBulletCss : 'is-hidden-element'}`}>
              {t['no-reverse-username']}
            </li>
            <li className={`${repeatingChars ? errorBulletCss : 'is-hidden-element'}`}>
              {t['no-repeating-characters']}
            </li>
            <li className={`${sameAsLastFive ? errorBulletCss : 'is-hidden-element'}`}>
              {t['different-to-previous-password']}
            </li>
            <li className={`${hasOneLetter ? successBulletCss : ''}`}>
              {t['at-least-one-letter']}
            </li>
            <li className={`${hasOneNumber ? successBulletCss : ''}`}>
              {t['at-least-one-number']}
            </li>
            <li className={`${hasEightChars ? successBulletCss : ''}`}>
              {t['at-least-eight-characters']}
            </li>
            <li className={`${hasSpecialChars ? successBulletCss : ''}`}>
              {t['at-least-one-special-character']}
            </li>
          </ul>

          <Input
            checkValidity={checkValidity}
            className='input-container'
            id='repeatPassword'
            label={t['confirm-password']}
            name='confirm-password'
            onChange={this.handleInputChange}
            ref={(input) => { this.repeatPasswordInput = input; }}
            required
            store={store}
            title={t['passwords-must-match']}
            type='password'
          />

        <Button
          type='submit'
          className='is-full-width'
          label={t['change-password']}
          store={store}
        />
        <ul className='hiq-account-links'>
          <li>
            <small><a href={`${baseUrl}/login`}>{t['return-to-login']}</a></small>
          </li>
        </ul>
      </form>
    </div>
  </section>;
  }
}

CreatePassword.propTypes = {
  locale: PropTypes.object
};

export default CreatePassword;
