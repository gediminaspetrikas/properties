const propertyDatabase = require('../databases/property');

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
    const property = await propertyDatabase.getProperty(req.params.id);
    res.json(property);
  } catch (e) {
    next(e);
  }
};


const createProperty = async (req, res, next) => {};
const deleteProperty = async (req, res, next) => {};
const patchProperty = async (req, res, next) => {};


module.exports = {
  getProperties,
  getProperty,
  createProperty,
  deleteProperty,
  patchProperty,
};
