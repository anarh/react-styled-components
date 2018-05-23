import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';
import Input from '../../../components/input';

class ForgotPassword extends Component {
  constructor (props) {
    super(props);

    this.state = {
      checkValidity: false,
      submitted: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit (e) {
    e.preventDefault();
    if (this.props.isAuthenticated) return this.setState({ redirectToReferrer: true });

    const username = e.target.elements.username.value.trim();
    const email = e.target.elements.email.value.trim();

    this.setState({
      checkValidity: true,
      submitted: true
    });

    await this.props.actions.forgotPassword({ username, email });
    this.setState({ submitted: false });

    if (this.props.loginRecovery.isError) return;

    this.props.history.push('/login/send-pin');
  }

  render () {
    const store = this.props;
    const t = store.locale;
    const checkValidity = this.state.checkValidity;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    return <section className='doc-content'>
      <div className={'hiq-well hiq-login-well'}>
        <h1 className='login-form-header'>{t['forgot-password']}</h1>
        <p className='is-login-form-message'>{t['retrieve-password-message']}</p>
        {
          this.props.loginRecovery.isError && (
            <p className={`is-form-error`} role='alert' aria-atomic='true'>
              Invalid username and/or email address
            </p>
          )
        }
        <form
          onSubmit={(e) => { this.handleSubmit(e); }}
          className={`${this.state.submitted ? 'form-submitted' : ''}`}
          method='POST'
          action='/'>
          <fieldset>
            <Input
              autoFocus
              checkValidity={checkValidity}
              className='input-container'
              id='username'
              label={t['username']}
              maxLength='40'
              name='username'
              required
              store={store}
              title={t['username-required']}
              type='text'
            />

            <Input
              checkValidity={checkValidity}
              className='input-container'
              id='email'
              label={t['email-address']}
              name='email'
              required
              store={store}
              title={t['email-address-required']}
              type='email'
            />

            <Button
              type='submit'
              className='is-full-width'
              label={t['continue']}
              store={store}
            />

            <ul className='hiq-account-links'>
              <li>
                <small><a href={`${baseUrl}/login`}>{t['return-to-login']}</a></small>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </section>;
  }
}

ForgotPassword.propTypes = {
  className: PropTypes.string
  // locale: PropTypes.object.isRequired,
  // config: PropTypes.object.isRequired
};

ForgotPassword.defaultProps = {
  className: ''
};

export default ForgotPassword;
