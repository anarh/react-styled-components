import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';

class SelectUsername extends Component {
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

    const selectedUsername = e.target.elements.username.value.trim() || '';

    this.setState({
      checkValidity: true,
      submitted: true
    });

    await this.props.actions.setSelectedUsername(selectedUsername);
    this.setState({ submitted: false });

    if (this.props.loginRecovery.isError) return;
    this.props.history.push('/login');
  }

  render () {
    const store = this.props;
    const t = store.locale;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    return <section className='doc-content'>
      <div className={'hiq-well hiq-login-well'}>
        <h1>{t['select-username']}</h1>
        <form id='selectUsername' onSubmit={this.handleSubmit} className={`${this.state.submitted ? 'form-submitted' : ''}`} method='POST' action='/'>
          <p className='is-login-form-message'>
            {t['select-username-message']}
          </p>

          <ul className='is-unstyled'>
            {store.loginRecovery.userAccounts.map((user, i) => {
              return <li key={i}>
                <div class="radio">
                  <input name='username' type='radio' required value={user.username} id={`user${i}`} />
                  <label htmlFor={`user${i}`}><span>{user.username}</span></label>
                </div>
              </li>;
            })}
          </ul>

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
    </section>
  }
}

SelectUsername.propTypes = {
  className: PropTypes.string
  // config: PropTypes.object.isRequired,
  // locale: PropTypes.object.isRequired
};

SelectUsername.defaultProps = {
  className: ''
};

export default SelectUsername;
