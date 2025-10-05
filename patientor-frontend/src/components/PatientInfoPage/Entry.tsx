import { useState, useEffect } from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import diagnosesService from '../../services/diagnoses';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';

import type { Diagnosis, Entry as EntryType } from '../../types';
import HealthRatingBar from '../HealthRatingBar';

interface EntryProps {
  entry: EntryType;
}

const Entry = (props: EntryProps) => {
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

  const baseEntry = (entryTypeLabel: JSX.Element, extra: JSX.Element) => {
    return (
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column ',
          alignContent: 'start',
          justifyContent: 'start',
          my: 1,
          pt: 2,
          pb: 1,
          px: 2,
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {entryTypeLabel}
          {entry.date}
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2">
            <i>{entry.description}</i>
          </Typography>
        </Box>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code}: {diagnoses.find((d) => d.code === code)?.name}
            </li>
          ))}
        </ul>
        {/* optional stuff here??? */}
        {extra}
        {/* optional stuff end */}
        <Divider />
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Diagnose by {entry.specialist}
        </Typography>
      </Paper>
    );
  };

  switch (entry.type) {
    case 'HealthCheck': {
      return baseEntry(
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <MedicalServicesIcon />
          Health Check
        </Typography>,
        <Box sx={{ display: 'flex' }}>
          <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
        </Box>
      );
    }
    case 'OccupationalHealthcare': {
      return baseEntry(
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <WorkIcon />
          Occupational Healthcare
        </Typography>,
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box>Employer: {entry.employerName}</Box>
          {entry.sickLeave ? (
            <Box>
              Sick Leave: {entry.sickLeave.startDate} -{' '}
              {entry.sickLeave.endDate}
            </Box>
          ) : null}
        </Box>
      );
    }
    case 'Hospital': {
      return baseEntry(
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <LocalHospitalIcon />
          Hospital
        </Typography>,
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box>Discharge: {entry.discharge.date}</Box>
          <Box>Criteria: {entry.discharge.criteria}</Box>
        </Box>
      );
    }
    default: {
      console.error('Unknown entry type for entry');
    }
  }
};

export default Entry;
