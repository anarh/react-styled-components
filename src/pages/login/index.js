import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// sub-pages
import Login from './login';
import CreatePassword from './create-password';
import ForgotPassword from './forgot-password';
import ForgotUsername from './forgot-username';
import SelectUsername from './select-username';
import SendPin from './send-pin';
import VerifyPin from './verify-pin';

class Index extends Component {
  render () {
    const { match } = this.props;

    return <div className='container'>
      <Route exact path={match.url} render={() => <Login {...this.props} />} />
      <Route exact path={`${match.url}/create-password`} render={() => <CreatePassword {...this.props} />} />
      <Route exact path={`${match.url}/forgot-password`} render={() => <ForgotPassword {...this.props} />} />
      <Route exact path={`${match.url}/forgot-username`} render={() => <ForgotUsername {...this.props} />} />
      <Route exact path={`${match.url}/select-username`} render={() => <SelectUsername {...this.props} />} />
      <Route exact path={`${match.url}/send-pin`} render={() => <SendPin {...this.props} />} />
      <Route exact path={`${match.url}/verify-pin`} render={() => <VerifyPin {...this.props} />} />
    </div>;
  }
}

export default Index;
