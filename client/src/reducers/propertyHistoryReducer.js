import initialState from './initialState';
import { FETCH_PROPERTY_HISTORY, RECEIVE_PROPERTY_HISTORY } from '../actions/actionTypes';

export default function stuff(state = initialState.propertyHistory, action) {
  let newState;
  switch (action.type) {
    case FETCH_PROPERTY_HISTORY:
      return action;
    case RECEIVE_PROPERTY_HISTORY:
      newState = action.propertyHistory;
      return newState;
    default:
      return state;
  }
}
