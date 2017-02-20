NOTE: Never place any file that in migrations folder that should not be executed

// Database setup commands

// Setup initial migration folder with default db-upgrade script
```
knex migration:make initial --env development --knexfile src/dbcongif.js
```

// Apply the upgrade scripts into sqlite
```
knex migration:latest --env development --knexfile src/dbcongif.js
```