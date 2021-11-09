const Environment = require('../../environment');
const logger = require('../../src/config/winston');

const testEnvironment = new Environment();

//Setup DataBase
beforeAll(async () => {
  await testEnvironment.setup();
});

// Reset all data after Each test
afterEach(async () => {
  try {
    await global.dbManager.truncateDb(['migrations']);
  } catch (error) {
    logger.log(`${error}`);
  }
});

// Close DB connections
afterAll(async () => {
  await testEnvironment.teardown();
});
