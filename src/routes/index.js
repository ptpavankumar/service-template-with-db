const healthcheckController = require('./healthcheck');
const userController = require('./user');
const addressController = require('./address');

module.exports = [
  healthcheckController,
  userController,
  addressController,
];
