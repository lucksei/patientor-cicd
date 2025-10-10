import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, test, expect } from 'vitest';
import Entry from './Entry';
import { Entry as EntryType } from '../../types';

vi.mock('../../services/patients');

const entryHospital: EntryType = {
  id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
  date: '2015-01-02',
  type: 'Hospital',
  specialist: 'MD House',
  diagnosisCodes: ['S62.5'],
  description:
    "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
  discharge: {
    date: '2015-01-16',
    criteria: 'Thumb has healed.',
  },
};

const entryOccupational: EntryType = {
  id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
  date: '2019-08-05',
  type: 'OccupationalHealthcare',
  specialist: 'MD House',
  employerName: 'HyPD',
  diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
  description:
    'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ',
  sickLeave: {
    startDate: '2019-08-05',
    endDate: '2019-08-28',
  },
};

const entryHealthCheck: EntryType = {
  id: 'b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da',
  date: '2019-10-20',
  specialist: 'MD House',
  type: 'HealthCheck',
  description: 'Yearly control visit. Cholesterol levels back to normal.',
  healthCheckRating: 0,
};

describe('<Entry />', () => {
  test('Renders content for "Hospital" entry type', () => {
    render(
      <BrowserRouter>
        <Entry entry={entryHospital} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Hospital/)).toBeDefined();
    expect(screen.getByText(/2015-01-02/)).toBeDefined();
    expect(screen.getByText(/Healing time appr\. 2 weeks./)).toBeDefined();
    expect(screen.getByText(/Discharge: 2015-01-16/)).toBeDefined();
    expect(screen.getByText(/Criteria: Thumb has healed./)).toBeDefined();
    expect(screen.getByText(/S62\.5: Fracture of thumb/)).toBeDefined();
    expect(screen.getByText(/Diagnose by MD House/)).toBeDefined();
  });

  test('Renders content for "OccupationalHealthcare" entry type', () => {
    render(
      <BrowserRouter>
        <Entry entry={entryOccupational} />
      </BrowserRouter>
    );
    throw new Error('Not implemented');
  });

  test('Renders content for "HealthCheck" entry type', () => {
    render(
      <BrowserRouter>
        <Entry entry={entryHealthCheck} />
      </BrowserRouter>
    );
  });
});
