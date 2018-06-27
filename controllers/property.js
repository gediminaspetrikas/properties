const _ = require('lodash');

const propertyDatabase = require('../databases/property');
const propertyValidator = require('./propertyValidator');

const propertyToModel = property => _({
  owner: _.get(property, 'owner') ? property.owner.trim() : null,
  address: _.get(property, 'address') ? {
    line1: _.get(property, 'address.line1'),
    line2: _.get(property, 'address.line2'),
    line3: _.get(property, 'address.line3'),
    line4: _.get(property, 'address.line4'),
    postCode: _.get(property, 'address.postCode'),
    city: _.get(property, 'address.city'),
    country: _.get(property, 'address.country'),
  } : null,
  airbnbId: _.get(property, 'airbnbId'),
  numberOfBedrooms: _.get(property, 'numberOfBedrooms').toNumber(),
  numberOfBathrooms: _.get(property, 'numberOfBathrooms').toNumber(),
  incomeGenerated: _.get(property, 'incomeGenerated'),
})
  .omitBy(_.isNil)
  .value();

const getProperties = async (req, res, next) => {
  try {
    const properties = await propertyDatabase.getAll();
    res.json({ properties });
  } catch (e) {
    next(e);
  }
};

const getProperty = async (req, res, next) => {
  try {
    const propertyResponse = await propertyDatabase.getProperty(req.params.id);
    res
      .status(propertyResponse ? 200 : 404)
      .json(propertyResponse);
  } catch (e) {
    next(e);
  }
};

const patchProperty = async (req, res, next) => {
  try {
    const propertyId = req.params.id;
    const propertyData = propertyToModel(req.body);
    const errors = propertyValidator.validatePatchPropertyData(propertyData);
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ errors });
    }
    const savedProperty = await propertyDatabase.getProperty(propertyId);
    if (!savedProperty) {
      return res
        .sendStatus(404);
    }
    const newProperty = { ...savedProperty, ...propertyData };
    const propertyResponse = await propertyDatabase.patchProperty(req.params.id, newProperty);
    return res
      .status(204)
      .json(propertyResponse);
  } catch (e) {
    next(e);
  }
};

const createProperty = async (req, res, next) => {
  try {
    const property = propertyToModel(req.body);
    const propertyResponse = await propertyDatabase.createProperty(property);
    res
      .status(200)
      .json(propertyResponse);
  } catch (e) {
    next(e);
  }
};

const deleteProperty = async (req, res, next) => {
  try {
    const property = await propertyDatabase.deleteProperty(req.params.id);
    res
      .status(204)
      .json(property);
  } catch (e) {
    next(e);
  }
};


module.exports = {
  getProperties,
  getProperty,
  createProperty,
  deleteProperty,
  patchProperty,
};
