import { test, describe, expect } from 'vitest';
import supertest from 'supertest';
import app from '../src/index';

const api = supertest(app);

describe('POST /api/patients', () => {
  test('adds a patient', async () => {
    const newPatient = {
      name: 'Morty Smith',
      ssn: '090786-123X',
      dateOfBirth: '2025-08-23',
      gender: 'male',
      occupation: 'Hacker',
    };
    const response = await api.post('/api/patients').send(newPatient);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(newPatient));

    const patientsResponse = await api.get('/api/patients');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const patients = patientsResponse.body;
    expect(patients).toHaveLength(6);
  });
});
