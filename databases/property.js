const uuid = require('node-uuid');
const _ = require('lodash');
const db = require('../databases');


const propertyModelToDb = property => _({
  id: property.id || uuid.v4(),
  owner: property.owner,
  airbnbId: property.airbnbId,
  numberOfBedrooms: property.numberOfBedrooms,
  numberOfBathrooms: property.numberOfBathrooms,
  incomeGenerated: property.incomeGenerated,
  line1: _.get(property, 'address.line1'),
  line2: _.get(property, 'address.line2'),
  line3: _.get(property, 'address.line3'),
  line4: _.get(property, 'address.line4'),
  postCode: _.get(property, 'address.postCode'),
  city: _.get(property, 'address.city'),
  country: _.get(property, 'address.country'),
})
  .omitBy(_.isNil)
  .value();

const propertyDbToModel = dbProperty => ({
  id: dbProperty.id,
  owner: dbProperty.owner,
  address: {
    line1: dbProperty.line1,
    line2: dbProperty.line2,
    line3: dbProperty.line3,
    line4: dbProperty.line4,
    postCode: dbProperty.postCode,
    city: dbProperty.city,
    country: dbProperty.country,
  },
  airbnbId: dbProperty.airbnbId,
  numberOfBedrooms: dbProperty.numberOfBedrooms,
  numberOfBathrooms: dbProperty.numberOfBathrooms,
  incomeGenerated: dbProperty.incomeGenerated,
});

const getAll = async () => {
  const dbProperties = await db.property.findAll();
  return dbProperties.map(propertyDbToModel);
};

const getProperty = async (id) => {
  const dbProperty = await db.property.findOne({ where: { id } });
  if (!dbProperty) {
    return null;
  }
  return propertyDbToModel(dbProperty);
};

const patchProperty = (id, data) => db.property.update(data, { where: { id } });

const createProperty = async (data) => {
  const dbPropertyData = propertyModelToDb(data);
  const savedDbProperty = await db.property.create(dbPropertyData);
  return propertyDbToModel(savedDbProperty);
};

const deleteProperty = id => db.property.destroy({ where: { id } });

module.exports = {
  getAll,
  getProperty,
  patchProperty,
  createProperty,
  deleteProperty,
};
