import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import properties from './propertiesReducer';
import propertyHistory from './propertyHistoryReducer';

const rootReducer = combineReducers({
  form: formReducer,
  properties,
  propertyHistory,
});

export default rootReducer;
