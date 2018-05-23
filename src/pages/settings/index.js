import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// sub-pages
import Settings from './settings';
import Merchant from './merchant';
import Profile from './profile';
import Themes from './themes';
import ThemesEdit from './themes/edit';
import Users from './users';

class Index extends Component {
  render () {
    const { match } = this.props;

    return <div className='container'>
      <Route exact path={match.url} render={() => <Settings {...this.props} />} />
      <Route exact path={`${match.url}/merchant`} render={() => <Merchant {...this.props} />} />
      <Route exact path={`${match.url}/profile`} render={() => <Profile {...this.props} />} />
      <Route exact path={`${match.url}/themes`} render={() => <Themes {...this.props} />} />
      <Route exact path={`${match.url}/themes/edit`} render={() => <ThemesEdit {...this.props} />} />
      <Route exact path={`${match.url}/users`} render={() => <Users {...this.props} />} />
    </div>;
  }
}

export default Index;
