import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider, subscribe } from 'react-contextual';

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

ReactDOM.render(
  <Provider initialState={initialState} actions={actions} >
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <main className='main-content'>
          <Route exact path='/' component={Index} />
          <Route exact path='/thank-you' component={ThankYou} />
        </main>
      </React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
