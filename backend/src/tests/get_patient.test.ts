import { test, describe, expect } from 'vitest';
import supertest from 'supertest';
import app from '../index';

const api = supertest(app);

describe('GET /api/patients/:id', () => {
  test('returns a specific patient', async () => {
    const patientId = 'd2773336-f723-11e9-8f0b-362b9e155667';
    const response = await api.get(`/api/patients/${patientId}`);
    expect(response.status).toBe(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.id).toBe(patientId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.name).toBe('John McClane');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.dateOfBirth).toBe('1986-07-09');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.ssn).toBe('090786-122X');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.gender).toBe('male');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.occupation).toBe('New york city cop');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.entries).toHaveLength(1);
  });
});
