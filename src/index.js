import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import ReduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import SignUp from './components/auth/signUp';
import Welcome from './components/welcome';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_authentication';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, we consider the user to be signed in
if(token){
  // We need to update the application state
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome}/>
        <Route path="signin" component={SignIn} />
        <Route path="signout" component={SignOut} />
        <Route path="signUp" component={SignUp} />
        <Route path="feature" component={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
