import initialState from './initialState';
import {
  RECEIVE_PROPERTIES,
  FETCH_PROPERTIES,
  DELETE_PROPERTY_EXECUTED
} from '../actions/actionTypes';

export default function stuff(state = initialState.properties, action) {
  let newState;
  switch (action.type) {
    case FETCH_PROPERTIES:
      return action;
    case RECEIVE_PROPERTIES:
      newState = action.properties;
      return newState;
    case DELETE_PROPERTY_EXECUTED:
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
}
