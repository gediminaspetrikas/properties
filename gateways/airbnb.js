const _ = require('lodash');
const { RateLimiter } = require('limiter');
const request = require('axios');

const errors = require('../lib/errors');

const tokensPerInterval = 1;
const intervalMs = 250;
const limiter = new RateLimiter(tokensPerInterval, intervalMs);

const buildPropertyUrl = propertyAirbnbId => `https://www.airbnb.co.uk/rooms/${encodeURIComponent(propertyAirbnbId)}`;

const validateAirbnbId = async id => new Promise((resolve, reject) => limiter.removeTokens(1,
  async (error) => {
    if (error) {
      return reject(new Error('Validating Airbnb ID is not available at this time, please try again'));
    }
    try {
      await request.get(buildPropertyUrl(id));
    } catch (error) {
      reject(error);
    }
    return resolve(true);
  }))
  .catch((error) => {
    if (_.get(error, 'response.status') !== 200) {
      throw new errors.AirbnbValidationFailed();
    }
    console.log('air bnb error');
    throw error;
  });

module.exports = { validateAirbnbId };
