import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ThankYou extends Component {
  render () {
    return <div className='container'>
      <section className='doc-content'>
        <div className={`hiq-well hiq-create-account-well`}>
          <h1 className='login-form-header'>Thank You</h1>
        </div>
      </section>
    </div>;
  }
}

ThankYou.propTypes = {
  className: PropTypes.string
};

ThankYou.defaultProps = {
  className: ''
};

export default ThankYou;
