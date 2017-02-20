const createUserTable = (table) => {
  table.increments('id').primary();
  table.string('name');
  table.string('dateofbirth');
  table.string('gender');
  table.string('email');
};

const createAddressTable = (table) => {
  table.increments('id').primary();
  table.string('number');
  table.string('name');
  table.string('suburb');
  table.string('state');
  table.string('country');
};

const createUserAddressTable = (table) => {
  table.increments('id').primary();
  table.integer('user_id').references('user.id');
  table.integer('address_id').references('address.id');
};

exports.up = knex => (
  knex.schema.createTableIfNotExists('address', createAddressTable)
  .then(() => knex.schema.createTableIfNotExists('user', createUserTable))
  .then(() => knex.schema.createTableIfNotExists('user_address', createUserAddressTable))
);

exports.down = knex => (
    knex.schema.dropTableIfExists('user_address')
    .then(() => knex.schema.dropTableIfExists('address'))
    .then(() => knex.schema.dropTableIfExists('user'))
);
