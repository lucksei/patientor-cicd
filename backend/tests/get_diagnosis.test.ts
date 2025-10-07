import { test, describe, expect } from 'vitest';
import supertest from 'supertest';
import app from '../src/index';

const api = supertest(app);

describe('GET /api/diagnoses/:id', () => {
  test('returns a specific diagnosis', async () => {
    const diagnosisCode = 'M24.2';
    const response = await api.get(`/api/diagnoses/${diagnosisCode}`);
    expect(response.status).toBe(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.name).toBe('Disorder of ligament');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.latin).toBe('Morbositas ligamenti');
  });
});
