/* global it */

import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider, subscribe } from 'react-contextual';

import page from './';
import { initialState, actions } from '../../state';

const Page = subscribe()(page);

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider initialState={initialState} actions={actions} >
      <Page />
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
