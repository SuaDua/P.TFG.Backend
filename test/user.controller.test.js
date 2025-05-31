import request from 'supertest';
import app from '../src/server.js';

describe('User Controller', () => {
  test(
    'GET /api/users/me sin token devuelve 401',
    async () => {
      const res = await request(app).get('/api/users/me');
      expect(res.statusCode).toBe(401);
    },
    10000 
  );
});
