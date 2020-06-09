import { combineReducers } from 'redux';
import alerts from './alert';
import auth from './auth';
import cutting from './cutting';

const rootReducer = combineReducers({
  alerts,
  auth,
  urlsObj: cutting,
});

export default rootReducer;
