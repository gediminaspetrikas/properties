const propertyController = require('./controllers/property');

const version = 'v1';

module.exports = (app) => {
  app.route(`/${version}/properties`)
    .get(propertyController.getProperties);
};
