const _ = require('lodash');
const supertest = require('supertest');
const expect = require('unexpected');
const app = require('../../../app');

const agent = supertest(app);

const url = '/v1/properties';

describe('/v1/properties', () => {
  context('GET', () => {
    it('should return all properties', async () => {
      const response = await agent
        .get(url)
        .expect(200);

      const { properties } = response.body;
      expect(properties, 'to have an item satisfying', 'to be an object');
      const property = _.head(properties);
      expect(property, 'to have keys', ['owner',
        'address',
        'airbnbId',
        'numberOfBedrooms',
        'numberOfBathrooms',
        'incomeGenerated']);
      expect(property.address, 'to have keys', ['line1',
        'line4',
        'postCode',
        'city',
        'country']);
    });
  });
});
