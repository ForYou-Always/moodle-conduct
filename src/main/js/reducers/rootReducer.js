import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import userReducer from './assets/userReducer';

export default combineReducers({
  routing: routerReducer,
  userInfo: userReducer,
});
