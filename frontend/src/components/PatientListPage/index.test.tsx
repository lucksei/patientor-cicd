import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, test, expect } from 'vitest';
import PatientListPage from './index';
import { Patient, Gender } from '../../types';

vi.mock('../../services/patients');

describe('<PatientListPage />', () => {
  test('Renders content', () => {
    const patients: Patient[] = [
      {
        id: 'd2773336-f723-11e9-8f0b-362b9e155667',
        name: 'John McClane',
        dateOfBirth: '1986-07-09',
        ssn: '090786-122X',
        gender: Gender.Male,
        occupation: 'New york city cop',
        entries: [
          {
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
          },
        ],
      },
      {
        id: 'd2773598-f723-11e9-8f0b-362b9e155667',
        name: 'Martin Riggs',
        dateOfBirth: '1979-01-30',
        ssn: '300179-777A',
        gender: Gender.Male,
        occupation: 'Cop',
        entries: [
          {
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
          },
        ],
      },
    ];
    const setPatients = vi.fn();
    render(
      <BrowserRouter>
        <PatientListPage patients={patients} setPatients={setPatients} />
      </BrowserRouter>
    );
    const patient1 = screen.getByText('John McClane');
    expect(patient1).toBeDefined();
    const patient1Occupation = screen.getByText('New york city cop');
    expect(patient1Occupation).toBeDefined();

    const patient2 = screen.getByText('Martin Riggs');
    expect(patient2).toBeDefined();
    const patient2Occupation = screen.getByText('Cop');
    expect(patient2Occupation).toBeDefined();
  });
});
