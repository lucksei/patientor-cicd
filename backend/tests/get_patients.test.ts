import { test, describe, expect } from 'vitest';
import supertest from 'supertest';
import app from '../src/index';

const api = supertest(app);

describe('GET /api/patients', () => {
  test('returns all patients', async () => {
    const response = await api.get('/api/patients');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5);
  });
});
