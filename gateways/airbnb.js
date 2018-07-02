const _ = require('lodash');
const { RateLimiter } = require('limiter');
const request = require('axios');

const errors = require('../lib/errors');

const tokensPerInterval = 1;
const intervalMs = 250;
const limiter = new RateLimiter(tokensPerInterval, intervalMs);

const buildPropertyUrl = propertyAirbnbId => `https://www.airbnb.co.uk/rooms/${encodeURIComponent(propertyAirbnbId)}`;

const validateAirbnbId = async id => new Promise((resolve, reject) => {
  const limiterCallback = async (error) => {
    if (error) {
      return reject(new Error('Validating Airbnb ID is not available at this time, please try again'));
    }
    try {
      await request.get(buildPropertyUrl(id));
    } catch (error) {
      reject(error);
    }
    return resolve();
  };

  return limiter.removeTokens(1, limiterCallback);
})
  .catch((error) => {
    if (_.get(error, 'response.status') !== 200) {
      throw new errors.AirbnbValidationFailed();
    }
    throw error;
  });

module.exports = { validateAirbnbId };
