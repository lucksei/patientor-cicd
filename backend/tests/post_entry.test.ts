import { test, describe, expect } from 'vitest';
import supertest from 'supertest';
import app from '../src/index';

const api = supertest(app);

describe('POST /api/patients/:id/entries', () => {
  test('adds a "Hospital" type entry to a patient', async () => {
    const patientId = 'd2773336-f723-11e9-8f0b-362b9e155667';
    const entry = {
      date: '2025-08-23',
      type: 'Hospital',
      specialist: 'MD Checho',
      diagnosisCodes: ['S62.5'],
      description:
        'Gamed nonstop for 48 hours straight gooning to weird japanese games',
      discharge: {
        date: '2025-08-23',
        criteria: 'healthy enough',
      },
    };
    const response = await api
      .post(`/api/patients/${patientId}/entries`)
      .send(entry);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(entry));

    const patientResponse = await api.get(`/api/patients/${patientId}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const patient = patientResponse.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(patient?.entries).toHaveLength(2);
  });
});
