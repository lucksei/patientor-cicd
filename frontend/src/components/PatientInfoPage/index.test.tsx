import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, test, expect } from 'vitest';
import { PatientInfoPageContainer } from './index';
import { Patient, Gender } from '../../types';
import { Diagnosis } from '../../types';

vi.mock('../../services/patients');

const diagnoses: Diagnosis[] = [
  {
    code: 'M24.2',
    name: 'Disorder of ligament',
    latin: 'Morbositas ligamenti',
  },
  {
    code: 'M51.2',
    name: 'Other specified intervertebral disc displacement',
    latin: 'Alia dislocatio disci intervertebralis specificata',
  },
  {
    code: 'S03.5',
    name: 'Sprain and strain of joints and ligaments of other and unspecified parts of head',
    latin:
      'Distorsio et/sive distensio articulationum et/sive ligamentorum partium aliarum sive non specificatarum capitis',
  },
  {
    code: 'J10.1',
    name: 'Influenza with other respiratory manifestations, other influenza virus codeentified',
    latin:
      'Influenza cum aliis manifestationibus respiratoriis ab agente virali codeentificato',
  },
  {
    code: 'J06.9',
    name: 'Acute upper respiratory infection, unspecified',
    latin: 'Infectio acuta respiratoria superior non specificata',
  },
  {
    code: 'Z57.1',
    name: 'Occupational exposure to radiation',
  },
  {
    code: 'N30.0',
    name: 'Acute cystitis',
    latin: 'Cystitis acuta',
  },
  {
    code: 'H54.7',
    name: 'Unspecified visual loss',
    latin: 'Amblyopia NAS',
  },
  {
    code: 'J03.0',
    name: 'Streptococcal tonsillitis',
    latin: 'Tonsillitis (palatina) streptococcica',
  },
  {
    code: 'L60.1',
    name: 'Onycholysis',
    latin: 'Onycholysis',
  },
  {
    code: 'Z74.3',
    name: 'Need for continuous supervision',
  },
  {
    code: 'L20',
    name: 'Atopic dermatitis',
    latin: 'Atopic dermatitis',
  },
  {
    code: 'F43.2',
    name: 'Adjustment disorders',
    latin: 'Perturbationes adaptationis',
  },
  {
    code: 'S62.5',
    name: 'Fracture of thumb',
    latin: 'Fractura [ossis/ossium] pollicis',
  },
  {
    code: 'H35.29',
    name: 'Other proliferative retinopathy',
    latin: 'Alia retinopathia proliferativa',
  },
];

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
      <BrowserRouter>
        <PatientInfoPageContainer
          patient={patient}
          alert={undefined}
          diagnoses={diagnoses}
          handleSubmit={vi.fn()}
        />
      </BrowserRouter>
    );

    const patientName = screen.getByText(/John McClane/);
    expect(patientName).toBeDefined();
    const patientBirthDate = screen.getByText(/1986-07-09/);
    expect(patientBirthDate).toBeDefined();
    const patientOccupation = screen.getByText(/New york city cop/);
    expect(patientOccupation).toBeDefined();
  });
});
