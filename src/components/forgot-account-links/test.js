/* global describe, it */

import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import cheerio from 'cheerio';
import Adapter from 'enzyme-adapter-react-16';

import ForgotAccountLinks from './';
const shallow = Enzyme.shallow;

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ForgotAccountLinks />, div);
  ReactDOM.unmountComponentAtNode(div);
});
