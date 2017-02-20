const knex = require('../repositories/knex');
const addressDTO = require('../models/addressDTO');
const errorTypes = require('../utils/errortypes');

const create = (address) => {
  const validationInfo = addressDTO.validate(address);
  if (validationInfo.errors) {
    throw new Error({ type: errorTypes.ValidationError, errors: validationInfo.errors });
  }

  return knex('address').insert({
    number: address.number,
    name: address.name,
    suburb: address.suburb,
    state: address.state,
    country: address.country,
  }, 'id')
  .then(addressids => (
    Promise.resolve({ errors: null, data: addressids[0] })
  ))
  .catch((err) => {
    throw new Error({ type: errorTypes.ServerError, errors: err });
  });
};

const fetch = () => (
  knex.select().table('address')
    .then(collections => (
      Promise.resolve({ data: collections })
    ))
    .catch((err) => {
      throw new Error({ type: errorTypes.ServerError, errors: err });
    })
);

const fetchSingle = addressid => (
  knex.select().table('address').where({ id: addressid })
    .then((addresses) => {
      if (addresses.length <= 0) {
        throw new Error({ type: errorTypes.Unavailable });
      }

      return Promise.resolve({ data: addresses[0] });
    })
    .catch((err) => {
      throw new Error({ type: errorTypes.ServerError, errors: err });
    })
);

const update = (userid, user) => {
  throw new Error({ type: errorTypes.NotImplemented, errors: user });
};

const deleteSingle = addressid => (
  knex.delete().table('address').where({ id: addressid })
    .then(addresses => (
      Promise.resolve({ data: addresses[0] })
    ))
    .catch((err) => {
      throw new Error({ type: errorTypes.ServerError, errors: err });
    })
);

module.exports = {
  create,
  fetch,
  fetchSingle,
  update,
  deleteSingle,
};
