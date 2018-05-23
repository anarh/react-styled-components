import React, { Component, Fragment } from 'react';

class SideNavigation extends Component {
  render () {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    return this.props.isAuthenticated && <Fragment>
      <button className='mobile-toc-toggle' id='mobile-toc-toggle'>
        <span>+</span>
      </button>
      <nav className='toc'>
        <div className='toc-wrapper'>
          <ul className='page-nav'>
            <li className={`toc-entry toc-h1`}>
              <a href={baseUrl}>Home</a>
            </li>
            <li className={`toc-entry toc-h1`}>
              <a href='/hiq/guide/theming/'>Virtual Terminal</a>
            </li>
            <li className={`toc-entry toc-h1`}>
              <a href='/hiq/guide/theming/'>Orders</a>
            </li>
            <li className={`toc-entry toc-h1`}>
              <a href='/hiq/guide/layout/'>Products</a>
            </li>
            <li className={`toc-entry toc-h1`}>
              <a href='/hiq/guide/layout/'>Customers</a>
            </li>
            <li className={`toc-entry toc-h1`}>
              <a href='/hiq/guide/layout/'>Reports</a>
            </li>
            <li className={`toc-entry toc-h1`}>
              <a href='/hiq/guide/layout/'>Tools</a>
            </li>
            <li className={`toc-entry toc-h1`}>
              <a href='/hiq/guide/layout/'>Billing</a>
            </li>
            <li className='toc-entry toc-h1 active'>
              <a href={`${baseUrl}/settings`}>Settings</a>
              <ul className='section-nav'>
                <li className={`toc-entry toc-h2`}>
                  <a href={`${baseUrl}/settings/merchant`}>Merchant</a>
                </li>
                <li className={`toc-entry toc-h2`}>
                  <a href={`${baseUrl}/settings/users`}>Users</a>
                  <ul>
                    <li className={`toc-entry toc-h3`}>
                      <a href='#adding-font-families'>Add User</a>
                    </li>
                  </ul>
                </li>
                <li className={`toc-entry toc-h2`}>
                  <a href={`${baseUrl}/settings/themes`}>Themes</a>
                </li>
                <li className={`toc-entry toc-h2`}>
                  <a href={`${baseUrl}/settings/profile`}>Profile</a>
                </li>
              </ul>
            </li>
            <li className={`toc-entry toc-h1`}>
              <a href='/hiq/guide/meters-progress/'>Sign Out</a>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>;
  }
}

SideNavigation.propTypes = {
};

export default SideNavigation;
