const uuid = require('node-uuid');

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

module.exports = { getAll, getProperty };
