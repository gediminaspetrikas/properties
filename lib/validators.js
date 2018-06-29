const _ = require('lodash');

const { check, body } = require('express-validator/check');

const patchPropertyValidators = [
  body('owner')
    .trim()
    .escape(),
  body('address.line1')
    .trim()
    .escape(),
  body('address.line2')
    .trim()
    .escape(),
  body('address.line3')
    .trim()
    .escape(),
  body('address.line4')
    .trim()
    .escape(),
  body('address.postCode')
    .trim()
    .escape(),
  body('address.city')
    .trim()
    .escape(),
  body('address.country')
    .trim()
    .escape(),
  body('numberOfBedrooms')
    .optional()
    .custom(value => _.isNumber(value)),
  body('numberOfBathrooms')
    .optional()
    .custom(value => _.isNumber(value)),
  body('airbnbId')
    .trim(),
  body('incomeGenerated')
    .optional()
    .custom(value => _.isNumber(value))
];
const createPropertyValidators = [
  body('owner')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  body('address.line1')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  body('address.line2')
    .trim()
    .escape(),
  body('address.line3')
    .trim()
    .escape(),
  body('address.line4')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  body('address.postCode')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  body('address.city')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  body('address.country')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  body('numberOfBedrooms')
    .exists()
    .custom(value => _.isNumber(value)),
  body('numberOfBathrooms')
    .exists()
    .custom(value => _.isNumber(value)),
  body('airbnbId')
    .exists(),
  body('incomeGenerated')
    .exists()
    .custom(value => _.isNumber(value))
];

const pathIdValidator = [
  check('id')
    .isUUID(4)
];

module.exports = { patchPropertyValidators, createPropertyValidators, pathIdValidator };
