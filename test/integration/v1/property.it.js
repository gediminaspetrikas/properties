const _ = require('lodash');
const supertest = require('supertest');
const expect = require('unexpected');
const app = require('../../../app');

const agent = supertest(app);

const checkRequiredPropertyKeys = (property) => {
  expect(property, 'to have keys', [
    'id',
    'owner',
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
};

describe('/v1', () => {
  describe('/properties', () => {
    context('GET', () => {
      it('should return all properties', async () => {
        const body = await agent
          .get('/v1/properties')
          .expect(200)
          .then(response => response.body);

        const { properties } = body;
        expect(properties, 'to have an item satisfying', 'to be an object');
        const property = _.head(properties);
        checkRequiredPropertyKeys(property);
      });
    });
  });

  describe('/property/:id', () => {
    context('GET', () => {
      it('should return a single property details', async () => {
        const allPropertiesBody = await agent
          .get('/v1/properties')
          .expect(200)
          .then(response => response.body);

        const property = _.head(allPropertiesBody.properties);
        const propertyBody = await agent
          .get(`/v1/property/${property.id}`)
          .expect(200)
          .then(response => response.body);

        checkRequiredPropertyKeys(propertyBody);
      });
    });
  });
});
