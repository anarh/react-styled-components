import React, { Component } from 'react';

class Footer extends Component {
  render () {
    return <footer className='footer'>
      <div className={`container is-fluid`}>
        <span>Copyright 2018</span>
      </div>
    </footer>;
  }
}

Footer.propTypes = {
};

export default Footer;