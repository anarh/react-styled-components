import React, { Component } from 'react';

class Settings extends Component {
  render () {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    return <div className='main-content-wrapper'>
      <section className='doc-content'>
        <h1>Settings</h1>

        <div className='hiq-example'>
          <p className='is-size-4'><a href={`${baseUrl}/settings/merchant`}><s>Merchant Settings</s></a></p>
        </div>
        <div className='highlight'>
          <pre>
            Update Merchant Name, Description, etc.
          </pre>
        </div>

        <div className='hiq-example'>
          <p className='is-size-4'><a href={`${baseUrl}/settings/user`}><s>User Settings</s></a></p>
        </div>
        <div className='highlight'>
          <pre>
            Add, Delete, or Edit Users
          </pre>
        </div>

        <div className='hiq-example'>
          <p className='is-size-4'><a href={`${baseUrl}/settings/themes`}>Theme Settings</a></p>
        </div>
        <div className='highlight'>
          <pre>
            Add, Delete, or Edit Themes
          </pre>
        </div>

        <div className='hiq-example'>
          <p className='is-size-4'><a href={`${baseUrl}/settings/profile`}><s>Profile Settings</s></a></p>
        </div>
        <div className='highlight'>
          <pre>
            Add, Delete, or Edit your profile
          </pre>
        </div>
      </section>
    </div>;
  }
}

Settings.propTypes = {
  // store: PropTypes.object.isRequired
};

Settings.defaultProps = {

};

export default Settings;
