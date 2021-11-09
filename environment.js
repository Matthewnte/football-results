const knex = require('./src/config/knex');
const knexConfig = require('./knexfile');
const { databaseManagerFactory } = require('knex-db-manager');

const dbManager = databaseManagerFactory({
  knex: knexConfig,
  dbManager: {
    superUser: 'postgres',
    superPassword: 'postgres',
  },
});

class CustomEnvironment {
  async setup() {
    // Create the database.
    await dbManager.createDb();
    // Run our migrations.
    await knex.migrate.latest();
    // Setup global variables for the manager, database name, and Knex.
    global.dbManager = dbManager;
    global.dbName = knexConfig.connection.database;
    global.knex = knex;
  }

  async teardown() {
    // We'll be destroying the database here and closing connections.
    // Destroy the Knex instance to clear all connections.
    await knex.destroy();
    // Delete the database.
    await dbManager.dropDb();
    // Close our database manager connections.
    await dbManager.close();
    await dbManager.closeKnex();
  }

  dispose() {
    // We're not putting anything in here. This is just required to make Jest happy.
  }
}

module.exports = CustomEnvironment;
