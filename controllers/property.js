const propertyDatabase = require('../databases/property');

const getProperties = async (req, res, next) => {
  try {
    const properties = await propertyDatabase.getAll();
    res.json({ properties });
  } catch (e) {
    next(e);
  }
};

module.exports = { getProperties };
