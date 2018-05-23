import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../components/button';
import Input from '../../components/input';
import ForgotAccountLinks from '../../components/forgot-account-links';

class Login extends Component {
  constructor (props) {
    super(props);

    this.state = {
      checkValidity: false,
      invalidUsernamePassword: false,
      submitted: false,
      redirectToReferrer: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit (e) {
    e.preventDefault();

    const username = e.target.elements.username.value.trim();
    const password = e.target.elements.password.value.trim();

    this.setState({
      checkValidity: true,
      submitted: true
    });

    await this.props.actions.authenticate({ username, password }, window.location.pathname);

    if (window.location.pathname !== this.props.match.path) return;
    if (this.props.isAuthenticated) return this.setState({ redirectToReferrer: true });

    this.setState({
      invalidUsernamePassword: true,
      submitted: false
    });
  }

  render () {
    const { locale, loginRecovery } = this.props;
    const { selectedUsername, isPasswordReset } = loginRecovery;
    const { redirectToReferrer, checkValidity } = this.state;
    const store = this.props;
    const t = locale;

    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return <section className='doc-content'>
      <div className={'hiq-well hiq-login-well'}>
        <h1>Sign In</h1>
        <form
          onSubmit={(e) => { this.handleSubmit(e); }}
          className={`${this.state.submitted ? 'form-submitted' : ''}`}
          method='POST'
          action='/'>
          <fieldset>
            {
              selectedUsername && (
                <h2 className='is-login-form-info' role='alert' aria-atomic='true'>
                  {t['username-is']} <strong>{selectedUsername}</strong>
                </h2>
              )
            }
            {
              isPasswordReset && (
                <h2 className='is-login-form-info' role='alert' aria-atomic='true'>
                  {t['new-password-saved']}
                </h2>
              )
            }
            {
              this.state.invalidUsernamePassword && (
                <p className={`is-form-error`} role='alert' aria-atomic='true'>
                  {t['invalid-username-or-password']}
                </p>
              )
            }

            <Input
              autoCapitalize='none'
              autoCorrect='off'
              autoFocus
              checkValidity={checkValidity}
              className='input-container'
              id='username'
              label={t['username']}
              maxLength='25'
              name='username'
              required
              store={store}
              title='required'
              type='text'
              defaultValue={selectedUsername}
            />

            <Input
              autoCapitalize='none'
              autoCorrect='off'
              checkValidity={checkValidity}
              className='input-container'
              id='password'
              label={t['password']}
              maxLength='25'
              name='password'
              required
              store={store}
              title='required'
              type='password'
            />
            <Button
              type='submit'
              className='is-full-width'
              label={t['login']}
              store={store}
            />
          </fieldset>
        </form>
        <ForgotAccountLinks />
      </div>
    </section>;
  }
}

Login.propTypes = {
  className: PropTypes.string,
  // locale: PropTypes.object.isRequired,
  // config: PropTypes.object.isRequired
};

Login.defaultProps = {
  className: ''
};

export default Login;
