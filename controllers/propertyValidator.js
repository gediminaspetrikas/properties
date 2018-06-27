const validationErrors = {
  InvalidNumberOfBedrooms: {
    errorType: 'InvalidNumberOfBedrooms',
    message: 'numberOfBedrooms cannot be negative',
  },
  InvalidNumberOfBathrooms: {
    errorType: 'InvalidNumberOfBathrooms',
    message: 'numberOfBathrooms cannot be negative',
  },
  InvalidIncomeGenerated: {
    errorType: 'InvalidIncomeGenerated',
    message: 'incomeGenerated cannot be negative',
  },
};

const validatePatchPropertyData = (property) => {
  const errors = [];
  if (property.numberOfBedrooms && property.numberOfBedrooms < 0) {
    errors.push(validationErrors.InvalidNumberOfBedrooms);
  }
  if (property.numberOfBathrooms && property.numberOfBathrooms < 0) {
    errors.push(validationErrors.InvalidNumberOfBathrooms);
  }
  if (property.incomeGenerated && property.incomeGenerated < 0) {
    errors.push(validationErrors.InvalidIncomeGenerated);
  }
  return errors;
};

module.exports = { validatePatchPropertyData, validationErrors };
