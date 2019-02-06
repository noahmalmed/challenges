import { combineReducers } from 'redux';

import user from './auth';
import patient from './patient';
import patients from './patients';
import doctors from './doctor';
import files from './file';

const rootReducer = combineReducers({
  user,
  patient,
  patients,
  doctors,
  files,
});

export default rootReducer;
