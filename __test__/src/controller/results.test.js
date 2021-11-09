const request = require('supertest');
const app = require('../../../src/app');

describe('The Results Controller', () => {
  describe('POST /v1/csv', () => {
    it('returns a 200 if csv was successfully imported to DB', async () => {
      const response = await request(app).post('/v1/csv').send().expect(200);

      expect(response.body.status).toBe('Successful');
      expect(response.body.status).toEqual('Upload successful');
    });
  });

  describe('POST /v1/seasons', () => {
    it('returns a 200 response if list of season pairs is returned', async () => {
      const response = await request(app).get('/v1/seasons').send().expect(200);

      expect(response.body.status).toBe('Successful');
      expect(response.body.data.length).toBeLessThanOrEqual(10);
    });
  });

  describe('POST /v1/season/:season', () => {
    it('returns a 200 response if request is sucessful', async () => {
      const season = '201617';
      const response = await request(app).get(`/v1/seasons/${season}`).send().expect(200);

      expect(response.body.status).toBe('Successful');
      expect(response.body.data.length).toBeLessThanOrEqual(10);
    });

    it('returns an empty array if season is not found', async () => {
      const season = '201650';
      const response = await request(app).get(`/v1/seasons/${season}`).send().expect(200);

      expect(response.body.status).toBe('Successful');
      expect(response.body.data).toEqual([]);
      expect(response.body.data.length).toBeLessThanOrEqual(10);
    });
  });
});
