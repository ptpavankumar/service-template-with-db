# Sample Service Template With Database (sqlite)

## Setup microservice

```
npm install
```

## Setup database

```
npm run dbupgrade
```

## Run in development mode

```
npm run dev
```

## Publish to public/private registry (NOTE: before publish prepublish will lint and build a package)

```
npm publish
```

# Database migrations

NOTE: Never place any file that in migrations folder that should not be executed

## Database setup commands

### Generate upgrade/downgrade scripts for *20170223144325_initial.js* for database based on dbcongif.js
```
knex migrate:make initial --env development --knexfile ./src/config/dbconfig.js
```

### Apply this command to create/upgrade sqlite
```
knex migrate:latest --env development --knexfile ./src/config/dbconfig.js
```