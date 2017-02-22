const knex = require('../ioc/knex');
const { addressDTO, errorTypes, ValidationError } = require('../models');

const create = (address) => {
  const validationInfo = addressDTO.validate(address);
  if (validationInfo.errors) {
    return Promise.reject(new ValidationError(validationInfo.error));
  }

  return knex('address').insert({
    number: address.number,
    name: address.name,
    suburb: address.suburb,
    state: address.state,
    country: address.country,
  }, 'id')
  .then(addressids => (
    { data: addressids[0] }
  ))
  .catch((err) => {
    console.error(err); // eslint-disable-line no-console
    throw new Error(`${errorTypes.ServerError}:: ${err.message}`);
  });
};

const fetch = () => (
  knex('address').select()
    .then(collections => (
      { data: collections }
    ))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      throw new Error(`${errorTypes.ServerError}:: ${err.message}`);
    })
);

const fetchSingle = addressid => (
  knex('address').select().where({ id: addressid })
    .then((addresses) => {
      if (addresses.length <= 0) {
        throw new Error(errorTypes.Unavailable);
      }

      return { data: addresses[0] };
    })
    .catch((err) => {
      if (err.message === errorTypes.Unavailable) {
        throw err;
      }
      console.error(err); // eslint-disable-line no-console
      throw new Error(`${errorTypes.ServerError}: ${err.code}`);
    })
);

const update = (addressid, address) => ( // eslint-disable-line no-unused-vars
  Promise.reject(new Error(errorTypes.NotImplemented))
);

const deleteSingle = addressid => (
  knex('address').delete().where({ id: addressid })
    .then(addresses => (
      { data: addresses[0] }
    ))
    .catch((err) => {
      throw new Error(`${errorTypes.ServerError}:: ${err.message}`);
    })
);

module.exports = {
  create,
  fetch,
  fetchSingle,
  update,
  deleteSingle,
};
