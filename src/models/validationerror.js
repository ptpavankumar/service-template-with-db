const message = 'Object does not match input schema';

class ValidationError extends Error {
  constructor(errors) {
    super(message);
    this.errors = errors;
  }
}

module.exports = ValidationError;
