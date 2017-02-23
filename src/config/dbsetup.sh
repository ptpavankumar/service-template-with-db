#!/bin/bash
echo 'Installing knex cli...'
npm install knex
echo 'Installation completed!'
echo 'Creating/upgrading sqlite3 database...'
knex migrate:latest --env development --knexfile ./src/config/dbconfig.js
echo 'Operation completed!'