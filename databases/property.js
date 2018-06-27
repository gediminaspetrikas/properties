const uuid = require('node-uuid');
const _ = require('lodash');
const db = require('../databases');

const properties = [
  {
    id: uuid.v4(),
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
  },
  {
    id: uuid.v4(),
    owner: 'ankur',
    address: {
      line1: '4',
      line2: 'Tower Mansions',
      line3: 'Off Station road',
      line4: '86-87 Grange Road',
      postCode: 'SE1 3BW',
      city: 'London',
      country: 'U.K.'
    },
    airbnbId: 1334159,
    numberOfBedrooms: 3,
    numberOfBathrooms: 1,
    incomeGenerated: 10000
  },
  {
    id: uuid.v4(),
    owner: 'elaine',
    address: {
      line1: '4',
      line2: '332b',
      line4: 'Goswell Road',
      postCode: 'EC1V 7LQ',
      city: 'London',
      country: 'U.K.'
    },
    airbnbId: 12220057,
    numberOfBedrooms: 2,
    numberOfBathrooms: 2,
    incomeGenerated: 1200
  }
];

const getAll = () => Promise.resolve(properties);

const getProperty = id => Promise.resolve(properties.find(property => property.id === id));

const patchProperty = (id, data) => {
  _
    .chain(properties)
    .find({ id })
    .assignIn({ ...data })
    .value();
  return Promise.resolve();
};

const propertyModelToDb = property => ({
  id: property.id || uuid.v4(),
  owner: property.owner,
  airbnbId: property.airbnbId,
  numberOfBedrooms: property.numberOfBedrooms,
  numberOfBathrooms: property.numberOfBathrooms,
  incomeGenerated: property.incomeGenerated,
  line1: property.address.line1,
  line2: property.address.line2,
  line3: property.address.line3,
  line4: property.address.line4,
  postCode: property.address.postCode,
  city: property.address.city,
  country: property.address.country,
});

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

const createProperty = async (data) => {
  const dbPropertyData = propertyModelToDb(data);
  const savedDbProperty = await db.property.create(dbPropertyData);
  return propertyDbToModel(savedDbProperty);
};

module.exports = {
  getAll,
  getProperty,
  patchProperty,
  createProperty,
};
