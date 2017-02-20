const knex = require('knex');
const dbConfig = require('../dbconfig');

const stack = process.env.STACK || 'development';
module.exports = knex(dbConfig[stack]);
