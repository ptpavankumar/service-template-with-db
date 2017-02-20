const message = 'Object does not match input schema';

class ValidationError extends Error {
  contructor(errors) {
    this.errors = errors;
    this.message = message;
  }
}

module.exports = ValidationError;
