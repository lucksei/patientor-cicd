import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';
import { EntryContainer } from '.';
import { Entry as EntryType } from '../../../types';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  console.log('DOM after cleanup:', document.body.innerHTML.length);
});

const diagnoses = [
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
  describe('Hospital', () => {
    test('Renders content for "Hospital" entry type', () => {
      render(<EntryContainer entry={entryHospital} diagnoses={diagnoses} />);
      expect(screen.getByText(/Hospital/)).toBeDefined();
      expect(screen.getByText(/2015-01-02/)).toBeDefined();
      expect(screen.getByText(/Healing time appr\. 2 weeks./)).toBeDefined();
      expect(screen.getByText(/Discharge: 2015-01-16/)).toBeDefined();
      expect(screen.getByText(/Criteria: Thumb has healed./)).toBeDefined();
      expect(screen.getByText(/S62\.5: Fracture of thumb/)).toBeDefined();
      expect(screen.getByText(/Diagnose by MD House/)).toBeDefined();
      cleanup();
    });
  });

  describe('OccupationalHealthcare', () => {
    test('Renders content for "OccupationalHealthcare" entry type', () => {
      render(
        <EntryContainer entry={entryOccupational} diagnoses={diagnoses} />
      );
      expect(screen.queryByText(/Occupational Healthcare/)).toBeInTheDocument();
      expect(screen.queryByText('2019-08-05')).toBeInTheDocument();
      expect(screen.queryByText(/Employer: HyPD/)).toBeInTheDocument();
      expect(
        screen.queryByText(/Z57\.1: Occupational exposure to radiation/)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/Z74\.3: Need for continuous supervision/)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/M51\.2: Other specified intervertebral disc/)
      ).toBeInTheDocument();
      expect(screen.queryByText(/Diagnose by MD House/)).toBeInTheDocument();
      cleanup();
    });
  });

  describe('HealthCheck', () => {
    test('Renders content for "HealthCheck" entry type', () => {
      render(<EntryContainer entry={entryHealthCheck} diagnoses={diagnoses} />);

      expect(screen.getByText(/Health Check/)).toBeDefined();
      expect(screen.getByText(/2019-10-20/)).toBeDefined();
      expect(
        screen.getByText(
          /Yearly control visit. Cholesterol levels back to normal./
        )
      ).toBeDefined();
      const img = screen.getByRole<HTMLElement>('img', { name: /4 Stars/ });
      expect(img).toHaveAttribute('aria-label', '4 Stars');
    });
  });
});
