import _ from 'lodash';
import { SubmissionError } from 'redux-form';

function url(path = '') {
  return `/v1/properties${path ? `/${path}` : ''}`;
}

const throwError = (errors) => {
  // handle business/runtime related errors
  if (_.head(errors).message) {
    throw new SubmissionError({ _error: _.head(errors).message });
  }

  // handle field validation errors
  const fieldErrors = _.reduce(errors, (acc, value) => {
    _.set(acc, value.param, value.msg);
    return acc;
  }, {});
  throw new SubmissionError(fieldErrors);
};

export default async function createProperty(data) {
  const response = await fetch(url(), {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  });
  const responseJson = await response.json();

  if (responseJson.errors) {
    throwError(responseJson.errors);
  }
  return responseJson;
}
