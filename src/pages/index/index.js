import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../../components/button';
import Input from '../../components/input';

const StyledContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: calc(var(--hiq-max-container-width,50rem) - (var(--hiq-container-horizontal-gap,2rem) * 2));
  width: calc(100% - (var(--hiq-container-horizontal-gap,2rem) * 2));

  h1 {
    font-size: var(--hiq-font-size-1,2.5rem);
    font-weight: 600;
  }

  h2 {
    font-weight: 300;
  }
`;

const StyledSection = styled.section`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-top: 2rem;
  max-width: 100%;
  order: 1;
  padding-bottom: 3rem;

  @media (min-width: 800px) {
    flex: 1 1;
    margin-top: 6rem;

    h2 {
      /* margin-top: calc((var(--navbar-height) + 3rem) * -1 + 4rem); */
      padding-top: calc(var(--navbar-height) + 3rem);
    }
  }
`;

const StyledWell = styled.div`
  border: 1px solid var(--hiq-gray-lighter);
  border-radius: .25rem .25rem;
  margin-top: 1.25rem;
  padding: 2rem;
`;

const StyledFormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  > div {
    flex-basis: 0;
    flex-grow: 1;
    padding-left: 1rem;
    padding-right: 1rem;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }
`;

class Index extends Component {
  constructor (props) {
    super(props);

    this.state = {
      checkValidity: false,
      submitted: false,
      accountCreated: false,
      usernameAlreadyExists: false,
      emailAlreadyExists: false
    };

    this.errorMessages = {
      required: 'required',
      userExists: 'Username already exists',
      emailExists: 'Email address already exists'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit (e) {
    e.preventDefault();
    const elements = e.target.elements;
    const firstname = elements.firstname.value.trim();
    const lastname = elements.lastname.value.trim();
    const phone = elements.phone.value.trim();
    const email = elements.email.value.trim();
    const password = elements.password.value.trim();
    const merchantName = elements.merchantName.value.trim();
    const merchantDescription = elements.merchantDescription.value.trim();
    const username = elements.username.value.trim();

    this.setState({
      checkValidity: true,
      submitted: true
    });

    await this.props.actions.createAccount({
      firstname, lastname, phone, email, password, merchantName, merchantDescription, username
    });

    this.setState({ submitted: false });

    if (this.props.createAccount.isError) {
      return this.setState({
        accountCreated: false
      });
    }

    this.props.history.push('/thank-you');
  }

  async handleUsernameCheck (e) {
    e.preventDefault();
    const input = e.target;
    const username = e.target.value.trim();

    if (!username) return;

    await this.props.actions.checkForExistingUsername({ username });

    if (this.props.createAccount.usernameAlreadyExists) {
      input.setCustomValidity(this.errorMessages.userExists);
      return this.setState({
        usernameAlreadyExists: this.props.createAccount.usernameAlreadyExists,
        checkValidity: true
      });
    }

    input.setCustomValidity('');
    return this.setState({
      usernameAlreadyExists: false,
      checkValidity: true
    });
  }

  async handleEmailCheck (e) {
    e.preventDefault();
    const input = e.target;
    const email = e.target.value.trim();

    if (!email) return;

    await this.props.actions.checkForExistingEmail({ email });

    if (this.props.createAccount.emailAlreadyExists) {
      input.setCustomValidity(this.errorMessages.emailExists);
      return this.setState({
        emailAlreadyExists: this.props.createAccount.emailAlreadyExists,
        checkValidity: true
      });
    }

    input.setCustomValidity('');
    return this.setState({
      emailAlreadyExists: false,
      checkValidity: true
    });
  }

  render () {
    return <StyledContainer>
      <StyledSection>
        <StyledWell>
          <h1>Create Account</h1>
          <p>Create a merchant account with the following information</p>
          {
            this.props.createAccount.isError && (
              <p className={`is-form-error`} role='alert' aria-atomic='true'>
                An error occurred while creating account.
              </p>
            )
          }

          <form
            onSubmit={(e) => { this.handleSubmit(e); }}
            className={`${this.state.submitted ? 'form-submitted' : ''}`}
            method='POST'
            action='/'>
            <h2>Merchant</h2>
            <StyledFormGroup>
              <Input
                autoFocus
                autoComplete='business-name'
                checkValidity={this.state.checkValidity}
                className='input-container'
                id='merchantName'
                label='Merchant Name'
                name='merchantName'
                required
                title='required'
                type='text'
              />

              <Input
                autoComplete='business-description'
                checkValidity={this.state.checkValidity}
                className='input-container'
                id='merchantDescription'
                label='Merchant Description'
                name='merchantDescription'
                title='required'
                type='text'
              />
            </StyledFormGroup>
            <h2>Admin Account</h2>
            <StyledFormGroup>
              <Input
                autoComplete='Username'
                checkValidity={this.state.checkValidity}
                className='input-container'
                id='username'
                label='Username'
                name='username'
                onBlur={(e) => { this.handleUsernameCheck(e); }}
                required
                title={this.state.usernameAlreadyExists ? this.errorMessages.userExists : this.errorMessages.required}
                type='text'
              />

              <Input
                autoComplete='password'
                checkValidity={this.state.checkValidity}
                className='input-container'
                id='password'
                label='Password'
                name='password'
                required
                title='required'
                type='password'
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <Input
                autoComplete='given-name'
                checkValidity={this.state.checkValidity}
                className='input-container'
                id='firstname'
                label='First Name'
                maxLength='40'
                name='firstname'
                required
                title='required'
                type='text'
              />

              <Input
                autoComplete='family-name'
                checkValidity={this.state.checkValidity}
                className='input-container'
                id='lastname'
                label='Last Name'
                maxLength='40'
                name='lastname'
                required
                title='required'
                type='text'
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <Input
                autoComplete='email'
                checkValidity={this.state.checkValidity}
                className='input-container'
                id='email'
                label='Email Address'
                name='email'
                onBlur={(e) => { this.handleEmailCheck(e); }}
                required
                title={this.state.emailAlreadyExists ? this.errorMessages.emailExists : this.errorMessages.required}
                type='email'
              />

              <Input
                autoComplete='tel-national'
                checkValidity={this.state.checkValidity}
                className='input-container'
                id='phone'
                label='Phone Number'
                name='phone'
                required
                title='required'
                type='tel'
              />
            </StyledFormGroup>
            <Button
              isFullWidth
              type='submit'
              label='Create Account'
            />
          </form>
        </StyledWell>
      </StyledSection>
    </StyledContainer>;
  }
}

Index.propTypes = {
  className: PropTypes.string
};

Index.defaultProps = {
  className: ''
};

export default Index;
