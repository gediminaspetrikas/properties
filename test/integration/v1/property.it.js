const _ = require('lodash');
const uuid = require('node-uuid');
const supertest = require('supertest');
const expect = require('unexpected');
const app = require('../../../app');

const agent = supertest(app);

const propertyData = {
  owner: 'carlos',
  address: {
    line1: 'Flat 5',
    line4: '7 Westbourne Terrace',
    postCode: 'W2 3UL',
    city: 'London',
    country: 'U.K.'
  },
  airbnbId: 3512500,
  numberOfBedrooms: 1,
  numberOfBathrooms: 1,
  incomeGenerated: 2000.34
};

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
    context('POST', () => {
      it('should create a property', async () => {
        const propertyCreateData = await agent
          .post('/v1/properties')
          .send(propertyData)
          .expect(200)
          .then(response => response.body);

        expect(propertyCreateData, 'to have key', 'id');
        expect(_.omit(propertyCreateData, 'id'), 'to equal', propertyData);
      });
    });
  });
  describe('/properties/:id', () => {
    context('GET', () => {
      it('should return a single property details', async () => {
        const allPropertiesBody = await agent
          .get('/v1/properties')
          .expect(200)
          .then(response => response.body);

        const property = _.head(allPropertiesBody.properties);
        const propertyBody = await agent
          .get(`/v1/properties/${property.id}`)
          .expect(200)
          .then(response => response.body);
        checkRequiredPropertyKeys(propertyBody);
      });
    });
    context('PATCH', () => {
      it('should patch a property', async () => {
        const allPropertiesBody = await agent
          .get('/v1/properties')
          .expect(200)
          .then(response => response.body);

        const property = _.head(allPropertiesBody.properties);
        const uniqueness = uuid.v4();
        const patchData = { owner: `Integration Test ${uniqueness}` };
        await agent
          .patch(`/v1/properties/${property.id}`)
          .send(patchData)
          .expect(204);

        const propertyBody = await agent
          .get(`/v1/properties/${property.id}`)
          .expect(200)
          .then(response => response.body);

        expect(propertyBody.owner, 'to be', patchData.owner);
      });
    });
    context('DELETE', () => {
      it('should delete a property', async () => {
        const propertyId = await agent
          .post('/v1/properties')
          .send(propertyData)
          .expect(200)
          .then(response => response.body)
          .then(body => body.id);
        await agent
          .delete(`/v1/properties/${propertyId}`)
          .expect(204);
        await agent
          .get(`/v1/properties/${propertyId}`)
          .expect(404);
      });
    });
  });
});
