const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const _ = require('lodash');
const config = require('../config');

const modelsFolder = `${__dirname}/models`;
const db = {};

const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password,
  {
    host: config.mysql.host,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });

fs
  .readdirSync(modelsFolder)
  .filter(file => (file.indexOf('.') !== 0))
  .forEach((file) => {
    const model = sequelize.import(path.join(modelsFolder, file));
    db[model.name] = model;
  });

Object.keys(db)
  .forEach((modelName) => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });

module.exports = _.extend({
  sequelize,
  Sequelize
}, db);
