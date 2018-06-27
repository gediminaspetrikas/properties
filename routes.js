const propertyController = require('./controllers/property');

const version = 'v1';

module.exports = (app) => {
  app.route(`/${version}/properties`)
    .get(propertyController.getProperties)
    .post(propertyController.createProperty);

  app.route(`/${version}/properties/:id`)
    .get(propertyController.getProperty)
    .patch(propertyController.patchProperty)
    .delete(propertyController.deleteProperty);
};
