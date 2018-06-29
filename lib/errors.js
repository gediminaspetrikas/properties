module.exports = {
  AirbnbValidationFailed: function AirbnbValidationFailed() {
    Error.captureStackTrace(this, this.constructor);
    this.error = this.constructor.name;
    this.status = 400;
    this.message = 'Invalid Airbnb id';
  }
};
