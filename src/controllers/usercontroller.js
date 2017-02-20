const knex = require('../repositories/knex');
const userDTO = require('../models/userDTO');
const errorTypes = require('../utils/errortypes');
const ValidationError = require('../utils/validationerror');

const create = (user) => {
  const validationInfo = userDTO.validate(user);
  if (validationInfo.error) {
    return Promise.reject(new ValidationError(validationInfo.error));
  }

  return knex('user').insert({
    name: user.name,
    dateofbirth: user.dob,
    gender: user.sex,
    email: user.email,
  }, 'id')
  .then(userids => (
    { data: { id: userids[0] } }
  ))
  .catch((err) => {
    console.error(err); // eslint-disable-line no-console
    throw new Error(`${errorTypes.ServerError}:: ${err.message}`);
  });
};

const fetch = () => (
  knex('user').select()
    .then(collections => (
      { data: collections }
    ))
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      throw new Error(`${errorTypes.ServerError}:: ${err.message}`);
    })
);

const fetchSingle = userid => (
  knex('user').select().where({ id: userid })
    .then((users) => {
      if (users.length <= 0) {
        throw new Error(errorTypes.Unavailable);
      }

      return { data: users[0] };
    })
    .catch((err) => {
      if (err.message === errorTypes.Unavailable) {
        throw err;
      }
      console.error(err); // eslint-disable-line no-console
      throw new Error(`${errorTypes.ServerError}: ${err.code}`);
    })
);

const update = (userid, user) => ( // eslint-disable-line no-unused-vars
  Promise.reject(new Error(errorTypes.NotImplemented))
);

const deleteSingle = userid => (
  knex('user').delete().where({ id: userid })
    .then(users => (
      { data: users[0] }
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
