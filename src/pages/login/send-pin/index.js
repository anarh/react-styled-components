import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';

class SendPin extends Component {
  constructor (props) {
    super(props);

    this.state = {
      submitted: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit (e) {
    e.preventDefault();
    if (this.props.isAuthenticated) return this.setState({ redirectToReferrer: true });

    this.setState({
      checkValidity: true,
      submitted: true
    });

    await this.props.actions.sendPin();
    this.setState({ submitted: false });

    if (this.props.loginRecovery.isError) return;
    this.props.history.push('/login/verify-pin');
  }

  render () {
    const store = this.props;
    const t = this.props.locale;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    return <section className='doc-content'>
      <div className={'hiq-well hiq-login-well'}>
        <h1>Send PIN</h1>
        <form onSubmit={this.handleSubmit} className={`${this.state.submitted ? 'form-submitted' : ''}`} method='POST' action='/'>
          <p className='is-login-form-message'>{t['pin-sent-to']} <strong>{store.loginRecovery.maskedEmail}</strong></p>
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

SendPin.propTypes = {
  className: PropTypes.string,
  // locale: PropTypes.object.isRequired,
  // config: PropTypes.object.isRequired
};

SendPin.defaultProps = {
  className: ''
};

export default SendPin;
