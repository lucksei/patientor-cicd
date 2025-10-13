import { isAxiosError, AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Alert,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import Entries from './Entries';
import patientsService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';

import type { Diagnosis, EntryWithoutId, Patient } from '../../types';

interface AlertType {
  type: 'success' | 'error';
  message: string;
}

const PatientInfoPage = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [alert, setAlert] = useState<AlertType | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  // Load patient
  useEffect(() => {
    const fetchPatient = async () => {
      if (patientId) {
        setPatient(await patientsService.get(patientId));
      }
    };
    void fetchPatient();
  }, [patientId]);

  // Load diagnoses
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  if (!patient) {
    return null;
  }

  const handleSubmit = async (entry: EntryWithoutId) => {
    try {
      await patientsService.createPatientEntry(patient.id, entry);
      const updatedPatient = await patientsService.get(patient.id);
      setPatient(updatedPatient);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        error as AxiosError;
        const errorMessageCode = error.response?.data.error[0].code;
        const errorMessagePath = error.response?.data.error[0].path[0];
        const errorMessageDetail = error.response?.data.error[0].message;
        setAlert({
          type: 'error',
          message: `${errorMessagePath} (${errorMessageCode}): ${errorMessageDetail}`,
        });
      }
      throw error;
    }
  };

  return (
    <PatientInfoPageContainer
      patient={patient}
      alert={alert}
      entries={
        <Entries
          entries={patient.entries}
          handleSubmit={handleSubmit}
          diagnosisCodesOptions={diagnoses.map((diagnosis) => diagnosis.code)}
        />
      }
    />
  );
};

export const PatientInfoPageContainer = (props: {
  patient: Patient;
  alert: AlertType | undefined;
  entries: JSX.Element;
}) => {
  const { patient, alert, entries } = props;
  return (
    <>
      <Card sx={{ my: 2 }}>
        <CardContent>
          <Typography
            component="h3"
            variant="h5"
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            {patient.name}
            {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
          </Typography>
          <Divider sx={{ mt: 2 }} />
          <List>
            <ListItem>Birth: {patient.dateOfBirth}</ListItem>
            <ListItem>SSN: {patient.ssn}</ListItem>
            <ListItem>Occupation: {patient.occupation}</ListItem>
          </List>
          <Typography component="h4" variant="h6">
            Entries
          </Typography>
          {alert && <Alert severity={alert?.type}>{alert?.message}</Alert>}
          {entries}
        </CardContent>
      </Card>
    </>
  );
};

export default PatientInfoPage;
