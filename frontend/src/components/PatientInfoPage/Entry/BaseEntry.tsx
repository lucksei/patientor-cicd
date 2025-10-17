import { Paper, Box, Divider, Typography } from '@mui/material';
import type {
  Diagnosis as DiagnosisType,
  Entry as EntryType,
} from '../../../types';
import { ReactElement } from 'react';

const BaseEntry = (props: {
  entryTypeLabel: ReactElement;
  extra: ReactElement;
  entry: EntryType;
  diagnoses: DiagnosisType[];
}) => {
  const { entryTypeLabel, extra, entry, diagnoses } = props;
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
        <Box>{entry.date}</Box>
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
        {`Diagnose by ${entry.specialist}`}
      </Typography>
    </Paper>
  );
};

export default BaseEntry;
