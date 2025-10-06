import { test, describe, expect } from 'vitest';
import supertest from 'supertest';
import app from '../index';

const api = supertest(app);

describe('GET /api/diagnoses', () => {
  test('returns all diagnoses', async () => {
    const response = await api.get('/api/diagnoses');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(15);
  });
});
