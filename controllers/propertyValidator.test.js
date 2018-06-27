const expect = require('unexpected');

const propertyValidator = require('./propertyValidator');

const { validationErrors } = propertyValidator;

describe('propertyValidator', () => {
  context('validatePatchPropertyData', () => {
    it('should validate patch data and return no errors', () => {
      const patchData = { owner: 'Simply The Best' };
      const errors = propertyValidator.validatePatchPropertyData(patchData);
      expect(errors, 'to have length', 0);
    });
    context('Failing input validation', () => {
      const validationCases = [
        {
          description: 'returns an error when numberOfBedrooms is negative',
          data: { numberOfBedrooms: -10 },
          error: validationErrors.InvalidNumberOfBedrooms,
        },
        {
          description: 'returns an error when numberOfBathrooms is negative',
          data: { numberOfBathrooms: -10 },
          error: validationErrors.InvalidNumberOfBathrooms,
        },
        {
          description: 'returns an error when incomeGenerated is negative',
          data: { incomeGenerated: -10 },
          error: validationErrors.InvalidIncomeGenerated,
        }
      ];

      validationCases.forEach(testCase => it(testCase.description, () => {
        const errors = propertyValidator.validatePatchPropertyData(testCase.data);
        expect(errors, 'to have an item satisfying', testCase.error);
      }));
    });
  });
});
