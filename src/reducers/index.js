import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { calling } from './call.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  calling,
});

export default rootReducer;