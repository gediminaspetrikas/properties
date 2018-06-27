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
    res
      .status(property ? 200 : 404)
      .json(property);
  } catch (e) {
    next(e);
  }
};

const patchProperty = async (req, res, next) => {
  try {
    const property = await propertyDatabase.patchProperty(req.params.id, req.body);
    res
      .status(204)
      .json(property);
  } catch (e) {
    next(e);
  }
};

const createProperty = async (req, res, next) => {
  try {
    const property = await propertyDatabase.createProperty(req.body);
    res
      .status(200)
      .json(property);
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
