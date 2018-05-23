import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';
import Input from '../../../components/input';

class ForgotUsername extends Component {
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

    const firstname = e.target.elements.firstname.value.trim();
    const lastname = e.target.elements.lastname.value.trim();
    const email = e.target.elements.email.value.trim();

    this.setState({
      checkValidity: true,
      submitted: true
    });

    await this.props.actions.forgotUsername({ firstname, lastname, email });
    this.setState({ submitted: false });

    if (this.props.loginRecovery.isError) return;
    this.props.history.push('/login/send-pin');
  }

  render () {
    const store = this.props;
    const t = this.props.locale;
    const checkValidity = this.state.checkValidity;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    return <section className='doc-content'>
      <div className={'hiq-well hiq-login-well'}>
        <h1 className='login-form-header'>{t['forgot-username']}</h1>
        <form id='forgotUsername' onSubmit={(e) => { this.handleSubmit(e); }} className={`login-form card card-1 ${this.state.submitted ? 'form-submitted' : ''}`} method='POST' action='/'>
          <p className='is-login-form-message'>{t['retrieve-username-message']}</p>
          {
            this.props.loginRecovery.isError && (
              <p className={`is-form-error`} role='alert' aria-atomic='true'>
                Invalid name and/or email address
              </p>
            )
          }
          <div className='row'>
            <input type='hidden' name='AccountType' value='M' />
            <Input
              autoFocus
              checkValidity={checkValidity}
              className='input-container'
              id='firstname'
              label={t['firstname']}
              maxLength='40'
              name='firstname'
              required
              store={store}
              title={t['firstname-required']}
              type='text'
            />
            <Input
              checkValidity={checkValidity}
              className='input-container'
              id='lastname'
              label={t['lastname']}
              maxLength='40'
              name='lastname'
              required
              store={store}
              title={t['lastname-required']}
              type='text'
            />
          </div>

          <div className='row'>
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
          </div>

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
        </form>
      </div>
    </section>;
  }
}

ForgotUsername.propTypes = {
  className: PropTypes.string,
  // locale: PropTypes.object.isRequired,
  // config: PropTypes.object.isRequired
};

ForgotUsername.defaultProps = {
  className: ''
};

export default ForgotUsername;
