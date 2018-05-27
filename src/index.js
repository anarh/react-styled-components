import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider, subscribe } from 'react-contextual';
import styled, { css } from 'styled-components';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Components
import header from './components/header';

// Pages
import index from './pages/index';
import thankYou from './pages/thank-you';

import { initialState, actions } from './state';

const Header = subscribe()(header);
const Index = subscribe()(index);
const ThankYou = subscribe()(thankYou);

const MainContent = styled.main`
  display: flex;
  margin-top: var(--navbar-height);
  overflow-x: hidden;
`;

ReactDOM.render(
  <Provider initialState={initialState} actions={actions} >
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <MainContent>
          <Route exact path='/' component={Index} />
          <Route exact path='/thank-you' component={ThankYou} />
        </MainContent>
      </React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
