const request = require('supertest');
const app = require('../src/app');
const logger = require('../src/config/winston');

describe('app', () => {
  afterEach(async () => {
    try {
      await global.dbManager.truncateDb(['migrations']);
    } catch (error) {
      logger.error(`${error}`);
    }
  });

  it("returns a 404 on route that doesn't exist", async () =>
    request(app).post('/404routenotfound').send().expect(404));

  it('returns a 200 response if app is up', async () =>
    request(app).get('/health').send().expect(200));
});
