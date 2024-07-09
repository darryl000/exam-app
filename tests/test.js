const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

beforeAll(async () => {
  // Connection to the test database
  await mongoose.connect('mongodb://localhost:27017/dashboard', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Close the connection after tests
  await mongoose.connection.close();
});

describe('GET /data', () => {
  it('should return an array of data', async () => {
    const res = await request(app).get('/data');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
