import _ from 'lodash';
import * as types from './actionTypes';

function url(path = '') {
  return `/v1/properties${path ? `/${path}` : ''}`;
}

export function receiveProperties(json) {
  return { type: types.RECEIVE_PROPERTIES, properties: json.properties };
}

export function receivePropertyHistory(json) {
  return { type: types.RECEIVE_PROPERTY_HISTORY, propertyHistory: json.propertyHistory };
}

export function propertyDeleted(id) {
  return { type: types.DELETE_PROPERTY_EXECUTED, id };
}

const extendWithAddressCell = properties => properties.map(property => ({
  ...property,
  ...{
    addressCell: _.compact([property.address.line1,
      property.address.line2,
      property.address.line3,
      property.address.line4])
  }
}));

export function fetchProperties() {
  return dispatch => fetch(url(), {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json'
    }
  })
    .then(response => response.json())
    .then(json => dispatch(receiveProperties({
      properties: extendWithAddressCell(json.properties)
    })));
}

export function fetchPropertyHistory(id) {
  return dispatch => fetch(url(`${id}/history`), {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json'
    }
  })
    .then(response => response.json())
    .then(json => dispatch(receivePropertyHistory({
      propertyHistory: extendWithAddressCell(json.propertyHistory)
    })));
}

export function deleteProperty(id) {
  return dispatch => fetch(url(`${id}`), {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      Accept: 'application/json'
    }
  })
    .then(() => dispatch(propertyDeleted(id)));
}
