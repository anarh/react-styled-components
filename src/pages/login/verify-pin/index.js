import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';
import Input from '../../../components/input';

class VerifyPin extends Component {
  constructor (props) {
    super(props);

    this.state = {
      checkValidity: false,
      submitted: false
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleButtonClick (e) {
    this.setState({checkValidity: true});
  }

  async handleSubmit (e) {
    e.preventDefault();
    if (this.props.isAuthenticated) return this.setState({ redirectToReferrer: true });

    const pin = parseInt(e.target.elements.pin.value.trim(), 10);

    this.setState({
      checkValidity: true,
      submitted: true
    });

    await this.props.actions.verifyPin({ pin });

    if (this.props.loginRecovery.type === 'forgot-username') {
      await this.props.actions.getAccounts();
    }

    if (this.props.loginRecovery.isError) return;
    this.setState({ submitted: false });

    if (this.props.loginRecovery.type === 'forgot-username') {
      // await this.props.actions.getAccounts();
      return this.props.history.push('/login/select-username');
    }

    if (this.props.loginRecovery.type === 'forgot-password') {
      return this.props.history.push('/login/create-password');
    }
  }

  render () {
    const store = this.props;
    const t = store.locale;
    const checkValidity = this.state.checkValidity;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    return <section className='doc-content'>
      <div className={'hiq-well hiq-login-well'}>
        <h1>Verify PIN</h1>
        <p className={`is-login-form-message is-size-6`}>Also, check your junk mail folder</p>
        {
            this.props.loginRecovery.isError && (
              <p className='is-form-error' role='alert' aria-atomic='true'>
                Invalid PIN, try again
              </p>
            )
          }
        <form
          onSubmit={(e) => { this.handleSubmit(e); }}
          className={`${this.state.submitted ? 'form-submitted' : ''}`}
          method='POST'
          action='/'>
          <div className='row'>
            <Input
              autoFocus
              checkValidity={checkValidity}
              className='input-container'
              id='pin'
              label={t['enter-pin']}
              maxLength='40'
              name='pin'
              required
              store={store}
              title={t['pin-required']}
              type='number'
            />
          </div>

          <Button
            type='submit'
            onClick={this.handleButtonClick}
            className='is-full-width'
            label={t['verify-pin']}
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

VerifyPin.propTypes = {
  className: PropTypes.string
  // locale: PropTypes.object.isRequired,
  // config: PropTypes.object.isRequired
};

VerifyPin.defaultProps = {
  className: ''
};

export default VerifyPin;
