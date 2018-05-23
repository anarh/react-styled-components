import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider, subscribe } from 'react-contextual';

import './index.css';
// import registerServiceWorker from './registerServiceWorker';

// Components
import header from './components/header';
import sideNavigation from './components/side-navigation';

// Pages
// import index from './pages/index';
// import login from './pages/login';
import createAccount from './pages/create-account';
// import settings from './pages/settings';

import { initialState, actions } from './state';

const Header = subscribe()(header);
const SideNavigation = subscribe()(sideNavigation);

// const Index = subscribe()(index);
// const Login = subscribe()(login);
// const Settings = subscribe()(settings);
const CreateAccount = subscribe()(createAccount);

// const ProtectedRoute = subscribe()(({
//   component: Component,
//   isAuthenticated,
//   ...rest
// }) => (
//   <Route
//     {...rest}
//     render={props =>
//       isAuthenticated
//         ? (<Component {...props} />)
//         : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
//   />
// ));

ReactDOM.render(
  <Provider initialState={initialState} actions={actions} >
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <SideNavigation />
        <main className='main-content'>
          <Route exact path='/' component={CreateAccount} />
        </main>
      </React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <Provider initialState={initialState} actions={actions} >
//     <BrowserRouter>
//       <React.Fragment>
//         <Header />
//         <SideNavigation />
//         <main className='main-content'>
//           <ProtectedRoute exact path='/' component={Index} />
//           <Route path='/login' component={Login} />
//           <Route path='/create-account' component={CreateAccount} />
//           <Route path='/settings' component={Settings} />
//         </main>
//       </React.Fragment>
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById('root')
// );

// registerServiceWorker();
