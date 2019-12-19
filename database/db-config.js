const knex = require('knex');

const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig.development);

// Making a DB From the CLI
// pnpx knex --> Shows all available commands.

// This will create a migration file that we'll need to edit
// ? pnpx knex migrate:make <name of migration file>

// After editing that file

// ? pnpx knex migrate:latest --> pushes latest version of all migrations
// ? pnpx knex migrate:rollback --> pulls the latest version of all migrations

// Making seeds is simple...

// This will create a seed file that we'll need to edit
// ? pnpx knex seed:make <01-seed-name> --> We always number the seeds for easy reference

// After editing that file

// ? pnpx knex seed:run