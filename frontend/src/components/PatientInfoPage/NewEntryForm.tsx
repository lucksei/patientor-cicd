import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Autocomplete,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  HealthCheckRating as HealthCheckRatingType,
  EntryWithoutId as EntryWithoutIdType,
} from '../../types';
import { toHealthCheckRating } from '../../utils';

enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

const NewEntryForm = (props: {
  handleSubmit: (_entry: EntryWithoutIdType) => Promise<void>;
  diagnosisCodesOptions?: string[];
}) => {
  const [open, setOpen] = useState(true);

  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<string>('');
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

  useEffect(() => {
    setDescription('test description');
    setDate('2022-01-01');
    setSpecialist('test specialist');
    setHealthCheckRating('Healthy');
    setDiagnosisCodes(['Z57.1', 'Z74.3', 'M51.2']);
  }, []);

  const cancelNewEntry = () => {
    setOpen(false);
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating('');
    setDiagnosisCodes([]);
    setEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
    setDischargeDate('');
    setDischargeCriteria('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      switch (type) {
        case EntryType.HealthCheck: {
          const newEntry: EntryWithoutIdType = {
            type: 'HealthCheck',
            description,
            date,
            specialist,
            diagnosisCodes,
            healthCheckRating: toHealthCheckRating(healthCheckRating),
          };
          await props.handleSubmit(newEntry);
          break;
        }
        case EntryType.OccupationalHealthcare: {
          const newEntry: EntryWithoutIdType = {
            type: 'OccupationalHealthcare',
            description,
            date,
            specialist,
            diagnosisCodes,
            employerName,
            sickLeave: {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate,
            },
          };
          await props.handleSubmit(newEntry);
          break;
        }
        case EntryType.Hospital: {
          const newEntry: EntryWithoutIdType = {
            type: 'Hospital',
            description,
            date,
            specialist,
            diagnosisCodes,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          };
          await props.handleSubmit(newEntry);
          break;
        }
        default: {
          console.error('Invalid entry type');
          break;
        }
      }
      setDescription('');
      setDate('');
      setSpecialist('');
      setHealthCheckRating('');
      setDiagnosisCodes([]);
      setEmployerName('');
      setSickLeaveStartDate('');
      setSickLeaveEndDate('');
      setDischargeDate('');
      setDischargeCriteria('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Accordion expanded={open}>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls=""
        id=""
        onClick={() => setOpen(!open)}
      >
        <Typography component="span">Add New Entry</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={(e) => void handleSubmit(e)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Autocomplete
              size="small"
              disablePortal
              id="type"
              onChange={(_e: unknown, newValue: EntryType | null) =>
                setType(newValue || EntryType.HealthCheck)
              }
              value={type}
              options={Object.values(EntryType).filter((v) => isNaN(Number(v)))}
              renderInput={(params) => (
                <TextField {...params} label="Entry Type" />
              )}
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              size="small"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="date"
              type="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              id="specialist"
              label="Specialist"
              variant="outlined"
              size="small"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
            <Autocomplete
              id="diagnosisCodes"
              multiple
              freeSolo
              size="small"
              disablePortal
              options={[
                ...(props.diagnosisCodesOptions || []),
                ...diagnosisCodes.filter(
                  (v) => !props.diagnosisCodesOptions?.includes(v)
                ),
              ]}
              value={diagnosisCodes}
              onChange={(_e, newValue) => {
                setDiagnosisCodes(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Diagnosis Codes" />
              )}
            />
            {type === EntryType.HealthCheck && (
              <>
                <Typography variant="body1" color="secondary">
                  Health Check Rating
                </Typography>
                <Autocomplete
                  size="small"
                  disablePortal
                  id="healthCheckRating"
                  onChange={(_e: unknown, newValue: string | null) =>
                    setHealthCheckRating(newValue || '')
                  }
                  value={healthCheckRating}
                  options={[
                    ...(Object.values(HealthCheckRatingType).filter((v) =>
                      isNaN(Number(v))
                    ) as string[]),
                    '',
                  ]}
                  renderInput={(params) => (
                    <TextField {...params} label="Health Check Rating" />
                  )}
                />
              </>
            )}
            {type === EntryType.OccupationalHealthcare && (
              <>
                <Typography variant="body1" color="secondary">
                  Sick Leave
                </Typography>
                <TextField
                  id="employerName"
                  label="Employer Name"
                  variant="outlined"
                  size="small"
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                />
                <TextField
                  id="sickLeaveStartDate"
                  type="date"
                  label="Sick Leave Start Date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  size="small"
                  value={sickLeaveStartDate}
                  onChange={(e) => setSickLeaveStartDate(e.target.value)}
                />
                <TextField
                  id="sickLeaveEndDate"
                  type="date"
                  label="Sick Leave End Date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  size="small"
                  value={sickLeaveEndDate}
                  onChange={(e) => setSickLeaveEndDate(e.target.value)}
                />
              </>
            )}
            {type === EntryType.Hospital && (
              <>
                <Typography variant="body1" color="secondary">
                  Discharge
                </Typography>
                <TextField
                  id="dischargeDate"
                  type="date"
                  label="Discharge Date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  size="small"
                  value={dischargeDate}
                  onChange={(e) => setDischargeDate(e.target.value)}
                />
                <TextField
                  id="dischargeCriteria"
                  label="Discharge Criteria"
                  variant="outlined"
                  size="small"
                  value={dischargeCriteria}
                  onChange={(e) => setDischargeCriteria(e.target.value)}
                />
              </>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="contained"
                color="error"
                onClick={cancelNewEntry}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" color="primary">
                Add
              </Button>
            </Box>
          </Box>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default NewEntryForm;
