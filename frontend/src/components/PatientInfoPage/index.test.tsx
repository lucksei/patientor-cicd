import { render, screen } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';
import { PatientInfoPageContainer } from './index';
import { Patient, Gender } from '../../types';

vi.mock('../../services/patients');

const patient: Patient = {
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
};

describe('<PatientInfoPage />', () => {
  test('Renders content', () => {
    render(
      <PatientInfoPageContainer
        patient={patient}
        alert={undefined}
        entries={<></>}
      />
    );

    const patientName = screen.getByText(/John McClane/);
    expect(patientName).toBeDefined();
    const patientBirthDate = screen.getByText(/1986-07-09/);
    expect(patientBirthDate).toBeDefined();
    const patientOccupation = screen.getByText(/New york city cop/);
    expect(patientOccupation).toBeDefined();
  });
});
