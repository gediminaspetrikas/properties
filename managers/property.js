const propertyDatabase = require('../databases/property');
const airbnbGateway = require('../gateways/airbnb');

const createProperty = async (propertyData) => {
  await airbnbGateway.validateAirbnbId(propertyData.airbnbId);
  await propertyDatabase.createProperty(propertyData);
};

const patchProperty = async (propertyId, propertyData) => {
  const savedProperty = await propertyDatabase.getProperty(propertyId);
  if (!savedProperty) {
    return null;
  }
  if (propertyData.airbnbId) {
    await airbnbGateway.validateAirbnbId(propertyData.airbnbId);
  }
  const newProperty = { ...savedProperty, ...propertyData };
  return propertyDatabase.patchProperty(propertyId, newProperty);
};

module.exports = { createProperty, patchProperty };
