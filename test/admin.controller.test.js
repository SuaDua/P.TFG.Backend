import request from 'supertest';
import app from '../src/server.js';

describe('Admin Dashboard', () => {
  test('GET /api/admin/dashboard', async () => {
    const res = await request(app).get('/api/admin/dashboard');
    expect(res.statusCode).toBe(401);
  });
});