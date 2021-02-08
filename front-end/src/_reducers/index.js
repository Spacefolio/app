import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import {exchanges} from './exchange.reducer';

const rootReducer = combineReducers({
  exchanges,
  authentication,
  registration,
  alert
});

export default rootReducer;