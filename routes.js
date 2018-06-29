const propertyController = require('./controllers/property');
const validators = require('./lib/validators');

const version = 'v1';

module.exports = (app) => {
  app.post(`/${version}/properties`, [validators.createPropertyValidators], propertyController.createProperty);

  app.get(`/${version}/properties`, [], propertyController.getProperties);

  app.patch(`/${version}/properties/:id`, [validators.patchPropertyValidators], propertyController.patchProperty);
  app.get(`/${version}/properties/:id`, [validators.pathIdValidator], propertyController.getProperty);
  app.delete(`/${version}/properties/:id`, [validators.pathIdValidator], propertyController.deleteProperty);
};
