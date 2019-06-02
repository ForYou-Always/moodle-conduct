import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './components/form/loginForm';

import { Router, Route, hashHistory, IndexRedirect } from 'react-router'
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer'

const store = createStore(rootReducer, applyMiddleware (thunk))

ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={LoginPage} />
      </Router>
    </Provider>, document.getElementById('asset-main'))
