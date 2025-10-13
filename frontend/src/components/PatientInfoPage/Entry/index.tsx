import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import diagnosesService from '../../../services/diagnoses';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';

import HealthRatingBar from '../../HealthRatingBar';
import BaseEntry from './BaseEntry';

import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

import type { Diagnosis, Entry as EntryType } from '../../../types';

const Entry = (props: { entry: EntryType }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | undefined>(
    undefined
  );
  const { entry } = props;

  // Load Diagnoses
  useEffect(() => {
    const fetchDiagnoses = async () => {
      let diagnosesArray: Diagnosis[] = [];
      if (!entry.diagnosisCodes) {
        setDiagnoses(diagnosesArray);
        return; // Safety
      }
      for (const code of entry.diagnosisCodes) {
        const diagnosis = await diagnosesService.get(code);
        diagnosesArray = diagnosesArray.concat(diagnosis);
      }
      setDiagnoses(diagnosesArray);
    };
    void fetchDiagnoses();
  }, [entry.diagnosisCodes]);

  if (!diagnoses) {
    return null;
  }

  return <EntryContainer entry={entry} diagnoses={diagnoses} />;
};

export const EntryContainer = (props: {
  entry: EntryType;
  diagnoses: Diagnosis[];
}) => {
  const { entry, diagnoses } = props;
  switch (entry.type) {
    case 'HealthCheck': {
      return (
        <BaseEntry
          entry={entry}
          diagnoses={diagnoses}
          entryTypeLabel={
            <Typography
              variant="body2"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <MedicalServicesIcon />
              <Box>Health Check</Box>
            </Typography>
          }
          extra={
            <Box sx={{ display: 'flex' }}>
              <HealthRatingBar
                rating={entry.healthCheckRating}
                showText={false}
              />
            </Box>
          }
        />
      );
    }
    case 'OccupationalHealthcare': {
      return (
        <BaseEntry
          entry={entry}
          diagnoses={diagnoses}
          entryTypeLabel={
            <Typography
              variant="body2"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <WorkIcon />
              <Box>Occupational Healthcare</Box>
            </Typography>
          }
          extra={
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box>Employer: {entry.employerName}</Box>
              {entry.sickLeave ? (
                <Box>
                  Sick Leave: {entry.sickLeave.startDate} -{' '}
                  {entry.sickLeave.endDate}
                </Box>
              ) : null}
            </Box>
          }
        />
      );
    }
    case 'Hospital': {
      return (
        <BaseEntry
          entry={entry}
          diagnoses={diagnoses}
          entryTypeLabel={
            <Typography
              variant="body2"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <LocalHospitalIcon />
              <Box>Hospital</Box>
            </Typography>
          }
          extra={
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box>Discharge: {entry.discharge.date}</Box>
              <Box>Criteria: {entry.discharge.criteria}</Box>
            </Box>
          }
        />
      );
    }
    default: {
      console.error('Unknown entry type for entry');
    }
  }
};

export default Entry;
